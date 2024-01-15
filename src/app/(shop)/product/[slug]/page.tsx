import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { font } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

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
        <h1 className={`${font.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>

        <p className="mb-5 text-lg">{product.price}</p>

        {/* Selector de Tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSize={product.sizes}
        />
        {/* Selector de Cantidad */}
        <QuantitySelector quantity={2} />
        {/* Boton agregar al carrito */}
        <button className="btn-primary my-5">Agregar al carrito</button>
        {/* Descripcion del producto  */}
        <h3 className="text-sm font-bold ">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
