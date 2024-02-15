import type { Size } from '@/interfaces';
import clsx from 'clsx';

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
      <h3 className="mb-2 font-bold">Tallas disponibles</h3>

      {/* Contenedor flex para los botones de tallas */}
      <div className="flex">
        {/* Mapeo de las tallas disponibles */}
        {availableSize.map((size) => (
          // Botón para cada tamaño, con evento de clic y clases de estilo condicionales
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={clsx(
              'hover:bg-dark-accent mx-1 h-10 w-10 rounded-full p-2 text-lg text-dark-text hover:text-white',
              {
                ' bg-dark-accent text-white  ': size === selectedSize,
              },
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
