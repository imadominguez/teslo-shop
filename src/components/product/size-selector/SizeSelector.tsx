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
              'mx-1  w-full rounded border border-black/50 bg-gray-200 text-lg text-dark-text hover:bg-gray-400 dark:border-white/50 dark:bg-dark-accent/10 dark:hover:bg-dark-second dark:hover:text-white',
              {
                ' !border-white !bg-dark-second text-white  ':
                  size === selectedSize,
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
