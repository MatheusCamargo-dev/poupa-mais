import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';

import { LockClosedIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Login = {
  handleSignIn: any;
  errorMessage: string;
  loginText: string;
  changeForm: any;
  isLoading: boolean;
  email: string;
};
const schema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório.' })
    .email('email invalido'),
  password: z
    .string({ required_error: 'Senha é obrigatório.' })
    .min(6, 'A senha precisa ter no minímo 6 caracteres.')
});

type FormPropsLogin = z.infer<typeof schema>;
export default function Login(props: Login) {
  const {
    handleSignIn,
    errorMessage,
    loginText,
    changeForm,
    isLoading,
    email
  } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormPropsLogin>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (email && inputEmail.current && inputPassword.current) {
      inputEmail.current.value = email;
      inputPassword.current.focus();
      setValue('email', email);
    }
  }, [email]);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 sm:p-16 rounded space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/PriceHouse.ico"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-black">
            Or{' '}
            <a
              onClick={changeForm}
              className="font-medium cursor-pointer text-teal-500 hover:text-teal-400"
            >
              register a new account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                ref={inputEmail}
                onChange={(e) => setValue('email', e.target.value)}
                defaultValue={email}
                className={`relative block w-full ${
                  errors.email
                    ? 'border-2 border-red-400 focus:ring-red-400'
                    : 'border-0'
                } rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset
                 ring-gray-300 p-1.5 placeholder:text-gray-400 focus:z-10 focus:ring-2
                 focus:ring-inset sm:text-sm sm:leading-6`}
                placeholder="Email address"
              />
              {errors.email && (
                <ErrorMessage errorMessage={errors.email}></ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                ref={inputPassword}
                onChange={(e) => setValue('password', e.target.value)}
                className={`relative block w-full rounded-md ${
                  errors.password
                    ? 'border-2 border-red-400 focus:ring-red-400'
                    : 'border-0'
                }
                  py-1.5 p-1.5 text-gray-900 ring-1 ring-inset
                   ring-gray-300 placeholder:text-gray-400
                    focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                placeholder="Password"
              />
              {errors.password && (
                <ErrorMessage errorMessage={errors.password}></ErrorMessage>
              )}
            </div>
          </div>
          {errorMessage && (
            <div className=" d-flex p-1.5 rounded bg-red-500 text-white m-2.5 mt-10">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-teal-300 text-teal-600 focus:ring-teal-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-black"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-teal-500 py-2 px-3 text-sm font-semibold text-slate-700 hover:bg-teal-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-black group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              {loginText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
