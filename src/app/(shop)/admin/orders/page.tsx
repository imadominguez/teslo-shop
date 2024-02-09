export const revalidate = 0;

import Link from 'next/link';
import { Title } from '@/components';
import { IoCardOutline } from 'react-icons/io5';
import { getPaginatedOrders } from '@/actions';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todas las ordenes',
  description:
    'Explora la página del administrador en Teslo SHOP y visualiza todas las órdenes pendientes y pagadas. Gestiona fácilmente el estado de las órdenes y accede a opciones detalladas para cada una.',
  keywords:
    'Teslo, shop, administrador, ordenes, órdenes pendientes, órdenes pagadas',
};

export default async function OrdersPageAdmin() {
  const { ok, orders = [] } = await getPaginatedOrders();

  if (!ok) {
    redirect('/auth/login');
  }
  const isPaid = (status: boolean) => {
    if (!status) {
      return (
        <>
          <IoCardOutline className="text-red-800" />
          <span className="mx-2 text-red-800">No Pagada</span>
        </>
      );
    }
    return (
      <>
        <IoCardOutline className="text-green-800" />
        <span className="mx-2 text-green-800">Pagada</span>
      </>
    );
  };

  return (
    <>
      <Title title="Todas las ordenes" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="border-b bg-gray-200 dark:border-gray-500 dark:bg-gray-500">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                #ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.tax}
                className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-400 dark:hover:bg-gray-300"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {order.id.split('-').at(0)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  {order.OrderAddress!.firstName} {order.OrderAddress!.lastName}
                </td>
                <td className="flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900">
                  {isPaid(order.isPaid)}
                </td>
                <td className="px-6 text-sm font-light text-gray-900 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
