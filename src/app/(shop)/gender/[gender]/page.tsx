export const revalidate = 60;

import { notFound, redirect } from 'next/navigation';
import { Gender } from '@prisma/client';
import { CategoryProducts } from '@/interfaces';
import { getPaginatedProductsWidthImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Metadata } from 'next';

interface Props {
  params: {
    gender: CategoryProducts;
  };
  searchParams: {
    page?: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const labels: Record<string, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para unisex',
  };

  const genderLabel = labels[params.gender];

  return {
    title: `Artículos ${genderLabel} - Teslo | SHOP`,
    description: `Explora nuestra amplia selección de artículos ${genderLabel} en Teslo SHOP. Encuentra los mejores productos ${genderLabel} para ti.`,
    keywords: `Artículos ${genderLabel}, ${params.gender}, moda ${params.gender}, ropa ${params.gender}, accesorios ${params.gender}, ${genderLabel} Teslo SHOP`,
  };
}

export async function generateStaticParams() {
  const genders = ['men', 'women', 'kid', 'unisex'];

  return genders.map((gender) => ({
    gender: gender,
  }));
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
  if (!Object.keys(labels).includes(gender)) {
    notFound();
  }
  const title = `Artículos ${labels[gender]}`;
  const subtitle = subtitleLabel[gender];

  return (
    <>
      <Title title={title} subtitle={subtitle} className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
