import { IInput } from '@/src/types';
import { Select, SelectItem } from '@nextui-org/select';
import { useFormContext } from 'react-hook-form';

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

export default function FormSelect({
  options,
  label,
  name,
  variant = 'bordered',
  disabled,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      variant={variant}
      {...register(name)}
      label={label}
      className='max-w-xs'
      isDisabled={disabled}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
