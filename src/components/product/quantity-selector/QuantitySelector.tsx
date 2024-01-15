"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setcount] = useState(quantity);

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return;
    setcount(count + value);
  };
  return (
    <div className="flex">
      <button onClick={() => onQuantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="mx-3 w-20 rounded bg-gray-100/30 px-5 py-1 text-center">
        {count}
      </span>
      <button onClick={() => onQuantityChange(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
