'use client';
import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

interface SelectTransactionsProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  error?: any;
  options: Array<string>;
}

// export default SelectTransactions;

const SelectTransactions = forwardRef<
  HTMLSelectElement,
  SelectTransactionsProps
>((props, ref) => {
  const { register } = useFormContext();

  return (
    <div key={props.name} className="space-y-1 text-xl">
      {props.label && (
        <label htmlFor={props.name} className="text-teal-500">
          {props.label}
        </label>
      )}
      <select
        {...register(`${props.name}`)}
        className={'block border-zinc-500 border-2 md:w-full p-1 rounded-md'}
        ref={ref}
      >
        <option value={'selecione'}>Selecione uma opção</option>
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {props.error && <ErrorMessage errorMessage={props.error}></ErrorMessage>}
    </div>
  );
});
SelectTransactions.displayName = 'SelectTransactions';
export default SelectTransactions;