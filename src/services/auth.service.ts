import api from './api';

export const authService = {
  login: async (data: any) => {
    const response = await api.post('/auth/signin', data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgotPasswords', { email });
    return response.data;
  },
  verifyResetCode: async (resetCode: string) => {
    const response = await api.post('/auth/verifyResetCode', { resetCode });
    return response.data;
  },
  resetPassword: async (data: any) => {
    const response = await api.put('/auth/resetPassword', data);
    return response.data;
  }
};
