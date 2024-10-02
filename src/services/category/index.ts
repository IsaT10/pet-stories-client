'use server';

import { axiosInstance } from '@/src/lib/axiosInstance';

export const getAllCategory = async () => {
  try {
    const { data } = await axiosInstance.get('/item-categories');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
