'use client';

import { getStockBySlug } from '@/actions';
import { font } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setLoading(false);
  };
  return (
    <>
      {!loading ? (
        <h3 className={`${font.className} text-lg font-bold antialiased`}>
          Stock: {stock}
        </h3>
      ) : (
        <span
          className={`${font.className} block w-24 animate-pulse rounded bg-gray-600/20 text-lg font-bold antialiased`}
        >
          &nbsp;
        </span>
      )}
    </>
  );
};
