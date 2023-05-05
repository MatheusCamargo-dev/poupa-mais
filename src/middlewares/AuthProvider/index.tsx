'use client';
import { useRouter } from 'next/navigation';
import { ReactNode,  useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppLoading from '../../components/AppLoading';
import Header from '../../components/Sidebar';

import { setAuthenticated } from '@/features/Auth';
import { setExpenses } from '@/features/Expenses';
import { setIncomes } from '@/features/Incomes';
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

  const authenticated =  isAuthenticated;

  const getTransactions = async () => {
    const [responseIncome, responseExpense] = await Promise.all([
      apiClient('transactions/income/', 'GET'),
      apiClient('transactions/expense/', 'GET')
    ]);

    const [incomes, expense] = await Promise.all([
      responseIncome.json(),
      responseExpense.json()
    ]);
    dispatch(setIncomes(incomes.data));
    dispatch(setExpenses(expense.data));
  };

  const token = async () => {
    const data = await apiClient('token', 'POST');
    const auth = await data.json();
    dispatch(setAuthenticated(auth.status));
    if (auth.status == 0) {
      push('/account?type=login');
      return;
    }
    await getTransactions();
    console.log(auth.userData);
    dispatch(setUser(auth.userData));
  };

  useEffect(() => {
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
