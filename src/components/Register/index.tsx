'use client';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from '../FormInput';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Register = {
  changeForm: () => void;
  handleSignUp:  (data: {
    email: string;
    password: string;
    fullname: string;
    username: string;
    confirm_password: string;
}) => Promise<void>;
  errorMessage: string;
  isLoading: boolean;
};
const schema = z
  .object({
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
    password: z
      .string({ required_error: 'Senha é obrigatório.' })
      .min(6, 'A senha precisa ter no minímo 6 caracteres.'),
    confirm_password: z.string()
  })
  .refine((fields) => fields.password === fields.confirm_password, {
    path: ['confirm_password'],
    message: 'As senhas precisam ser iguais'
  });

export type FormPropsRegister = z.infer<typeof schema>;

export default function Register(props: Register) {
  const { changeForm, handleSignUp, errorMessage, isLoading } = props;
  const formProps = useForm<FormPropsRegister>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formProps;
  return (
    <>
      <div className="container md:h-auto lg:h-full max-w-md mx-auto py-16 md:py-32 flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-8 py-8 rounded shadow-md p-8 text-black w-full">
          <h1 className="text-3xl text-center text-black font-bold tracking-tight ">
            Register
          </h1>
          <FormProvider {...formProps}>
            <form
              className="mt-5 space-y-4"
              onSubmit={handleSubmit(handleSignUp)}
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
                className="block border border-grey w-full p-3 rounded"
                label="Senha:"
                placeholder="password"
                autoComplete="new-password"
                type="password"
                {...register('password')}
                error={errors.password}
              />
              <FormInput
                className="block border border-grey w-full p-3 rounded"
                label="Repita a senha:"
                placeholder="Confirme a senha"
                autoComplete="current-password"
                type="password"
                {...register('confirm_password')}
                error={errors.confirm_password}
              />

              {errorMessage && (
                <div className=" p-2.5 w-full rounded bg-red-500 text-white mt-10">
                  <p>{errorMessage}</p>
                </div>
              )}
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-teal-500 py-2 px-3 text-sm font-semibold text-slate-700 hover:bg-teal-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? 'wait..' : 'Create Account'}
              </button>
            </form>
          </FormProvider>

          <div className="text-black mt-6">
            Already have an account?
            <a
              onClick={changeForm}
              className="font-medium cursor-pointer text-teal-600 hover:text-teal-500"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
}
