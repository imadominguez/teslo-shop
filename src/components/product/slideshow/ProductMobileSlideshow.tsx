'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Importación de estilos y módulos Swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css'; // Estilos personalizados
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';

// Propiedades esperadas para el componente ProductMobileSlideshow
interface Props {
  images: string[];
  title: string;
  className?: string;
}

// Componente para mostrar un carrusel de imágenes en dispositivos móviles
export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    // Contenedor del carrusel con la clase proporcionada
    <div className={className}>
      {/* Carrusel Swiper con opciones y módulos */}
      <Swiper
        style={{
          width: '100vw',
          height: '42dvh',
        }}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {/* Mapeo de las imágenes para crear los slides del carrusel */}
        {images.map((image) => (
          <SwiperSlide key={image}>
            {/* Imagen de cada slide con atributos y clases */}
            <Image
              src={`/products/${image}`}
              width={500}
              height={500}
              alt={title}
              className=" object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
