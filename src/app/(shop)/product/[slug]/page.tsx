export const revalidate = 10080;

import { getPaginatedProductsWidthImages, getProductBySlug } from '@/actions';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from '@/components';
import { font } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    // openGraph: {
    //   title: product?.title ?? 'Producto no encontrado',
    //   description: product?.description ?? '',
    //   // images: [], // https://misitioweb.com/products/image.png
    //   images: [`/products/${product?.images[1]}`],
    // },
  };
}
// export async function generateStaticParams() {
//   const { products } = await getPaginatedProductsWidthImages();
//   return products.map((product) => ({
//     slug: product.slug,
//   }));
// }
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
        <StockLabel slug={product.slug} />
        <h1 className={`${font.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>

        <p className="mb-5 text-lg">{product.price}</p>

        <AddToCart product={product} />
        {/* Descripcion del producto  */}
        <h3 className="text-sm font-bold ">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
