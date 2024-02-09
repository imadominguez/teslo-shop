'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const address = useAddressStore((state) => state.address);
  const clearCart = useCartStore((state) => state.clearCart);
  // Obteniendo información del carrito desde el store
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
      };
    });

    //! Server Action
    const res = await placeOrder(productsToOrder, address);

    if (!res.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(res.message);
      return;
    }

    //* Todo salio bien
    setIsPlacingOrder(false);

    // Limpiamos el carrito y redireccionamos al usuario
    clearCart();
    router.replace('/orders/' + res.order?.id);
  };

  if (loaded === false) {
    return <span className="text-3xl font-bold">Cargando...</span>;
  }

  return (
    <div className="flex flex-col justify-between rounded-xl bg-white p-7 shadow-xl dark:bg-neutral-900">
      <h2 className="mb-2 text-2xl font-semibold">Direccion de entrega</h2>
      <div className="mb-10 flex flex-col ">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <span>{address.address}</span>
        <span>{address.address2}</span>
        <span>{address.country}</span>
        <span>CP: {address.postalCode}</span>
        <span>{address.phone}</span>
      </div>

      {/* Divider */}

      <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

      <h2 className="mb-2 text-2xl font-semibold">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No Productos</span>
        {/* Cantidad de productos en el carrito */}
        <span className="text-right">
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        {/* Subtotal de la orden */}
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos {'15%'}</span>
        {/* Impuestos aplicados a la orden */}
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total: </span>
        {/* Total de la orden */}
        <span className="mt-5 text-right text-xl">{currencyFormat(total)}</span>
      </div>

      <div className="mb-2 mt-5 w-full">
        <p className="mb-5 mt-5 text-balance text-center text-sm">
          {/* Disclaimer */}
          Al hacer click en "Colocar Orden", aceptas nuestros{' '}
          <a href="" className=" underline">
            Terminos y Condiciones
          </a>{' '}
          y{' '}
          <a href="" className="underline">
            politica de privacidad
          </a>
        </p>
        <p className=" text-red-500">{errorMessage}</p>
        <button
          // href={'/orders/123'}
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={clsx(' flex w-full justify-center', {
            'btn-disable': isPlacingOrder,
            'btn-primary': !isPlacingOrder,
          })}
        >
          {isPlacingOrder ? 'Colocando orden' : 'Colocar orden'}
        </button>
      </div>
    </div>
  );
};
