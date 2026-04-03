import api from './api';

export const brandService = {
  getBrands: async () => {
    const response = await api.get('/brands');
    return response.data;
  },
  getBrandById: async (id: string) => {
    const response = await api.get(`/brands/${id}`);
    return response.data;
  }
};
