import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      
      addToWishlist: (product) => set((state) => ({
        wishlist: [...state.wishlist, product]
      })),
      
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== productId)
      })),
    }),
    {
      name: 'wishlist-storage',  
      getStorage: () => localStorage, 
    }
  )
);

export default useWishlistStore;
