import { redirect } from 'next/navigation';
import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  // TODO: new
  if (!product) {
    redirect('/admin/products');
  }
  const title = slug === 'new' ? 'Nuevo producto' : product?.title;
  return (
    <>
      <Title title={title} />

      <ProductForm product={product} categories={categories} />
    </>
  );
}
