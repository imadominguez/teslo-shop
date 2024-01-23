'use client';
import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onQuantityvalue = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChange(quantity + value);
  };
  return (
    <div className="flex">
      <button onClick={() => onQuantityvalue(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="mx-3 w-20 rounded bg-gray-100/30 px-5 py-1 text-center">
        {quantity}
      </span>
      <button onClick={() => onQuantityvalue(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
