export const revalidate = 60;

import { redirect } from 'next/navigation';
import { getPaginatedProductsWidthImages } from '@/actions';
import { Title, ProductGrid, Pagination } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWidthImages({
    page,
  });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
