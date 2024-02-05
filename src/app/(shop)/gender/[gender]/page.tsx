export const revalidate = 60;

import { redirect } from 'next/navigation';
import { Gender } from '@prisma/client';
import { CategoryProducts } from '@/interfaces';
import { getPaginatedProductsWidthImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  params: {
    gender: CategoryProducts;
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

  const { products, totalPages } = await getPaginatedProductsWidthImages({
    page: page ? +page : 1,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para unisex',
  };

  const subtitleLabel: Record<string, string> = {
    men: 'Productos para él',
    women: 'Productos para ella',
    kid: 'Productos para los niños',
    unisex: 'Todos los productos para todes xD',
  };
  // if (!Object.keys(labels).includes(gender)) {
  //   notFound();
  // }

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
