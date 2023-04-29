
import { ReactNode } from 'react';

import Sidebar from '@/components/Sidebar';

import { setAuthenticated } from '@/features/Auth';
import { setExpenses } from '@/features/Expenses';
import { setIncomes } from '@/features/Incomes';
import { setUser } from '@/features/User';
import Providers from '@/middlewares/Providers';
import apiServer from '@/services/api-back-end';
import InitializerStore from '@/store/InitializerStore';
import { store } from '@/store/store';
interface AppLayoutProps {
  children: ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {

  const { isAuthenticated } =  store.getState().Auth;

  const getTransactions = async () => {
    const [responseIncome, responseExpense] = await Promise.all([
      apiServer('transactions/income/'),
      apiServer('transactions/expense/')
    ]);

    const [incomes, expense] = await Promise.all([
      responseIncome.json(),
      responseExpense.json()
    ]);
    // console.log(incomes.data);
    store.dispatch(setIncomes(incomes.data));
    store.dispatch(setExpenses(expense.data));
  }

  const token = async () => {
    const data = await apiServer('token', 'POST');
    const auth = await data.json();
    store.dispatch(setAuthenticated(auth.status));
    if (auth.status == 0) {
      return;
    }else{
      await getTransactions();
      store.dispatch(setUser(auth.userData));
    }
  };

  if(isAuthenticated == 0){
    await token()
  };


  return (
    <div className="rounded flex font-sans bg-dark-blue">

        <>
          <InitializerStore
            user={store.getState().User ?? []}
            incomes={store.getState().Incomes.incomes ?? []}
            expenses={store.getState().Expenses.expenses ?? []}
          />
          <Providers>
            <Sidebar />
            {children}
          </Providers>
        </>

    </div>
  );
}
