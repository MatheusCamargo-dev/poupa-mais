'use client';
import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

interface TextAreaTransactionsProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  value?: string;
  placeholder: string;
  autoComplete?: string;
  error?: any;
  className?: string;
  defaultValue?: string;
}

// export default TextAreaTransactions;

const TextAreaTransactions = forwardRef<
  HTMLTextAreaElement,
  TextAreaTransactionsProps
>((props, ref) => {
  const { register } = useFormContext();

  return (
    <div key={props.name} className="space-y-1 text-xl">
      {props.label && (
        <label htmlFor={props.name} className="text-teal-500">
          {props.label}
        </label>
      )}
      <textarea
        placeholder={props.placeholder}
        {...register(props.name)}
        className={'block border-zinc-500 border-2 p-1 text-md rounded-md'}
        rows={3}
        cols={28}
        ref={ref}
      />
      {props.error && <ErrorMessage errorMessage={props.error}></ErrorMessage>}
    </div>
  );
});
TextAreaTransactions.displayName = 'TextAreaTransactions';
export default TextAreaTransactions;