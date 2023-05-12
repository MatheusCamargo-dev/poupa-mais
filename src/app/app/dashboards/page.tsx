
'use client';

import PieChart from '@/components/PieCharts';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function Dashboards() {


  const { incomes } = useStoreSelector((store) => store.Incomes);
  const { expenses } = useStoreSelector((store) => store.Expenses);

  return (
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <div className="grid grid-cols-2 gap-8">
            <PieChart transaction={incomes} text='Rendimentos' />
            <PieChart transaction={expenses} text='Despesas' />
          </div>

        </div>
      </div>
  )
}

