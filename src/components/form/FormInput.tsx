'use client';

import { Input } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

type TProps = {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  type?: string;
  label: string;
  name: string;
};

export default function FormInput({
  variant = 'bordered',
  size = 'md',
  required = false,
  type = 'text',
  label,
  name,
}: TProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ''}
      isInvalid={!!errors[name]}
      variant={variant}
      size={size}
      required={required}
      type={type}
      label={label}
    />
  );
}
