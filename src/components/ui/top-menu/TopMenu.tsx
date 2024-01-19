import Link from 'next/link';

import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import { font } from '@/config/fonts';
import { BtnCloseMenu } from './btn-close-menu';

export const TopMenu = () => {
  return (
    <nav className="flex  w-full items-center justify-between px-5 backdrop-blur">
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
        <Link href={'/cart'} className="mx-2">
          <div className="relative">
            <span className="absolute -right-2 -top-2 rounded-full  bg-orange-700 px-1 text-xs font-bold text-white">
              3
            </span>
            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>

        <BtnCloseMenu />
      </div>
    </nav>
  );
};
