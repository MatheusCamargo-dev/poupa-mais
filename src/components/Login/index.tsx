import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { LockClosedIcon } from '@heroicons/react/24/outline';

type Login = {
  handleSignIn: any;
  errorMessage: string;
  loginText: string;
  changeForm: any;
  isLoading: boolean;
  email: string;
};

export default function Login(props: Login) {
  const {
    handleSignIn,
    errorMessage,
    loginText,
    changeForm,
    isLoading,
    email
  } = props;
  const { register, handleSubmit, setValue } = useForm();
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  function changeEmail(e: any) {
    setValue('email', e.target.value);
  }
  function changePassword(e: any) {
    setValue('password', e.target.value);
  }
  useEffect(() => {
    if (email && inputEmail.current && inputPassword.current) {
      inputEmail.current.value = email;
      inputPassword.current.focus();
      setValue('email', email);
    }
  }, [email]);
  return (
    <div className="w-full max-w-md bg-zinc-900 p-10 rounded space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          Or{' '}
          <a
            onClick={changeForm}
            className="font-medium cursor-pointer text-green-600 hover:text-green-500"
          >
            register a new account
          </a>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
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
              onChange={changeEmail}
              defaultValue={email}
              required
              className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 p-1.5 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Email address"
            />
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
              onChange={changePassword}
              required
              className="relative block w-full rounded-b-md border-0 py-1.5 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Password"
            />
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
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-white"
            >
              Remember me
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-slate-700 hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-slate-700 group-hover:text-white"
                aria-hidden="true"
              />
            </span>
            {loginText}
          </button>
        </div>
      </form>
    </div>
  );
}
