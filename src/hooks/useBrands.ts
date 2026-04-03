import { useState, useEffect } from 'react';
import { brandService } from '../services/brandService';
import { Brand } from '../types';

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await brandService.getBrands();
        setBrands(response.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch brands');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, isLoading, error };
};
