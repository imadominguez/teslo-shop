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

export const Sidebar = () => {
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
        <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30" />
      )}

      {/* Desenfoque */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeSideMenu()}
          className="fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter"
        />
      )}

      {/* Menú lateral */}
      <nav
        className={clsx(
          'fixed right-0 top-0 z-20 h-screen w-[375px] transform overflow-auto overflow-x-hidden bg-white p-5 transition-all duration-300 dark:bg-neutral-900',
          {
            'translate-x-full': !isSideMenuOpen,
            'translate-x-0 shadow-2xl shadow-black': isSideMenuOpen,
          },
        )}
      >
        {/* Botón para cerrar el menú */}
        <div className="flex items-end justify-end">
          <IoCloseOutline
            size={50}
            className="cursor-pointer"
            onClick={() => closeSideMenu()}
          />
        </div>

        {/* Enlaces del menú */}

        {isAunthenticated && (
          <>
            <Link
              href={'/profile'}
              onClick={() => closeSideMenu()}
              className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-neutral-700"
            >
              <IoPersonOutline size={24} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              href={'/orders'}
              onClick={() => closeSideMenu()}
              className="mt-5 flex items-center rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-neutral-700"
            >
              <IoTicketOutline size={24} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {!isAunthenticated && (
          <Link
            href={'/auth/login'}
            onClick={() => closeSideMenu()}
            className="mt-5 flex items-center rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <IoLogInOutline size={24} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAunthenticated && (
          <button
            onClick={() => logout()}
            // href={'/'}
            className="mt-5 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <IoLogOutOutline size={24} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {isAdmin && (
          <>
            <div className="my-10 h-px w-full bg-gray-200 dark:bg-neutral-500" />
            <h3 className=" text-center text-2xl font-semibold text-gray-600 dark:text-gray-300">
              Dashboard
            </h3>
            <Link
              href={'/admin/products'}
              onClick={() => closeSideMenu()}
              className="mt-8 flex items-center rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-neutral-700"
            >
              <IoShirtOutline size={24} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href={'/admin/orders'}
              onClick={() => closeSideMenu()}
              className="mt-5 flex items-center rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-neutral-700"
            >
              <IoTicketOutline size={24} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href={'/admin/users'}
              onClick={() => closeSideMenu()}
              className="mt-5 flex items-center rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-neutral-700"
            >
              <IoPeopleOutline size={24} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
