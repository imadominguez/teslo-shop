import Link from 'next/link';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function CartPage() {
  // TODO: Redireccionar si el carrito esta vacio
  //  redirect('/empty');

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col ">
        <Title title="Carrito de compra" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          {/* Carrito */}
          <div className="mt-5 flex flex-col ">
            <span className="text-xl">Agregar mas items</span>
            <Link href={'/'} className="mb-5 underline">
              Continua comprando
            </Link>

            <ProductsInCart />
          </div>
          {/* Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
