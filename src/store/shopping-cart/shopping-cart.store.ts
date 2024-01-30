import type { Product, CartProduct } from '@/interfaces';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  // Métodos para obtener información del carrito
  getTotalItems: () => number; // Obtiene el total de items en el carrito
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }; // Obtiene un resumen de la información del carrito

  // Métodos para modificar el carrito de compras
  addProductToCart: (product: CartProduct) => void; // Agrega un producto al carrito
  updateProductQuantity: (product: CartProduct, quantity: number) => void; // Actualiza la cantidad de un producto en el carrito
  removeProductFromCart: (product: CartProduct) => void; // Elimina un producto del carrito
  clearCart: () => void; // Limpia el carrito de compras
}

const storeApiCart: StateCreator<State> = (set, get) => ({
  cart: [],
  // ---------------------
  getTotalItems: () => {
    const { cart } = get();
    return cart.reduce((total, prod) => total + prod.quantity, 0);
  },
  // ------------------------------
  getSummaryInformation: () => {
    const { cart } = get();

    const subTotal = cart.reduce((subTotal, product) => {
      return product.quantity * product.price + subTotal;
    }, 0);

    const tax = subTotal * 0.15;
    const total = subTotal + tax;
    const itemsInCart = get().getTotalItems(); // Obtener el total de items en el carrito con un método personalizado

    return {
      subTotal,
      tax,
      total,
      itemsInCart,
    };
  },
  // ----------------------------------------------
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
  // -------------------------------------------------------------------
  updateProductQuantity: (product: CartProduct, quantity: number) => {
    const { cart } = get();
    const updatedCartProducts = cart.map((prod) => {
      if (prod.id === product.id && prod.size === product.size) {
        return { ...prod, quantity: quantity };
      }
      return prod;
    });
    set({ cart: updatedCartProducts });
  },
  // ---------------------------------------------------
  removeProductFromCart: (product: CartProduct) => {
    const { cart } = get();
    const updatedCartProducts = cart.filter(
      (prod) => prod.id !== product.id || prod.size !== product.size,
    );
    set({ cart: updatedCartProducts });
  },
  // ---------------------------------------------------
  clearCart: () => {
    set({ cart: [] });
  },
});

export const useCartStore = create<State>()(
  persist(storeApiCart, {
    name: 'shopping-cart',
    // storage: createJSONStorage(() => localStorage),
  }),
);
