import api from './api';
import { Product, Category, Brand } from '../types';

export const productsService = {
  getAll: async (params?: any) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
};

export const categoriesService = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }
};

export const brandsService = {
  getAll: async () => {
    const response = await api.get('/brands');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/brands/${id}`);
    return response.data;
  }
};
