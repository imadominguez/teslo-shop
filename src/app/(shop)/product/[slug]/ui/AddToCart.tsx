import { SizeSelector, QuantitySelector } from '@/components';
import { CartProduct, Product } from '@/interfaces';
import { useCartStore } from '@/store';
import { Size } from '@prisma/client';

import { useState } from 'react';
interface Props {
  product: Product;
}
// Componente para agregar productos al carrito
export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  // Estado para la talla seleccionada, cantidad y si se ha enviado la solicitud
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  // Función para agregar el producto al carrito
  const addToCart = () => {
    // Marcar que se ha enviado la solicitud
    setPosted(true);

    // Verificar si se ha seleccionado una talla
    if (!size) return;

    // Crear un objeto CartProduct con la información del producto
    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
      slug: product.slug,
    };

    // Llamar a la función para agregar el producto al carrito
    addProductToCart(cartProduct);

    // Restablecer el estado después de agregar al carrito
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {/* Mostrar mensaje de error si no se ha seleccionado una talla */}
      {posted && !size && (
        <div className="fade-in flex items-center gap-2 bg-red-800/10 p-1 px-3 py-2 text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>

          <strong className="block font-medium">
            {' '}
            Debe seleccionar una talla{' '}
          </strong>
        </div>
      )}

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSize={product.sizes}
        onSizeChange={setSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Boton agregar al carrito */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
