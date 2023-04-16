import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

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

export const useFormIncome = () => {
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

  return {
    formProps,
    errors,
    isLoading,
    handleSubmit,
    handleIncome,
    register
  };
};
