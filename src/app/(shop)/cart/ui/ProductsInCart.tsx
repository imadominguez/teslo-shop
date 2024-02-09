'use client';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { ProductImage, QuantitySelector } from '@/components';
import { ProductItemSkeleton } from '@/components';
import { IoCartOutline } from 'react-icons/io5';

// Componente para mostrar los productos en el carrito
export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart,
  );
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Si el componente no ha cargado aún, mostrar esqueletos de carga
  if (!loaded) {
    return Array.from({ length: 3 }, (_, i) => <ProductItemSkeleton key={i} />);
  }

  // Si no hay productos en el carrito, redirigir a la página vacía
  if (productsInCart.length === 0) {
    redirect('/empty');
  }

  return (
    <>
      {/* Iterar sobre los productos en el carrito */}
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}${Math.random()}`}
          className="mb-5 flex"
        >
          {/* Imagen del producto */}
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            style={{ width: '100px', height: '100px' }}
            className="mr-5 rounded"
            priority={true}
          />

          <div>
            {/* Enlace al producto */}
            <Link
              className="cursor-pointer font-bold hover:underline"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>

            {/* Precio por unidad */}
            <p className="my-2 font-semibold">
              Precio x unidad: ${product.price}
            </p>

            {/* Precio total */}
            <p>
              Precio total: ${(product.price * product.quantity).toFixed(2)}
            </p>

            {/* Selector de cantidad */}
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(value) =>
                updateProductQuantity(product, value)
              }
            />

            {/* Botón para remover el producto del carrito */}
            <button
              onClick={() => removeProductFromCart(product)}
              className="mt-3 underline"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={clearCart}
        className=" btn-danger mb-5 flex  items-center justify-center gap-x-2"
      >
        <IoCartOutline size={24} />
        Vaciar carrito
      </button>
    </>
  );
};
