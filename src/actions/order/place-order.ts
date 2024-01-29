'use server';

import { auth } from '@/auth.config';
import { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address,
) => {
  console.log(productsIds);
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'No hay session de usuario',
    };
  }

  // Obtener la informacion de los productos
  // Nota: se puede llevar dos productos con el mismo id
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((product) => product.productId),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productsIds.reduce(
    (count, prod) => count + prod.quantity,
    0,
  );

  // Los totales de tax, subtotal, y total
  const { subTotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((prod) => prod.id === item.productId);
      if (!product) {
        throw new Error('Product not found');
      }
      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 },
  );

  // Crear la transaccion de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos en la base de datos
      const updatedProductsPromises = products.map((product) => {
        // Acumular los valores
        const productQuantity = productsIds
          .filter((p) => p.productId === product.id)
          .reduce((sum, p) => sum + p.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      // Verificar valores negativos en inStock === 'no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`El producto ${product.title} no tiene stock`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productsIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validamos si el price es 0, entonces, lanzamos un error
      // if (order.total === 0) {
      //   throw new Error('El precio es 0');
      // }

      // 3. Crear la direccion de la orden
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
      message: 'Orden creada correctamente',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
