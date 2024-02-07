import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';
import { OrderStatus, PaypalButton, Title } from '@/components';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  return {
    title: `Orden #${id.split('-').at(-1)}`,
    description: `Detalles de la orden #${id} en Teslo SHOP.`,
    keywords: 'Orden, Detalles de la orden, Estado de la orden, Teslo SHOP',
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const address = order!.OrderAddress;
  const isPaid = order!.isPaid;
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col ">
        <Title title={`Orden #${id.split('-').at(-1)}`} />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          <div className="mt-5 flex flex-col ">
            <OrderStatus isPaid={isPaid} />

            {/* items del carrito */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + '-' + item.size}
                className="mb-5 flex"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  style={{ width: '100px', height: '100px' }}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl">Direccion de entrega</h2>
            <div className="mb-10 flex flex-col font-bold">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <small>{address!.address}</small>
              <small>{address!.address2}</small>
              <small>{address!.countryId}</small>
              <small>CP: {address!.postalCode}</small>
              <small>{address!.phone}</small>
            </div>

            {/* Divider */}

            <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

            <h2 className="mb-2 text-2xl">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No Productos</span>
              {/* Cantidad de productos en el carrito */}
              <span className="text-right">
                {order!.itemsInOrder === 1
                  ? '1 artículo'
                  : `${order!.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              {/* Subtotal de la orden */}
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos {'15%'}</span>
              {/* Impuestos aplicados a la orden */}
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total: </span>
              {/* Total de la orden */}
              <span className="mt-5 text-right text-xl">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mb-2 mt-5 w-full">
              {isPaid ? (
                <OrderStatus isPaid={isPaid} />
              ) : (
                <PaypalButton orderId={order!.id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
