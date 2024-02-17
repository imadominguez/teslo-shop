import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrito de compra',
  description:
    'Explora nuestro carrito de compra en Teslo SHOP y agrega más artículos a tu selección. Continúa comprando con facilidad mientras revisas tus productos. ¡Simplifica tu experiencia de compra en línea hoy mismo!',
  keywords:
    'Teslo, shop, administrador, ordenes, carrito de compra, compras en línea',
};

export default function CartPage() {
  return (
    <div className=" flex items-center justify-center px-5">
      <div className="flex w-[1000px]  flex-col ">
        <Title title="Carrito de compra" subtitle="Articulos en tu carrito" />
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 ">
          {/* Carrito */}
          <div className="flex flex-col ">
            <Link href={'/'} className="btn-primary mb-5 w-fit text-xs">
              Continua comprando
            </Link>

            <ProductsInCart />
          </div>
          <div className="flex w-full justify-end md:justify-center">
            {/* Summary */}
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
