import type { Product, CartProduct } from '@/interfaces';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  // Métodos para obtener información del carrito
  getTotalItemsById: (id: string) => number; // Obtiene la cantidad total de un producto en el carrito
  getTotalItems: () => number; // Obtiene el total de items en el carrito
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }; // Obtiene un resumen de la información del carrito

  // Métodos para modificar el carrito de compras
  addProductToCart: (product: CartProduct, stock: number) => void; // Agrega un producto al carrito
  updateProductQuantity: (product: CartProduct, quantity: number) => void; // Actualiza la cantidad de un producto en el carrito
  removeProductFromCart: (product: CartProduct) => void; // Elimina un producto del carrito
  clearCart: () => void; // Limpia el carrito de compras
}

const storeApiCart: StateCreator<State> = (set, get) => ({
  cart: [],
  // ---------------------
  getTotalItemsById: (id: string) => {
    const { cart } = get();
    // Obtener la cantidad total del producto en el carrito incluyendo las diferentes tallas
    const prodcuts = cart.filter((prod) => prod.id === id);
    console.log(prodcuts);
    const totalQuantity = prodcuts.reduce((total, prod) => {
      return total + prod.quantity;
    }, 0);

    return totalQuantity;
  },
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
  addProductToCart: (product: CartProduct, stock: number) => {
    const { cart } = get();

    // Calculamos la cantidad total del producto en el carrito considerando todos los tamaños.
    const totalQuantityInCart = cart.reduce((total, prod) => {
      if (prod.id === product.id) {
        return total + prod.quantity;
      }
      return total;
    }, 0);

    // Calculamos la cantidad total del producto si lo agregamos al carrito.
    const totalNewQuantity = totalQuantityInCart + product.quantity;

    // Verificamos si la cantidad total excede el stock.
    if (totalNewQuantity > stock) {
      alert('Alcanzaste el máximo de unidades del producto en tu carrito');
      return;
    }

    // Verificamos si el producto ya existe en el carrito con el mismo tamaño.
    const productInCartIndex = cart.findIndex(
      (prod) => product.id === prod.id && product.size === prod.size,
    );

    if (productInCartIndex === -1) {
      // El producto no está en el carrito.
      set({ cart: [...cart, product] });
      return;
    }

    // El producto ya está en el carrito.
    const updatedCartProduct = cart.map((prod, index) => {
      if (index === productInCartIndex) {
        const newQuantity = prod.quantity + product.quantity;
        return { ...prod, quantity: newQuantity };
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
