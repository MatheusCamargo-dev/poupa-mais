import { useForm } from 'react-hook-form';

import FormInput from '../FormInput';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Register = {
  changeForm: any;
  handleSignUp: any;
  errorMessage: string;
  isLoading: boolean;
};
const schema = z
  .object({
    fullname: z
      .string({ required_error: 'Nome é obrigatório.' })
      .min(2, 'O nome deve conter no mínimo 2 letras.'),
    username: z
      .string({ required_error: 'Usuário é obrigatório.' })
      .min(2, 'O usuário deve conter no mínimo 2 letras.'),
    email: z
      .string({ required_error: 'Email é obrigatório.' })
      .email('email invalido'),
    password: z
      .string({ required_error: 'Senha é obrigatório.' })
      .min(6, 'A senha precisa ter no minímo 6 caracteres.'),
    confirm_password: z.string()
  })
  .refine((fields) => fields.password === fields.confirm_password, {
    path: ['confirm_password'],
    message: 'As senhas precisam ser iguais'
  });

type FormPropsRegister = z.infer<typeof schema>;

export default function Register(props: Register) {
  const { changeForm, handleSignUp, errorMessage, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormPropsRegister>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  });

  return (
    <>
      <div className="container md:h-auto lg:h-full max-w-md mx-auto py-16 md:py-32 flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-8 py-8 rounded shadow-md p-8 text-black w-full">
          <h1 className="text-3xl text-center text-black font-bold tracking-tight ">
            Register
          </h1>
          <form
            className="mt-5 space-y-4"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <FormInput
              label="Nome completo:"
              name="fullname"
              placeholder="Full Name"
              autoComplete="nickname"
              type="text"
              register={register}
              error={errors.fullname}
            />
            <FormInput
              label="Usuário:"
              name="username"
              placeholder="Username"
              type="text"
              register={register}
              error={errors.username}
            />
            <FormInput
              label="Email:"
              name="email"
              placeholder="Email"
              autoComplete="email"
              type="text"
              register={register}
              error={errors.email}
            />
            <FormInput
              label="Senha:"
              name="password"
              placeholder="password"
              autoComplete="new-password"
              type="password"
              register={register}
              error={errors.password}
            />
            <FormInput
              label="Repita a senha:"
              name="confirm_password"
              placeholder="Confirme a senha"
              autoComplete="current-password"
              type="password"
              register={register}
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
