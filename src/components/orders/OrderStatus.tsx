import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import clsx from 'clsx';

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  const isPaidText = isPaid ? 'Compra efectuada' : 'Pendiente de pago';

  return (
    <div
      className={clsx(
        'mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white',
        {
          'bg-red-500': !isPaid,
          'bg-green-500': isPaid,
        },
      )}
    >
      <IoCartOutline size={30} />
      <span className="mx-2">{isPaidText}</span>
    </div>
  );
};
