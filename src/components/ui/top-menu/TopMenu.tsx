'use client';
import Link from 'next/link';

import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import { font } from '@/config/fonts';
import { BtnCloseMenu } from './btn-close-menu';
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';

export const TopMenu = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="mx-auto flex  w-full max-w-[100rem]  items-center justify-between bg-gradient-to-b from-gray-500/30  to-transparent  px-5 pb-5 2xl:bg-transparent 2xl:bg-none">
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <span className={`${font.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu  */}
      <div className="hidden sm:block">
        <Link
          href={'/gender/men'}
          className="m-2 rounded-md p-2 transition-all  hover:bg-gray-100 dark:hover:text-black"
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

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href={'/search'} className="mx-2">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <Link
          href={`${totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}`}
          className=" mx-2"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-700  px-1 text-center text-xs font-bold text-white">
                {totalItemsInCart === 0 ? '' : totalItemsInCart}
              </span>
            )}

            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>

        <BtnCloseMenu />
      </div>
    </nav>
  );
};
