'use client';

import { getStockBySlug } from '@/actions';
import { font } from '@/config/fonts';
import { useEffect, useState } from 'react';

// Propiedades esperadas para el componente StockLabel
interface Props {
  slug: string;
}

// Componente para mostrar la etiqueta de stock de un producto
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  // Efecto para obtener el stock cuando el componente se monta
  useEffect(() => {
    // Función asincrónica para obtener el stock por el slug
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock);
      setLoading(false);
    };

    getStock();
  }, [slug]);

  return (
    // Renderización condicional según si se ha cargado el stock o no
    <>
      {!loading ? (
        // Etiqueta de stock cuando el stock ha sido cargado
        <h3 className={`${font.className} text-lg font-bold antialiased`}>
          Stock: {stock}
        </h3>
      ) : (
        // Placeholder animado mientras se carga el stock
        <span
          className={`${font.className} block w-24 animate-pulse rounded bg-gray-600/20 text-lg font-bold antialiased`}
        >
          &nbsp;
        </span>
      )}
    </>
  );
};
