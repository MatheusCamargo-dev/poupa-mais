'use client';

import IncomeItem from '../IncomeItem';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export interface IncomeProps {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}
export default function IncomeItems() {
  const { incomes } = useStoreSelector((store) => store.Incomes);
  return (
    <div className="flex flex-col sm:w-full space-y-4 mt-5">
      {incomes?.[0]?.title !== '' &&
        incomes.map((income: IncomeProps) => {
          return (
            <IncomeItem
              amount={income.amount}
              category={income.category}
              title={income.title}
              _id={income._id}
              description={income.description}
              date={income.date}
              key={income._id}
            />
          );
        })}
    </div>
  );
}
