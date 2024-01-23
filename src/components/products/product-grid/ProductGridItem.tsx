'use client';
import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Propiedades esperadas para el componente ProductGridItem
interface Props {
  product: Product;
}

// Componente que representa un elemento en la cuadrícula de productos
export const ProductGridItem = ({ product }: Props) => {
  // Estado local para manejar la imagen que se muestra en respuesta a eventos de ratón
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    // Contenedor con efecto de desvanecimiento y ocultamiento de desbordamiento
    <div className="fade-in  overflow-hidden">
      {/* Enlace a la página del producto con imagen */}
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full rounded object-cover"
          width={500}
          height={500}
          priority
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      {/* Información del producto (título y precio) */}
      <div className="flex flex-col p-4">
        <Link
          href={`/product/${product.slug}`}
          className="text-xl font-bold text-gray-700 dark:text-gray-400"
        >
          {product.title}
        </Link>
        <span className="font-bold">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};
