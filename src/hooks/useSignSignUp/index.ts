import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { signInRequest, signUpRequest } from '@/services/auth';

export const useSignInUp = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loginText, setLoginText] = useState('Sign In');
  const [typeForm, setTypeForm] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  function changeForm() {
    setIsLoading(false);
    setErrorMessage('');
    if (typeForm == 'login') {
      setTypeForm('register');
    } else {
      setTypeForm('login');
    }
  }

  function passwordIsValid(password: string, confirm_password: string) {
    if (!(password === confirm_password)) {
      setErrorMessage('different passwords!');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('password must contain at least 6 digits');
      return false;
    }

    return true;
  }

  async function handleSignIn(data: any) {
    setIsLoading(true);
    setErrorMessage('');
    setLoginText('wait...');
    const user = await signInRequest(data);
    if (user.status == 0) {
      setErrorMessage(user.message);
      setLoginText('Sign In');
      setIsLoading(false);
    }
    if (user.status === 1) {
      router.push('/app');
    }
  }

  async function handleSignUp(data: any) {
    setIsLoading(true);
    const { password, confirm_password } = data;

    if (!passwordIsValid(password, confirm_password)) {
      setIsLoading(false);
      return;
    }

    const user = await signUpRequest(data);
    setIsLoading(false);
    if (user.status == 0) {
      setErrorMessage(user.message);
    }

    if (user.status === 1) {
      setErrorMessage('');
      setEmail(user.email);
      setTypeForm('login');
      router.push('/');
    }
  }

  return {
    typeForm,
    email,
    isLoading,
    changeForm,
    errorMessage,
    handleSignIn,
    handleSignUp,
    loginText
  };
};
