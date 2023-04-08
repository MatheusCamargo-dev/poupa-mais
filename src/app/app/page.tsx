// import apiServer from '@/services/api-back-end';
'use client';

import Expense from '@/components/Expense';
import History from '@/components/History';
import Salary from '@/components/Salary';
import Transactions from '@/components/Transactions';

export default function App() {
  return (
    <div className="h-full w-full">
      <div className=" mx-auto container h-max my-10">
        <div className="flex flex-col pb-5 px-2">
          <h1 className="text-2xl text-white font-bold">
            Bem vindo novamente, Matheus 👋
          </h1>
          <span className="text-xl text-zinc-400">
            Confira seus rendimentos
          </span>
        </div>
        <div className="flex flex-col rounded-md p-5 border-2 border-zinc-500 bg-gradient-dark-blue pb-32 w-full">
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
