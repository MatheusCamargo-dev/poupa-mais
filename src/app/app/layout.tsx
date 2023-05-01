'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import AuthProvider from '@/middlewares/AuthProvider';
import { store } from '@/store/store';
interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {

  // const { isAuthenticated } =  store.getState().Auth;
  // const authenticated = isAuthenticated;
  // const cookieStore = cookies();
  // const tokenCookie = cookieStore.get('token');

  // const getTransactions = async () => {
  //   const [responseIncome, responseExpense] = await Promise.all([
  //     apiServer('transactions/income/'),
  //     apiServer('transactions/expense/')
  //   ]);

  //   const [incomes, expense] = await Promise.all([
  //     responseIncome.json(),
  //     responseExpense.json()
  //   ]);
  //   store.dispatch(setIncomes(incomes.data));
  //   store.dispatch(setExpenses(expense.data));
  // }

  // const token = async () => {
  //   const data = await apiServer('token', 'POST');
  //   const auth = await data.json();
  //   store.dispatch(setAuthenticated(auth.status));
  //   if (auth.status == 0) {
  //     redirect('account?type=login')
  //   }else{
  //     await getTransactions();
  //     store.dispatch(setUser(auth.userData));
  //   }
  // };

  // if(authenticated == 0 || !tokenCookie){
  //   await token()
  // };


  return (
    <div className="rounded flex font-sans bg-dark-blue">

          {/* <InitializerStore
            user={store.getState().User ?? []}
            incomes={store.getState().Incomes.incomes ?? []}
            expenses={store.getState().Expenses.expenses ?? []}
          /> */}
          {/* <Providers> */}
            {/* <Sidebar /> */}
          <Provider store={store}>
            <AuthProvider child={children} />

          </Provider>

          {/* </Providers> */}

    </div>
  );
}
