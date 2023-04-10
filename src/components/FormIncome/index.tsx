'use client';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import InputTransactions from '../InputTransactions';
import SelectTransactions from '../SelectTransactions';
import TextAreaTransactions from '../TextAreaTransactions';

import { incrementIncomes } from '@/features/Incomes';
import { apiClient } from '@/services/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    title: z
      .string({ required_error: 'Título é obrigatório.' })
      .min(3, 'O Título deve conter no mínimo 3 caracteres.')
      .max(30, 'O Título deve conter no máximo 30 caracteres.')
      .trim(),
    category: z.string().nonempty(),
    amount: z
      .string({
        errorMap: () => {
          return { message: 'Informe um número.' };
        }
      })
      .min(1, 'Informe um valor'),
    date: z.date({
      errorMap: () => {
        return { message: 'Informe uma data valida.' };
      }
    }),
    description: z.string().optional()
  })
  .refine((fields) => fields.category !== 'selecione', {
    path: ['category'],
    message: 'Por favor, selecione uma opção'
  });

type FormPropsRegister = z.infer<typeof schema>;
export default function FormIncome() {
  const formProps = useForm<FormPropsRegister>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = formProps;

  async function handleIncome(data: any) {
    setIsLoading(true);
    const body = { type: data.category, ...data };
    const r = await apiClient(
      'http://localhost:3000/api/transactions/income/',
      'POST',
      body
    );
    const {
      data: { income }
    } = await r.json();
    reset();
    setIsLoading(false);
    dispatch(incrementIncomes(income));
  }

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
          options={[
            'Freelancer',
            'Investimento',
            'Vendas',
            'Apostas',
            'Salário'
          ]}
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
