import { useQuery } from '@tanstack/react-query';
import { getAllCategory } from '../services/category';

export const useAllCategory = () => {
  return useQuery({
    queryKey: ['ITEM_CATEGORY'],
    queryFn: async () => getAllCategory(),
  });
};
