import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';

export default function CheckoutPage() {
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col ">
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          {/* Carrito */}
          <div className="mt-5 flex flex-col ">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={'/cart'} className="mb-5 underline">
              Editar carrito
            </Link>

            {/* items del carrito */}
            <ProductsInCart />
          </div>
          {/* Summary */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
