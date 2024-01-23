import type { Product, CartProduct } from '@/interfaces';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  // Metodos para modificar el carrito de compras
  addProductToCart: (product: CartProduct) => void;
  // update
}

const storeApiCart: StateCreator<State> = (set, get) => ({
  cart: [],
  addProductToCart: (product: CartProduct) => {
    const { cart } = get();
    // 1. Comprobar si el producto ya existe en el carrito con el mismo size
    const productInCart = cart.some(
      (prod) => product.id === prod.id && product.size === prod.size,
    );
    if (!productInCart) {
      set({ cart: [...cart, product] });
      return;
    }
    // 2. Se que el producto existe por size... tengo que incrementar
    const updatedCartProduct = cart.map((prod) => {
      if (prod.id === product.id && prod.size === product.size) {
        return { ...prod, quantity: prod.quantity + product.quantity };
      }
      return prod;
    });
    set({ cart: updatedCartProduct });
  },
});

export const useCartStore = create<State>()(
  persist(storeApiCart, {
    name: 'shopping-cart',
    // storage: createJSONStorage(() => localStorage),
  }),
);
