'use client';

import FormInput from '@/src/components/form/FormInput';
import FormWrapper from '@/src/components/form/FormWrapper';
import { loginValidationSchema } from '@/src/schema/login.schema';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useUserLogin } from '@/src/hooks/auth.hook';
import Loading from '@/src/components/ui/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/src/context/user.provider';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get('redirect');
  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleLoginUser, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLoginUser(data);
    userLoading(true);
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push('/');
    }
  }

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen w-full flex-col items-center justify-center'>
        <h3 className='my-2 text-2xl font-bold'>Login with FoundX</h3>
        <p className='mb-4'>Welcome Back! Let&lsquo;s Get Started</p>
        <div className='w-[35%]'>
          <FormWrapper
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className='py-3'>
              <FormInput name='email' label='Email' type='email' />
            </div>
            <div className='py-3'>
              <FormInput name='password' label='Password' type='password' />
            </div>

            <Link
              href={'/forget-password'}
              className='mt-1 text-sm font-semibold'
            >
              Forget Password
            </Link>

            <Button
              className='my-3 w-full rounded-md bg-default-900 font-semibold text-default'
              size='lg'
              type='submit'
            >
              Login
            </Button>
          </FormWrapper>
          <div className='text-center'>
            Don&lsquo;t have account ? <Link href={'/register'}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
