
'use client';

import BalanceCharts from '@/components/BalanceCharts';
import LineCharts from '@/components/LineCharts';
import PieChart from '@/components/PieCharts';

import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function Dashboards() {
  const { incomes, totIncome } = useStoreSelector((store) => store.Incomes);
  const { expenses, totExpenses} = useStoreSelector((store) => store.Expenses);
  const merged = expenses.concat(incomes);
  const balanceValue = totIncome - totExpenses;

  return (
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md pl-6 p-6 border-2 border-zinc-400 bg-gradient-dark-blue lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Painel Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-blue h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <span className='text-xl font-bold text-white'>Saldo total</span>
                <span className='text-2xl font-semibold text-emerald-600'>
                  {isNaN(totExpenses) ? 'R$ 0.00' : toBRL(balanceValue)}
                </span>
              </div>
              <div className="bg-dark-blue h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <span className='text-xl font-bold text-white'>Rendimentos totais</span>
                <span className='text-2xl font-semibold text-emerald-600'>
                  {isNaN(totIncome) ? 'R$ 0.00' : toBRL(totIncome)}
                </span>
              </div>
              <div className="bg-dark-blue h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <span className='text-xl font-bold text-white'>Despesas totais</span>
                <span className='text-2xl font-semibold text-red-500'>
                  {isNaN(totExpenses) ? 'R$ 0.00' : toBRL(totExpenses)}
                </span>
              </div>
              <div className="bg-dark-blue h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <span className='text-xl font-bold text-white'>Rendimentos totais</span>
                <span className='text-2xl font-semibold text-emerald-600'>
                  {isNaN(totIncome) ? 'R$ 0.00' : toBRL(totIncome)}
                </span>
              </div>
            </div>
            <BalanceCharts text='Movimentação de saldo' merged={merged}/>
            <PieChart transaction={incomes} text='Rendimentos' />
            <PieChart transaction={expenses} text='Despesas' />
            {/* <LineCharts text='Rendimentos' transaction={incomes} color='rgb(134 239 172)'/>
            <LineCharts text='Despesas' transaction={expenses} color='rgb(239 68 68)'/> */}
          </div>

        </div>
      </div>
  )
}

