import { redirect } from 'next/navigation';
import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { ProductForm } from './ui/ProductForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mantenimiento de producto',
  description:
    'Administra y mantiene tus productos en Teslo SHOP. Agrega nuevos productos o edita los existentes para mantener tu catálogo actualizado y atractivo para tus clientes.',
  keywords:
    'Teslo, shop, administrador, productos, mantenimiento de productos, catálogo de productos',
};

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }
  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';
  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
