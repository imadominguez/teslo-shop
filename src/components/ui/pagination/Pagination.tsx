'use client';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { generatePagination } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  // Obtener la ruta actual y los parámetros de búsqueda
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtener el número de página actual de los parámetros de búsqueda
  const pageString = searchParams.get('page') ?? '1';
  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  // Si la página actual es menor a 1 o pageString no es un número, redirigir a la página 1
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  // Función para crear la URL de una página específica
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    // Si pageNumber es '...', devuelve la URL actual sin cambios
    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }

    // Si pageNumber es 0, devuelve la URL sin el parámetro 'page'
    if (+pageNumber === 0) {
      return `${pathname}`;
    }

    // Si pageNumber es mayor que el total de páginas, devuelve la URL actual sin cambios
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    // Establecer el parámetro 'page' en el nuevo número de página
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generar la lista de páginas para mostrar en la paginación
  const allPages = generatePagination(+currentPage, +totalPages);

  return (
    <div className="mb-10 mt-10 flex justify-center text-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex items-center gap-x-1">
          {/* Botón para ir a la página anterior */}
          <li className="page-item">
            <Link
              className="page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(+currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={20} />
            </Link>
          </li>

          {/* Lista de páginas generadas */}
          {allPages.map((page, index) => (
            <li key={`${page} + ${index} + 1`} className="page-item">
              <Link
                className={clsx(
                  'page-link relative block rounded border-0 px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:text-gray-800 focus:shadow-none',
                  {
                    'bg-blue-700 text-white shadow-md hover:bg-blue-500 hover:text-white':
                      page === +currentPage,
                    'hover:bg-gray-300': page !== +currentPage,
                  },
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          {/* Botón para ir a la página siguiente */}
          <li className="page-item">
            <Link
              className="page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(+currentPage + 1)}
            >
              <IoChevronForwardOutline size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
