import { IInput } from '@/src/types';
import { DatePicker } from '@nextui-org/date-picker';
import { Controller } from 'react-hook-form';

interface IProps extends IInput {}

export default function FormDatePicker({
  label,
  name,
  variant = 'bordered',
}: IProps) {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker variant={variant} label={label} {...fields} />
      )}
    />
  );
}
