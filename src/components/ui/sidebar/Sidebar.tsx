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
  IoSearchOutline,
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
        // TODO: Efecto de deslizamiento
        className={clsx(
          'fixed right-0 top-0 z-20 h-screen max-w-[500px] transform bg-white p-5 shadow-2xl transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
            'translate-x-0': isSideMenuOpen,
          },
        )}
      >
        {/* Botón para cerrar el menú */}
        <IoCloseOutline
          size={50}
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {/* Input de búsqueda */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute left-2 top-2" />
          <input
            type="text"
            placeholder="Buscar..."
            className="rounder w-full border-b-2 border-gray-200 bg-gray-50 py-1 pl-10 pr-10 text-xl focus:border-blue-500 focus:outline-none "
          />
        </div>

        {/* Enlaces del menú */}

        {isAunthenticated && (
          <>
            <Link
              href={'/profile'}
              onClick={() => closeSideMenu()}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              href={'/orders'}
              onClick={() => closeSideMenu()}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {!isAunthenticated && (
          <Link
            href={'/auth/login'}
            onClick={() => closeSideMenu()}
            className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAunthenticated && (
          <button
            onClick={() => logout()}
            // href={'/'}
            className="mt-10 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {isAdmin && (
          <>
            <div className="my-10 h-px w-full bg-gray-200" />
            <h3 className="text-center text-2xl font-semibold text-gray-600">
              Dashboard
            </h3>
            <Link
              href={'/'}
              onClick={() => closeSideMenu()}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href={'/admin/orders'}
              onClick={() => closeSideMenu()}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href={'/'}
              onClick={() => closeSideMenu()}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
