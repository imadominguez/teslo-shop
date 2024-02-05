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
  const [displayImage, setDisplayImage] = useState<string>(getInitialImage());

  // Función para obtener la imagen inicial basada en el tipo de imágenes recibidas
  function getInitialImage(): string {
    if (Array.isArray(product.images) && product.images.length > 0) {
      if (product.images[0].includes('http')) {
        return product.images[0];
      } else {
        return `/products/${product.images[0]}`;
      }
      // Si el producto tiene imágenes en formato de URL de Cloudinary
      // if (typeof product.images[0] === 'string') {
      //   return product.images[0];
      // }
      // // Si el producto tiene imágenes en formato de nombres de archivo
      // else if (typeof product.images[0] === 'string') {
      //   // Suponiendo que el primer elemento del array de imágenes es el que se muestra por defecto
      //   return `/products/${product.images[0]}`;
      // }
    }
    // Si no hay imágenes disponibles
    return '';
  }

  // Función para cambiar la imagen al pasar el ratón por encima
  function handleMouseEnter() {
    if (Array.isArray(product.images) && product.images.length > 0) {
      if (product.images[1].startsWith('http')) {
        setDisplayImage(product.images[1]);
      } else {
        setDisplayImage(`/products/${product.images[1]}`);
      }
    }
  }

  // Función para volver a la imagen original al quitar el ratón
  function handleMouseLeave() {
    if (Array.isArray(product.images) && product.images.length > 0) {
      if (product.images[1].startsWith('http')) {
        setDisplayImage(product.images[0]);
      } else {
        setDisplayImage(`/products/${product.images[0]}`);
      }
    }
  }

  return (
    // Contenedor con efecto de desvanecimiento y ocultamiento de desbordamiento
    <div className="fade-in  overflow-hidden">
      {/* Enlace a la página del producto con imagen */}
      <Link href={`/product/${product.slug}`}>
        <Image
          src={displayImage}
          alt={product.title}
          className="w-full rounded object-cover"
          width={500}
          height={500}
          priority
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
