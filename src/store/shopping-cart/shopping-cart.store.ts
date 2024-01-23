import type { Product, CartProduct } from '@/interfaces';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  // ?? Metodos para obtener informacion del carrito
  getTotalItems: () => number;
  getSummatyInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: any;
  };
  // ?? Metodos para modificar el carrito de compras
  // -- Agregar un producto al carrito
  addProductToCart: (product: CartProduct) => void;
  // -- Actualizar la cantidad de un producto en el carrito
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  // -- Eliminar un producto del carrito
  removeProductFromCart: (product: CartProduct) => void;
}

const storeApiCart: StateCreator<State> = (set, get) => ({
  cart: [],
  // ---------------------
  getTotalItems: () => {
    const { cart } = get();
    return cart.reduce((total, prod) => total + prod.quantity, 0);
  },
  // ------------------------------
  getSummatyInformation: () => {
    const { cart } = get();

    const subTotal = cart.reduce((subTotal, product) => {
      return product.quantity * product.price + subTotal;
    }, 0);

    const tax = subTotal * 0.15;
    const total = subTotal + tax;
    const itemsInCart = cart.length;

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
});

export const useCartStore = create<State>()(
  persist(storeApiCart, {
    name: 'shopping-cart',
    // storage: createJSONStorage(() => localStorage),
  }),
);
