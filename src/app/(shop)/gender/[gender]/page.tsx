export const revalidate = 60;

import { getPaginatedProductsWidthImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { Gender } from '@prisma/client';
import { notFound, redirect, useSearchParams } from 'next/navigation';

const seedProducts = initialData.products;

interface Props {
  params: {
    gender: Category;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({
  params,
  searchParams: { page },
}: Props) {
  const { gender } = params;
  if (!gender) {
    notFound();
  }
  const labels: Record<Category, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para unisex',
  };
  const subtitleLabel: Record<Category, string> = {
    men: 'Productos para él',
    women: 'Productos para ella',
    kid: 'Productos para los niños',
    unisex: 'Todos los productos para todes xD',
  };
  // if (!Object.keys(labels).includes(gender)) {
  //   notFound();
  // }
  const { products, totalPages } = await getPaginatedProductsWidthImages({
    gender,
    page: page ? +page : 1,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <>
      <Title
        title={`Articulos ${labels[gender]}`}
        subtitle={subtitleLabel[gender]}
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
