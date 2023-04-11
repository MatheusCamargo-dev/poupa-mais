'use client';

import Expense from '@/components/Expense';
import History from '@/components/History';
import Salary from '@/components/Salary';
import Transactions from '@/components/Transactions';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function App() {
  const user = useStoreSelector((store) => store.User);

  return (
    <div className="h-full w-full">
      <div className=" mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col pb-5 px-2">
          <h1 className="text-2xl text-white font-bold">
            Bem vindo novamente, {user.fullname} 👋
          </h1>
          <span className="text-xl text-zinc-400">
            Confira seus rendimentos
          </span>
        </div>
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Todas as transações
          </h1>
          <div className="flex text-white flex-col space-y-4 md:space-x-8 md:flex-row justify-between mt-5 ">
            <Transactions />
            <div className="flex flex-col w-full">
              <History />
              <Salary min={1200} max={7000}></Salary>
              <Expense min={120} max={3000}></Expense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
