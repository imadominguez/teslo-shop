'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummatyInformation(),
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className=" sticky top-40 flex h-64 flex-col gap-4  rounded-xl bg-white p-7 shadow-xl">
        <div className="h-3 w-2/3  animate-pulse rounded bg-gray-700"></div>
        <div className="mb-4 h-3  w-2/3 animate-pulse rounded bg-gray-700"></div>
        <div className="mb-2 h-3 w-2/3  animate-pulse rounded bg-gray-700"></div>
        <div className="h-3 w-2/3  animate-pulse rounded bg-gray-700"></div>
      </div>
    );
  }

  return (
    <div className=" sticky top-40 h-fit rounded-xl bg-white p-7 shadow-xl">
      <h2 className="mb-2 text-2xl">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No Productos</span>

        <span className="text-right">
          {itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}
        </span>

        <span>Subtotal</span>

        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos{'15%'}</span>

        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total: </span>

        <span className="mt-5 text-right text-xl">{currencyFormat(total)}</span>
      </div>

      <div className="mb-2 mt-5 w-full">
        <Link
          href={'/checkout/address'}
          className="btn-primary flex justify-center"
        >
          Chekout
        </Link>
      </div>
    </div>
  );
};
