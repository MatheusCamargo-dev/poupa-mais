'use client';
import { FormProvider } from 'react-hook-form';

import InputTransactions from '../InputTransactions';
import SelectTransactions from '../SelectTransactions';
import TextAreaTransactions from '../TextAreaTransactions';

import { useFormIncome } from '@/hooks/useFormIncome';
import { IncomeCategoryOptions } from '@/store/incomeCategory';

export default function FormIncome() {
  const { errors, formProps, handleIncome, handleSubmit, isLoading, register } =
    useFormIncome();

  return (
    <FormProvider {...formProps}>
      <form
        className=" space-y-4 md:w-max"
        onSubmit={handleSubmit(handleIncome)}
      >
        <InputTransactions
          {...register('title')}
          label="Titulo:"
          placeholder="Titulo do rendimento"
          autoComplete="title"
          type="text"
          error={errors.title}
        />
        <InputTransactions
          {...register('amount')}
          label="Valor:"
          placeholder="Valor do rendimento"
          type="text"
          error={errors.amount}
        />
        <InputTransactions
          {...register('date')}
          label="Data:"
          placeholder="Data do rendimento"
          autoComplete="date"
          type="date"
          error={errors.date}
        />
        <SelectTransactions
          {...register('category')}
          label="Selecione uma categoria:"
          options={IncomeCategoryOptions}
          error={errors.category}
        />
        <TextAreaTransactions
          {...register('description')}
          label="Descrição:"
          placeholder="Uma breve descrição"
          autoComplete=""
          error={errors.description}
        />
        <div className="flex justify-center md:justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex md:w-full text-md justify-center rounded-3xl bg-teal-500 py-2 px-3 font-semibold text-slate-700 hover:bg-teal-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? 'Aguarde..' : '+ Adicionar rendimento'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
