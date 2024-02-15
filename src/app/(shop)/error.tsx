'use client';

import Image from 'next/image';

export default function error() {
  return (
    <div className="flex h-[80dvh] items-center justify-center">
      <div className="text-center">
        <Image
          src="/imgs/starman_750x750.png" // Reemplaza con la ruta correcta de tu imagen
          alt="Error Image"
          width={1000}
          height={1000}
          className="mx-auto mb-4 w-72"
        />
        <h1 className="mb-2 text-2xl font-semibold">
          Sitio Temporalmente Cerrado
        </h1>
        <p className="text-gray-600 dark:text-dark-text-light">
          Estamos realizando mejoras. Vuelve pronto.
        </p>
      </div>
    </div>
  );
}
