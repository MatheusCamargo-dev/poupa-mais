import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';
import FormInput from '../FormInput';

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
  const formProps = useForm<FormPropsLogin>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = formProps;

  useEffect(() => {
    const input = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    if (input && email.length > 0) {
      input.focus();
    }
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 sm:p-16 rounded space-y-7">
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
        <FormProvider {...formProps}>
          <form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-2 rounded-md shadow-sm">
              <FormInput
                {...register('email')}
                type="email"
                autoComplete="email"
                onChange={(e: any) => setValue('email', e.target.value)}
                defaultValue={email}
                className={`border ring-gray-300 ring-1 border-grey-300 py-1.5 text-gray-900
                  p-1.5 placeholder:text-gray-400 focus:z-10
                  sm:text-sm sm:leading-6 relative block w-full rounded-md`}
                placeholder="Email address"
                error={errors.email}
              />
              <FormInput
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className={` border ring-gray-300 ring-1 border-grey-300 py-1.5 text-gray-900
                  p-1.5 placeholder:text-gray-400 focus:z-10
                  sm:text-sm sm:leading-6 relative block w-full rounded-md`}
                placeholder="Password"
                error={errors.password}
              />
              {errorMessage && (
                <ErrorMessage
                  errorMessage={{ message: errorMessage }}
                ></ErrorMessage>
              )}
            </div>

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
        </FormProvider>
      </div>
    </div>
  );
}
