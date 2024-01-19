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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtenemos la pagina actual y si no es un numero o es menor a 1 redirigimos a la pagina 1
  const pageString = searchParams.get('page') ?? '1';
  // Evaluamos si el pageString no es un number
  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  // Si la pagina actual es menor a 1 o pageString no es numero redirigimos al pathname
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }
  // Creamos el pathname de la pagina actual // /?page={numero-de-pagina}
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }
    if (+pageNumber === 0) {
      return `${pathname}`;
    }
    if (+pageNumber > totalPages) {
      // Next >
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  // Generamos las paginas a mostrar con el metodo generatePagination
  const allPages = generatePagination(+currentPage, +totalPages);

  return (
    <div className="mb-10 mt-10 flex justify-center text-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex items-center gap-x-1">
          <li className="page-item  ">
            <Link
              className="page-link  relative block rounded  border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(+currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={20} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={`${page} + ${index} + 1`} className="page-item">
              <Link
                className={clsx(
                  'page-link relative block rounded  border-0  px-3 py-1.5 text-gray-800 outline-none transition-all duration-300  hover:text-gray-800 focus:shadow-none',
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

          <li className="page-item">
            <Link
              className="page-link relative block rounded  border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
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
