'use client';
import React, { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import FormInput from '@/components/FormInput';

import ExpenseCategories from '../ExpenseCategories';
import IncomeCategories from '../IncomeCategories';

import { expenseCategories, incomeCategories, setUser } from '@/features/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z
  .object({
    _id: z.string(),
    fullname: z
      .string({ required_error: 'Nome é obrigatório.' })
      .min(3, 'O nome deve conter no mínimo 3 letras.')
      .transform((fullname) =>
        fullname
          .trim()
          .split(' ')
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join(' ')
      ),
    username: z
      .string({ required_error: 'Usuário é obrigatório.' })
      .min(3, 'O usuário deve conter no mínimo 3 caracteres.')
      .max(16, 'O usuário deve conter no máximo 16 caracteres.')
      .trim(),
    email: z
      .string({ required_error: 'Email é obrigatório.' })
      .email('email invalido')
      .toLowerCase(),
    incomeCategories: z.array(z.object({ incomeCategory: z.string().min(3, 'A categoria deve conter no mínimo 3 caracteres.').max(24, 'A categoria não pode conter mais de 24 caracteres')})),
    expenseCategories: z.array(z.object({ expenseCategory: z.string().min(3, 'A categoria deve conter no mínimo 3 caracteres.').max(24, 'A categoria não pode conter mais de 24 caracteres')})),
    avatar: z.instanceof(FileList)
      .refine(
        (files) => {
          if(files.length > 0){
            return ACCEPTED_IMAGE_TYPES.includes(files.item(0)?.type || '')
          }else{
            return true
          }

        },
        "Formato de imagem inválido"
      ).transform(files => {
        return files.item(0)!
      }),
  });

type FormPropsUpdate = z.infer<typeof schema>;

interface User {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  expenseCategories: expenseCategories[];
  incomeCategories: incomeCategories[];
}
export default function FormUser(props: User) {
  const { _id, username, email, fullname, expenseCategories, incomeCategories} = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formProps = useForm<FormPropsUpdate>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      _id: _id,
      email: email,
      fullname: fullname,
      username: username,
      incomeCategories,
      expenseCategories
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = formProps;

  const {fields: fieldsExpense, append: appendExpense, remove: removeExpense } = useFieldArray({
    control,
    name: 'expenseCategories',
  })
  const {fields: fieldsIncome , append: appendIncome, remove: removeIncome } = useFieldArray({
    control,
    name: 'incomeCategories',
  })
  const handleUpdateAccount = async (data: FormPropsUpdate) => {
    try{
      console.log(data);
      setIsLoading(true);
      const formData = new FormData();
      formData.set("avatar", data.avatar);
      formData.set("username", data.username);
      formData.set("fullname", data.fullname);
      formData.set("email", data.email);
      formData.set("_id", data._id);
      formData.set("expenseCategories", JSON.stringify(data.expenseCategories))
      formData.set("incomeCategories", JSON.stringify(data.incomeCategories))
      const { token } = await parseCookies();
      if(token){
        const upload = await fetch('https://matheuscamargo.dev/api/user', {
          method: 'PUT',
          mode: 'cors',
          headers: {Authorization: `Bearer ${token}`},
          body: formData
        })
        const data = await upload.json();
        console.log(data);
        if(data.status == 1){
          dispatch(setUser(data.user));
        }
      }
      setIsLoading(false)
    }catch(e){
      setIsLoading(false)
      console.error(e);
    }

  }
  return (
    <FormProvider {...formProps} >
              <form
                className="mt-5 space-y-4 text-black"
                onSubmit={handleSubmit(handleUpdateAccount)}
              >
                <FormInput
                  className="block border border-grey w-full p-3 rounded"
                  label="Nome completo:"
                  placeholder="Full Name"
                  autoComplete="nickname"
                  type="text"
                  {...register('fullname')}
                  error={errors.fullname}
                />
                <FormInput
                  className="block border border-grey w-full p-3 rounded"
                  label="Usuário:"
                  placeholder="Username"
                  type="text"
                  {...register('username')}
                  error={errors.username}
                />
                <FormInput
                  className="block border border-grey w-full p-3 rounded"
                  label="Email:"
                  placeholder="Email"
                  autoComplete="email"
                  type="text"
                  {...register('email')}
                  error={errors.email}
                />
                <FormInput
                  placeholder=''
                  className="m-0 w-full min-w-0 flex-auto rounded
                  border border-solid bg-white border-neutral-300
                  bg-clip-padding px-3 py-[0.32rem] text-base
                  font-normal text-neutral-700 transition
                  duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem]
                  file:overflow-hidden file:rounded-none file:border-0
                  file:border-solid file:border-inherit file:bg-neutral-100
                  file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition
                  file:duration-150 file:ease-in-out file:[border-inline-end-width:1px]
                  file:[margin-inline-end:0.75rem] hover:file:bg-blue-600 focus:border-primary
                  focus:text-neutral-700 focus:shadow-te-primary focus:outline-none
                  dark:border-neutral-600 dark:text-black dark:file:bg-blue-700
                  dark:file:text-neutral-100 dark:focus:border-primary"
                  label='Imagem:'
                  accept='image/*'
                  type='file'
                  {...register('avatar')}
                  error={errors.avatar}
                />
                <IncomeCategories error={errors.incomeCategories} newCategories={fieldsIncome} append={appendIncome} remove={removeIncome} register={register}/>
                <ExpenseCategories error={errors.expenseCategories} newCategories={fieldsExpense} append={appendExpense} remove={removeExpense} register={register} />
                <button type='submit' disabled={isLoading} className=" flex w-full justify-center rounded-md bg-teal-500 py-2 px-3 text-sm font-semibold hover:text-slate-700 hover:bg-teal-4

                00 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >{isLoading ? 'Atualizando..' : 'Atualizar dados'}</button>
              </form>
            </FormProvider>
  )
}
