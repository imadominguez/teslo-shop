'use client';
import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Importación de estilos y módulos Swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css'; // Estilos personalizados
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { ProductImage } from '../product-image/ProductImage';

// Propiedades esperadas para el componente ProductSlideshow
interface Props {
  images: string[];
  title: string;
  className?: string;
}

// Componente para mostrar un carrusel de imágenes con miniaturas
export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    // Contenedor principal con la clase proporcionada
    <div className={className}>
      {/* Carrusel principal con opciones y módulos */}
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {/* Mapeo de las imágenes para crear los slides del carrusel principal */}
        {images.map((image) => (
          <SwiperSlide key={image}>
            {/* Imagen de cada slide con atributos y clases */}
            <ProductImage
              src={image}
              width={1024}
              height={800}
              alt={title}
              className="w-full rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Carrusel de miniaturas con opciones y módulos */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {/* Mapeo de las imágenes para crear las miniaturas */}
        {images.map((image) => (
          <SwiperSlide key={image}>
            {/* Miniatura de cada imagen con atributos y clases */}
            <ProductImage
              src={image}
              width={1024}
              height={800}
              alt={title}
              className="w-full rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
