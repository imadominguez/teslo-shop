'use client';

import { SizeSelector, QuantitySelector } from '@/components';
import { CartProduct, Product } from '@/interfaces';
import { useCartStore } from '@/store';
import { Size } from '@prisma/client';
import clsx from 'clsx';

import { useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
interface Props {
  product: Product;
}
// Componente para agregar productos al carrito
export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  // Estado para la talla seleccionada, cantidad y si se ha enviado la solicitud
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  // Función para agregar el producto al carrito
  const addToCart = () => {
    // Marcar que se ha enviado la solicitud
    setPosted(true);

    // Verificar si se ha seleccionado una talla
    if (!size) return;

    // Crear un objeto CartProduct con la información del producto
    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
      slug: product.slug,
    };

    // Llamar a la función para agregar el producto al carrito
    addProductToCart(cartProduct);

    // Restablecer el estado después de agregar al carrito
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {/* Mostrar mensaje de error si no se ha seleccionado una talla */}
      {posted && !size && (
        <div className="fade-in flex items-center justify-center gap-2 rounded bg-red-600/95 p-1 px-3 py-2 text-white dark:bg-red-900 dark:text-red-300">
          <IoAlertCircleOutline size={23} />

          <strong className="block font-medium">
            Debe seleccionar una talla
          </strong>
        </div>
      )}

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSize={product.sizes}
        onSizeChange={setSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        quantityTotal={product.inStock}
      />

      {/* Boton agregar al carrito */}
      <button
        disabled={product.inStock === 0}
        onClick={addToCart}
        className={clsx('my-5', {
          'btn-primary': product.inStock > 0,
          'btn-disable': product.inStock === 0,
        })}
      >
        Agregar al carrito
      </button>
    </>
  );
};
