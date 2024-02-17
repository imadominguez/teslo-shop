'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/interfaces';
import { currencyFormat } from '@/utils';

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
    <Link
      href={`/product/${product.slug}`}
      className="fade-in group block overflow-hidden"
    >
      <div className="relative">
        {/* Enlace a la página del producto con imagen */}

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
      </div>

      <div className="b relative pt-3">
        <h3 className="text-sm group-hover:underline group-hover:underline-offset-4 dark:text-dark-text">
          {product.title}
        </h3>

        <p className="mt-1.5 tracking-wide dark:text-dark-text">
          {currencyFormat(product.price)}
        </p>
      </div>
    </Link>
  );
};
