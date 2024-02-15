'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

// Componente para mostrar el resumen de la orden en el carrito
export const OrderSummary = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  // Obteniendo información del carrito desde el store
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  // Efecto para indicar que el componente ha cargado
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Renderización condicional mientras se carga el componente
  if (!loaded) {
    return (
      // Placeholder animado mientras se carga la información
      <div className="sticky top-20 flex h-64 flex-col gap-4 rounded-xl bg-white p-7 shadow-xl dark:bg-neutral-800"></div>
    );
  }

  // Renderización del resumen de la orden
  return (
    <div className="dark:bg-dark-accent dark:shadow-dark-second sticky top-20 h-fit rounded-xl bg-gray-200 p-7 shadow-lg">
      <h2 className="mb-2 text-2xl">Resumen de orden</h2>

      {/* Grid para mostrar la información de la orden */}
      <div className="grid grid-cols-2">
        <span>No Productos</span>
        {/* Cantidad de productos en el carrito */}
        <span className="text-right">
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        {/* Subtotal de la orden */}
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos{'15%'}</span>
        {/* Impuestos aplicados a la orden */}
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total: </span>
        {/* Total de la orden */}
        <span className="mt-5 text-right text-xl">{currencyFormat(total)}</span>
      </div>

      {/* Botón para ir al proceso de pago */}
      <div className="mb-2 mt-5 w-full">
        <Link
          href={'/checkout/address'}
          className="btn-primary flex justify-center"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
