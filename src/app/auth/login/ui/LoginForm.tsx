'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions';
import { IoInformationCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { useEffect } from 'react';

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="dark:bg-bg-dark-second dark:border-bg-dark-second mb-5  rounded border bg-gray-200 px-5 py-2"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="dark:bg-bg-dark-second dark:border-bg-dark-second mb-5  rounded border bg-gray-200 px-5 py-2"
        type="password"
        name="password"
      />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="mb-3 flex h-8 items-end space-x-1 font-semibold"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === 'Credenciales incorrectas' && (
            <>
              <IoInformationCircleOutline className="h-5 w-5  text-red-500" />
              <p className="text-sm  text-red-500">Credenciales incorrectas</p>
            </>
          )}
          {state === 'Success' && (
            <>
              <IoInformationCircleOutline className="h-5 w-5  text-green-500" />
              <p className="text-sm  text-green-500">Credenciales correctas</p>
            </>
          )}
        </div>
      </div>
      <LoginButton />

      {/* divisor l ine */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="dark:text-dark-text px-2 ">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx('btn-primary', {
        'btn-disable': pending,
        'btn-primary': !pending,
      })}
      aria-disabled={pending}
    >
      Ingresar
    </button>
  );
}
