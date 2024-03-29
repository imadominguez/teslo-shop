'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

// Propiedades esperadas para el componente QuantitySelector
interface Props {
  quantity: number;
  quantityTotal?: number;
  onQuantityChange: (value: number) => void;
}

// Componente para seleccionar la cantidad de productos
export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  quantityTotal,
}: Props) => {
  // Función para manejar el cambio en la cantidad
  const onQuantityValue = (value: number) => {
    // Verificar que la cantidad no pase el total de stock del producto
    if (quantityTotal) {
      if (quantity + value > quantityTotal) return;
    }

    // Verificar que la nueva cantidad no sea menor que 1
    if (quantity + value < 1) return;
    // Llamar a la función proporcionada para cambiar la cantidad
    onQuantityChange(quantity + value);
  };

  return (
    // Contenedor flex con botones para incrementar y decrementar la cantidad
    <div className="flex items-center rounded ">
      {/* Botón para decrementar la cantidad */}
      <button
        onClick={() => onQuantityValue(-1)}
        className=" leading-10  transition hover:opacity-75"
      >
        <IoRemoveCircleOutline className="h-5 w-5" />
      </button>

      {/* Visualización de la cantidad actual */}
      <span className="mx-3 w-20 rounded bg-dark-accent px-5  py-1 text-center text-white">
        {quantity}
      </span>

      {/* Botón para incrementar la cantidad */}
      <button
        onClick={() => onQuantityValue(+1)}
        className=" leading-10  transition hover:opacity-75"
      >
        <IoAddCircleOutline className="h-5 w-5" />
      </button>
    </div>
  );
};
