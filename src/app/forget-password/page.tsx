'use client';

import FormInput from '@/src/components/form/FormInput';
import FormWrapper from '@/src/components/form/FormWrapper';
import { loginValidationSchema } from '@/src/schema/login.schema';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useFrogetPassword, useUserLogin } from '@/src/hooks/auth.hook';
import Loading from '@/src/components/ui/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/src/context/user.provider';
import { z } from 'zod';

const ForgetPassword = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const {
    mutate: handleForgetPassword,
    isPending,
    isSuccess,
  } = useFrogetPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleForgetPassword(data);
    userLoading(true);
  };

  if (!isPending && isSuccess) {
    router.push('/login');
  }

  const emailValidation = z.object({
    email: z.string().trim().email('Please enter a valid email'),
  });

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen w-full flex-col items-center justify-center'>
        <h3 className='my-2 text-2xl font-bold'>FoundX</h3>
        <p className='mb-4'>Please provide your email</p>
        <div className='w-[35%]'>
          <FormWrapper
            onSubmit={onSubmit}
            resolver={zodResolver(emailValidation)}
          >
            <div className='py-3'>
              <FormInput name='email' label='Email' type='email' />
            </div>

            <Button
              className='my-3 w-full rounded-md bg-default-900 font-semibold text-default'
              size='lg'
              type='submit'
            >
              Send
            </Button>
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
