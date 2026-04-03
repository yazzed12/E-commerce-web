import { create } from 'zustand';
import api from '../services/api';
import { Cart } from '../types';

interface CartState {
  cart: Cart | null;
  numOfCartItems: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, count: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  numOfCartItems: 0,
  isLoading: false,

  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const res = await api.get('/cart');
      set({ cart: res.data.data, numOfCartItems: res.data.numOfCartItems, isLoading: false });
    } catch (error) {
      set({ isLoading: false, cart: null, numOfCartItems: 0 });
    }
  },

  addToCart: async (productId: string) => {
    try {
      const res = await api.post('/cart', { productId });
      set({ cart: res.data.data, numOfCartItems: res.data.numOfCartItems });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      set({ cart: res.data.data, numOfCartItems: res.data.numOfCartItems });
    } catch (error) {
      throw error;
    }
  },

  updateQuantity: async (productId: string, count: number) => {
    try {
      const res = await api.put(`/cart/${productId}`, { count });
      set({ cart: res.data.data, numOfCartItems: res.data.numOfCartItems });
    } catch (error) {
      throw error;
    }
  },

  clearCart: async () => {
    try {
      await api.delete('/cart');
      set({ cart: null, numOfCartItems: 0 });
    } catch (error) {
      throw error;
    }
  }
}));
