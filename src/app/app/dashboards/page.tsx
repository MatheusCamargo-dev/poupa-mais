
'use client';

import BalanceCharts from '@/components/BalanceCharts';
import LineCharts from '@/components/LineCharts';
import PieChart from '@/components/PieCharts';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function Dashboards() {


  const { incomes } = useStoreSelector((store) => store.Incomes);
  const { expenses } = useStoreSelector((store) => store.Expenses);
  const merged = expenses.concat(incomes);
  return (
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md pl-6 md:pl-0 p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <div className="flex justify-center items-center">
            <BalanceCharts text='Saldo total' merged={merged}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <PieChart transaction={incomes} text='Rendimentos' />
            <PieChart transaction={expenses} text='Despesas' />
            <LineCharts text='Rendimentos' transaction={incomes} color='rgb(134 239 172)'/>
            <LineCharts text='Despesas' transaction={expenses} color='rgb(239 68 68)'/>
          </div>

        </div>
      </div>
  )
}

