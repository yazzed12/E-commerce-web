import { create } from 'zustand';
import api from '../services/api';
import { Product } from '../types';

interface WishlistState {
  wishlist: Product[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  isLoading: false,

  fetchWishlist: async () => {
    try {
      set({ isLoading: true });
      const res = await api.get('/wishlist');
      set({ wishlist: res.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, wishlist: [] });
    }
  },

  addToWishlist: async (productId: string) => {
    try {
      await api.post('/wishlist', { productId });
      await get().fetchWishlist();
    } catch (error) {
      throw error;
    }
  },

  removeFromWishlist: async (productId: string) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      await get().fetchWishlist();
    } catch (error) {
      throw error;
    }
  }
}));
