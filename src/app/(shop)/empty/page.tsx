import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | SHOP',
    default: 'Carrito Vacío - Teslo | SHOP',
  },
  description:
    'Tu carrito en Teslo SHOP está vacío. ¡Explora nuestra amplia selección de productos y comienza a agregar artículos emocionantes a tu carrito de compras hoy mismo!',
  keywords: 'Carrito Vacío, Teslo, SHOP, Compras en línea, Explorar Productos',
};

export default function EmptyPage() {
  return (
    <div className="flex h-[80dvh] w-full flex-col items-center justify-center">
      <IoCartOutline size={80} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito esta vacio</h1>
      </div>

      <Link href={'/'} className="font-bold text-blue-400">
        Regresar
      </Link>
    </div>
  );
}
