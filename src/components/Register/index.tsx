import { useForm } from 'react-hook-form';

type Register = {
  changeForm: any;
  handleSignUp: any;
  errorMessage: string;
  isLoading: boolean;
};
export default function Register(props: Register) {
  const { changeForm, handleSignUp, errorMessage, isLoading } = props;
  const { register, handleSubmit } = useForm();

  return (
    <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-white px-8 py-8 rounded shadow-md bg-zinc-900 p-8 text-black w-full">
        <h1 className="text-3xl text-center text-white font-bold tracking-tight ">
          Register
        </h1>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div>
            <label htmlFor="fullname" className="text-green-500">
              Full Name:
            </label>
            <input
              {...register('fullname')}
              type="text"
              className="block border mt-1 border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              autoComplete="nickname"
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="text-green-500">
              Username:
            </label>
            <input
              {...register('username')}
              type="text"
              className="block border mt-1 border-grey-light w-full p-3 rounded mb-4"
              name="username"
              autoComplete="username"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-green-500">
              Email:
            </label>
            <input
              {...register('email')}
              type="text"
              className="block border mt-1 border-grey-light w-full p-3 rounded mb-4"
              name="email"
              autoComplete="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-green-500">
              Password:
            </label>
            <input
              {...register('password')}
              type="password"
              className="block border mt-1 border-grey-light w-full p-3 rounded mb-4"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm_password" className="text-green-500">
              Confirm Password:
            </label>
            <input
              {...register('confirm_password')}
              type="password"
              className="block border mt-1 border-grey-light w-full p-3 rounded mb-4"
              autoComplete="new-password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
          </div>
          {errorMessage && (
            <div className=" d-flex p-2.5 rounded bg-red-500 text-white m-2.5 mt-10">
              <p>{errorMessage}</p>
            </div>
          )}
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-slate-700 hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? 'wait..' : 'Create Account'}
          </button>
        </form>
        <div className="text-white mt-6">
          Already have an account?
          <a
            onClick={changeForm}
            className="font-medium cursor-pointer text-green-600 hover:text-green-500"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
