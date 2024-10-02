'use client';

import FormInput from '@/src/components/form/FormInput';
import FormWrapper from '@/src/components/form/FormWrapper';
import Loading from '@/src/components/ui/Loading';
import { useUserRegistration } from '@/src/hooks/auth.hook';
import registerValidationSchema from '@/src/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

export default function RegisterPage() {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState('');
  const { mutate: handleRegisterUser, isPending } = useUserRegistration();
  const methods = useForm({
    resolver: zodResolver(registerValidationSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    const postData = {
      ...data,
    };

    formData.append('data', JSON.stringify(postData));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    handleRegisterUser(formData, {
      onSuccess: () => {
        // Reset the form and clear images on success
        reset();
        setImageFile(null);
        setImagePreview('');
      },
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen overflow-y-auto flex-col items-center justify-center'>
        <h3 className='my-2 text-xl font-bold'>Register with FoundX</h3>
        <p className='mb-4'>Help Lost Items Find Their Way Home</p>
        <div className='w-[35%]'>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='py-3'>
                <FormInput label='Name' name='name' size='sm' />
              </div>
              <div className='py-3'>
                <FormInput label='Email' name='email' size='sm' />
              </div>

              <div className='py-3'>
                <FormInput
                  label='Password'
                  name='password'
                  size='sm'
                  type='password'
                />
              </div>

              <div className='min-w-fit flex-1'>
                <label
                  className='flex h-14 text-sm w-full cursor-pointer pt-4 pl-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400'
                  htmlFor='image'
                >
                  Upload Image
                </label>
                <input
                  multiple
                  className='hidden'
                  type='file'
                  id='image'
                  name='image'
                  onChange={handleImageChange}
                />
              </div>

              {imagePreview.length > 0 && (
                <div className='flex gap-8 my-5 flex-wrap'>
                  <div
                    key={imagePreview}
                    className='relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2'
                  >
                    <img
                      alt='item'
                      className='h-full w-full object-cover object-center rounded-md'
                      src={imagePreview}
                    />
                  </div>
                </div>
              )}

              <Button
                className='my-3 w-full rounded-md bg-default-900 text-default'
                size='lg'
                type='submit'
              >
                Registration
              </Button>
            </form>
          </FormProvider>
          <div className='text-center'>
            Already have an account ? <Link href={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
