import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

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
