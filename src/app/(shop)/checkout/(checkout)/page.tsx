import Link from 'next/link';
import { Metadata } from 'next';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';

export const metadata: Metadata = {
  title: 'Verificar Orden - Teslo | SHOP',
  description:
    'Verifica y ajusta los elementos de tu orden en Teslo SHOP antes de confirmar tu compra. Edita los productos en tu carrito y revisa un resumen detallado antes de proceder al pago.',
  keywords: 'Verificar Orden, Teslo, SHOP, Carrito, Confirmar Compra',
};

export default function CheckoutPage() {
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="mx-auto flex max-w-4xl flex-col ">
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          {/* Carrito */}
          <div className="flex flex-col ">
            <Link href={'/cart'} className="btn-primary mb-5 w-fit text-xs">
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
