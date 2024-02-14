export const revalidate = 10080;

import { Metadata, ResolvingMetadata } from 'next';
import { font } from '@/config/fonts';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/actions';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from '@/components';
import { AddToCart } from './ui/AddToCart';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // leer parámetros de ruta
  const slug = params.slug;

  // obtener datos del producto
  const product = await getProductBySlug(slug);

  // opcionalmente acceder y extender (en lugar de reemplazar) los metadatos del padre
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: `Descubre más sobre ${product?.title}. Encuentra detalles, precios y más. ${product?.description}`,
    keywords: `${product?.title}, ${product?.gender}, productos, tienda online, compras`,
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: `Descubre más sobre ${product?.title}. Encuentra detalles, precios y más.`,
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export async function generateStaticParams() {
  const { products } = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mb-20 mt-5 grid gap-3  md:grid-cols-3">
      {/* Slideshow */}
      <div className="col-span-1  md:col-span-2">
        {/* Desktop slideshow */}

        <ProductSlideshow
          className="hidden md:block"
          title={product.title}
          images={product.images}
        />

        {/* Mobile slideshow  */}
        <ProductMobileSlideshow
          className="block md:hidden"
          title={product.title}
          images={product.images}
        />
      </div>

      {/* Product Info  */}
      <div className="col-span-1  px-5">
        <h1 className={`${font.className} antialiase mb-3 text-xl font-bold`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug} />

        <p className="mb-5 text-lg font-semibold">
          {currencyFormat(product.price)}
        </p>

        <AddToCart product={product} />
        {/* Descripcion del producto  */}
        <h3 className="font-bold ">Descripcion</h3>
        <p className="text-dark-text text-pretty font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
}
