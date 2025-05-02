
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: (user) => {
        set({ user, isLoggedIn: true });
      },

      logout: () => {
        set({ user: null, isLoggedIn: false, cart: [] });
      },

      cart: [],

      addToCart: (product) => {
        const cart = get().cart;
        const exists = cart.find((item) => item.id === product.id);
        const updatedCart = exists
          ? cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...cart, { ...product, quantity: 1 }];

        set({ cart: updatedCart });
      },

      removeFromCart: (productId) => {
        const cart = get().cart;
        set({ cart: cart.filter((item) => item.id !== productId) });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'auth-storage', 
      getStorage: () => localStorage,
      partialize: (state) => ({
         user:state.user,
        isLoggedIn: state.isLoggedIn,
        cart: state.cart,
      })

    }
  )
);

export default useAuthStore;