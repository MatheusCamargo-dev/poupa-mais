'use client';
import React, { InputHTMLAttributes, forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useFormContext, Controller } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

import pt from 'date-fns/locale/es';
import { CurrencyInput, Currencies, Locales } from 'input-currency-react';

import 'react-datepicker/dist/react-datepicker.css';

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
    const { register, setValue, control } = useFormContext();
    registerLocale('pt', pt);

    const switchInput = (name: string) => {
      switch (name) {
        case 'amount': {
          return (
            <Controller
              name="amount"
              control={control}
              defaultValue="0,00"
              render={({ field }) => (
                <CurrencyInput
                  {...register(props.name)}
                  value={field.value}
                  ref={null}
                  options={{
                    precision: 2,
                    style: 'currency',
                    allowNegative: true,
                    alwaysNegative: false,
                    locale: Locales['Portuguese (Brazil)'], // Format Type
                    i18nCurrency: Currencies['Brazilian Real'] // Symbol
                  }}
                  onChangeEvent={(inputElement, maskedValue, value) => {
                    setValue(props.name, value);
                  }}
                  prefix="R$"
                  placeholder="R$"
                  className="block border-zinc-500 border-2 p-1 rounded-md"
                />
              )}
            />
          );
        }
        case 'date': {
          return (
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...register('date')}
                  isClearable={false}
                  placeholderText="Selecione uma data"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  locale="pt"
                  dateFormat={'dd/MM/yyyy'}
                  className="block border-zinc-500 border-2 p-1 rounded-md"
                />
              )}
            />
          );
        }

        default: {
          return (
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
          );
        }
      }
    };
    return (
      <div key={props.name} className="space-y-1 text-2xl">
        {props.label && (
          <label htmlFor={props.name} className="text-teal-500">
            {props.label}
          </label>
        )}
        {switchInput(props.name)}

        {props.error && (
          <ErrorMessage errorMessage={props.error}></ErrorMessage>
        )}
      </div>
    );
  }
);
InputTransactions.displayName = 'InputTransactions';
export default InputTransactions;
