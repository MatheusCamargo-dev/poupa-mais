'use client';
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

interface InputTransactionsProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  value?: string;
  placeholder: string;
  autoComplete?: string;
  type: string;
  error?: any;
  className?: string;
  defaultValue?: string;
}

// export default InputTransactions;

const InputTransactions = forwardRef<HTMLInputElement, InputTransactionsProps>(
  (props, ref) => {
    const { register } = useFormContext();

    return (
      <div key={props.name} className="space-y-1 text-2xl">
        {props.label && (
          <label htmlFor={props.name} className="text-teal-500">
            {props.label}
          </label>
        )}
        <input
          type={props.type}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          {...register(props.name)}
          className={'block border-zinc-500 border-2 p-1 rounded-md'}
          ref={ref}
        />
        {props.error && (
          <ErrorMessage errorMessage={props.error}></ErrorMessage>
        )}
      </div>
    );
  }
);
InputTransactions.displayName = 'InputTransactions';
export default InputTransactions;
