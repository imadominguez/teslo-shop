export const revalidate = 60;

import { Metadata } from 'next';
import { getPaginatedProductsWidthImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

export const metadata: Metadata = {
  title: 'Tienda - Todos los productos',
  description:
    'Explora nuestra amplia selección de productos en nuestra tienda en línea.',
  keywords: 'tienda, productos, compras, electrónica, moda, hogar',
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWidthImages({ page });

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2 px-7"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
