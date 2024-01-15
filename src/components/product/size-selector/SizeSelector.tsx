import type { Size } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface Props {
  selectedSize: Size;
  availableSize: Size[];
}
export const SizeSelector = ({ selectedSize, availableSize }: Props) => {
  return (
    <div className="my-5">
      <h3 className="mb-4 font-bold">Tallas disponibles</h3>

      <div className="flex">
        {availableSize.map((size) => (
          <button
            key={size}
            className={clsx("mx-2 text-lg hover:underline", {
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
