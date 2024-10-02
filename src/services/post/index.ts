'use server';

import { axiosInstance } from '@/src/lib/axiosInstance';
import { revalidateTag } from 'next/cache';

export const createPost = async (postData: FormData) => {
  try {
    const res = await axiosInstance.post('/items', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    revalidateTag('posts');

    console.log(res);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
