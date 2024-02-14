'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';
import { font } from '@/config/fonts';
import { BtnCloseMenu } from './btn-close-menu';
import { useCartStore } from '@/store';
import { ThemeButton } from './ThemeButton';

export const TopMenu = () => {
  // Obtener el total de elementos en el carrito utilizando el estado global
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  // Estado para rastrear si la página ha cargado
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Marcar como cargado después de que el componente se monta
    setLoaded(true);
  }, []);

  return (
    <nav className="mx-auto flex w-full max-w-[100rem] items-center justify-between bg-gradient-to-b from-gray-500/30 to-transparent px-5 pb-5 2xl:bg-transparent 2xl:bg-none">
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <span className={`${font.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Menú central (oculto en pantallas pequeñas) */}
      <div className="hidden sm:block">
        <Link
          href={'/gender/men'}
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100 dark:hover:text-black"
        >
          Hombres
        </Link>
        <Link
          href={'/gender/women'}
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100 dark:hover:text-black"
        >
          Mujeres
        </Link>
        <Link
          href={'/gender/kid'}
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100 dark:hover:text-black"
        >
          Nenes
        </Link>
      </div>

      {/* Íconos de búsqueda, carrito y botón para cerrar el menú */}
      <div className="flex items-center">
        <Link href={'/search'} className="mx-2">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <Link
          href={`${totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}`}
          className="mx-2"
        >
          <div className="relative">
            {/* Mostrar el número de elementos en el carrito si hay alguno */}
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-700 px-1 text-center text-xs font-bold text-white">
                {totalItemsInCart === 0 ? '' : totalItemsInCart}
              </span>
            )}

            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>
        <ThemeButton />
        {/* Componente para cerrar el menú */}
        <BtnCloseMenu />
      </div>
    </nav>
  );
};
