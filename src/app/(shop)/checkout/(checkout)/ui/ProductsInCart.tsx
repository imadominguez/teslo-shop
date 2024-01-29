'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { ProductItemSkeleton } from '@/components';

// Componente para mostrar los productos en el carrito
export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

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
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{ width: '100px', height: '100px' }}
            className="mr-5 rounded"
            priority
          />

          <div>
            <span className="font-bold">
              {product.size} - {product.title} ({product.quantity})
            </span>

            {/* Precio por unidad */}
            {/* <p className="my-2 font-semibold">
              Precio x unidad: ${product.price}
            </p> */}

            {/* Precio total */}
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
