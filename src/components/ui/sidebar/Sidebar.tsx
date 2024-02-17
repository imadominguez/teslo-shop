'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import clsx from 'clsx';

import { logout } from '@/actions';
import { useUiStore } from '@/store';

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  // Obtener el estado del menú lateral abierto y la función para cerrarlo
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAunthenticated = !!session?.user;
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="">
      {/* Fondo negro transparente */}
      {isSideMenuOpen && (
        <div className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-30" />
      )}

      {/* Desenfoque */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeSideMenu()}
          className="fade-in fixed left-0 top-0 z-40 h-screen w-screen backdrop-blur-sm backdrop-filter"
        />
      )}

      {/* Menú lateral */}

      <aside
        className={clsx(
          'fixed right-0 top-0 z-50 h-screen w-[375px] transform overflow-auto overflow-x-hidden bg-white p-5 transition-all duration-300 dark:bg-dark',
          {
            'translate-x-full': !isSideMenuOpen,
            'translate-x-0 shadow-2xl shadow-dark': isSideMenuOpen,
          },
        )}
      >
        {/* Botón para cerrar el menú */}
        <div className="flex items-end justify-end">
          <IoCloseOutline
            className="h-10 w-10 cursor-pointer"
            onClick={() => closeSideMenu()}
          />
        </div>

        {isAunthenticated && (
          <>
            <div className="-mx-2 mt-6 flex flex-col items-center">
              <Image
                width={600}
                height={600}
                className="mx-2 h-24 w-24 rounded-full object-cover"
                src={
                  session?.user.image
                    ? session.user.image
                    : '/imgs/placeholder.jpg'
                }
                alt="avatar"
              />
              <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
                {session.user.name}
              </h4>
              <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                {session.user.email}
              </p>
            </div>
            <Link
              className={clsx(
                'mt-5 flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-second dark:hover:text-gray-200',
                {
                  'bg-gray-100 dark:bg-dark-second ': pathname === '/profile',
                },
              )}
              href={'/profile'}
              onClick={() => closeSideMenu()}
            >
              <IoPersonOutline className="h-5 w-5" />

              <span className="mx-4 font-medium">Perfil</span>
            </Link>
            <Link
              href={'/orders'}
              onClick={() => closeSideMenu()}
              className={clsx(
                'mt-5 flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-second dark:hover:text-gray-200',
                {
                  'bg-gray-100 dark:bg-dark-second ': pathname === '/orders',
                },
              )}
            >
              <IoTicketOutline className="h-5 w-5" />
              <span className="mx-4 font-medium">Ordenes</span>
            </Link>
          </>
        )}

        {!isAunthenticated && (
          <>
            <Link
              href={'/auth/login'}
              onClick={() => closeSideMenu()}
              className={clsx(
                'mt-5 flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-second dark:hover:text-gray-200',
                {
                  'bg-gray-100 dark:bg-dark-second ':
                    pathname === '/auth/login',
                },
              )}
            >
              <IoLogInOutline className="h-5 w-5" />
              <span className="mx-4 font-medium">Ingresar</span>
            </Link>
          </>
        )}

        {isAunthenticated && (
          <button
            onClick={() => logout()}
            className="mt-5 flex w-full transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-second dark:hover:text-gray-200"
          >
            <IoLogOutOutline className="h-5 w-5" />
            <span className="mx-4 font-medium">Salir</span>
          </button>
        )}

        {isAdmin && (
          <>
            <div className="my-5 h-px w-full bg-gray-200 dark:bg-neutral-500" />
            <h3 className=" text-center text-xl font-semibold text-gray-600 dark:text-gray-300">
              Dashboard
            </h3>
            <Link
              href={'/admin/products'}
              onClick={() => closeSideMenu()}
              className={clsx(
                'mt-5 flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-second dark:hover:text-gray-200',
                {
                  'bg-gray-100 dark:bg-dark-second ':
                    pathname === '/admin/products',
                },
              )}
            >
              <IoShirtOutline className="h-5 w-5" />
              <span className="mx-4 font-medium">Productos</span>
            </Link>
            <Link
              href={'/admin/orders'}
              onClick={() => closeSideMenu()}
              className={clsx(
                'mt-5 flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-second dark:hover:text-gray-200',
                {
                  'bg-gray-100 dark:bg-dark-second ':
                    pathname === '/admin/orders',
                },
              )}
            >
              <IoTicketOutline className="h-5 w-5" />
              <span className="mx-4 font-medium">Ordenes</span>
            </Link>
            <Link
              href={'/admin/users'}
              onClick={() => closeSideMenu()}
              className={clsx(
                'mt-5 flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-dark-second dark:hover:text-gray-200',
                {
                  'bg-gray-100 dark:bg-dark-second ':
                    pathname === '/admin/users',
                },
              )}
            >
              <IoPeopleOutline className="h-5 w-5" />
              <span className="mx-4 font-medium">Usuarios</span>
            </Link>
          </>
        )}
      </aside>
    </div>
  );
};
