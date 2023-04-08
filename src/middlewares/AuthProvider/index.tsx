'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import AppLoading from '../../components/AppLoading';
import Header from '../../components/Sidebar';

import { setAuthenticated } from '@/features/Auth';
import { setUser } from '@/features/User';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { apiClient } from '@/services/api-client';

type AuthenticatedComponentProps = {
  child: ReactNode;
  children?: ReactNode;
};

interface AuthState {
  Auth: {
    isAuthenticated: number;
  };
}

export default function AuthProvider(props: AuthenticatedComponentProps) {
  const { push } = useRouter();
  const { child } = props;
  const authStore = useStoreSelector((state: AuthState) => state.Auth);
  const { isAuthenticated } = authStore;
  const dispatch = useDispatch();

  const authenticated = useMemo(() => {
    return isAuthenticated;
  }, [isAuthenticated]);

  const token = useCallback(async () => {
    const data = await apiClient('http://localhost:3000/api/token', 'POST');
    const auth = await data.json();
    dispatch(setAuthenticated(auth.status));
    if (auth.status == 0) {
      push('/account?type=login');
      return;
    }
    dispatch(setUser(auth.userData));
  }, [dispatch]);

  useEffect(() => {
    console.log('is auth');
    console.log(authenticated);
    if (authenticated == 0) {
      token();
    }
  }, [authenticated]);

  return (
    <>
      {authenticated == 1 && <Header />}
      {authenticated == 1 && child}
      {authenticated == 0 && <AppLoading />}
    </>
  );
}
