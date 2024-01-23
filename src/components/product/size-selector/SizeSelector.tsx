import type { Size } from '@/interfaces';
import clsx from 'clsx';
import React from 'react';

// Propiedades esperadas para el componente SizeSelector
interface Props {
  selectedSize?: Size;
  availableSize: Size[];
  onSizeChange: (size: Size) => void;
}

// Componente para seleccionar el tamaño de un producto
export const SizeSelector = ({
  selectedSize,
  availableSize,
  onSizeChange,
}: Props) => {
  return (
    // Contenedor general con margen superior
    <div className="my-5">
      {/* Título de las tallas disponibles */}
      <h3 className="mb-4 font-bold">Tallas disponibles</h3>

      {/* Contenedor flex para los botones de tallas */}
      <div className="flex">
        {/* Mapeo de las tallas disponibles */}
        {availableSize.map((size) => (
          // Botón para cada tamaño, con evento de clic y clases de estilo condicionales
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={clsx('mx-2 text-lg hover:underline', {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
