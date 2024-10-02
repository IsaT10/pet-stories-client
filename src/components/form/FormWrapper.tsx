'use client';

import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
} & TFormConfig;

export default function FormWrapper({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TFormProps) {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }
  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
