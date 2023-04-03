'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import HeaderHome from '@/components/HeaderHome';
import Login from '@/components/Login';
import Register from '@/components/Register';

import { useSignInUp } from '@/hooks/useSignSignUp';
import { apiClient } from '@/services/api-client';

export default function Account() {
  const { push } = useRouter();

  const {
    typeForm,
    email,
    isLoading,
    changeForm,
    errorMessage,
    handleSignIn,
    handleSignUp,
    loginText
  } = useSignInUp();
  useEffect(() => {
    const token = async () => {
      const data = await apiClient('http://localhost:3000/api/token', 'POST');
      const auth = await data.json();
      if (auth.status == 1) {
        push('/app');
        return;
      }
    };
    token();
  }, [push]);

  return (
    <>
      <HeaderHome></HeaderHome>
      <div className="flex min-h-full items-center bg-gradient-blue justify-center py-12 px-4 sm:px-6 lg:px-8">
        {typeForm == 'login' && (
          <Login
            email={email}
            isLoading={isLoading}
            changeForm={changeForm}
            errorMessage={errorMessage}
            handleSignIn={handleSignIn}
            loginText={loginText}
          />
        )}
        {typeForm == 'register' && (
          <Register
            errorMessage={errorMessage}
            isLoading={isLoading}
            changeForm={changeForm}
            handleSignUp={handleSignUp}
          />
        )}
      </div>
    </>
  );
}
