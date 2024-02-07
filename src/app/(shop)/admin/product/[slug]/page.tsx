import { redirect } from 'next/navigation';
import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { ProductForm } from './ui/ProductForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | SHOP',
    default: 'Mantenimiento de producto',
  },
  description: 'Administración del producto',
  keywords: 'Teslo, shop, administrador, productos',
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

  // TODO: new
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
