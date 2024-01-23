'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import { ProductItemSkeleton } from './ProductItemSkeleton';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart,
  );
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );

  useEffect(() => {
    setLoaded(true);
  });

  if (!loaded) {
    return Array.from({ length: 3 }, (_, i) => <ProductItemSkeleton key={i} />);
  }

  return (
    <>
      {/* items del carrito */}
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="mb-5 flex">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{ width: '100px', height: '100px' }}
            className="mr-5 rounded"
          />

          <div>
            <Link
              className="cursor-pointer font-bold hover:underline"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>

            <p className="my-2 font-semibold">
              Precio x unidad: ${product.price}
            </p>
            <p>
              Precio total: ${(product.price * product.quantity).toFixed(2)}
            </p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(value) =>
                updateProductQuantity(product, value)
              }
            />

            <button
              onClick={() => removeProductFromCart(product)}
              className="mt-3 underline"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
