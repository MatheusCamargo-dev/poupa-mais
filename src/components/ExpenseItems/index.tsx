'use client';

import ExpenseItem from '../ExpenseItem';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export interface ExpenseProps {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}
export default function ExpenseItems() {
  const { expenses } = useStoreSelector((store) => store.Expenses);
  return (
    <div className="flex flex-col sm:w-full space-y-4 mt-5">
      {expenses?.[0]?.title !== '' &&
        expenses.map((income: ExpenseProps, index) => {
          return (
            <ExpenseItem
              value={income.amount}
              income={income.title}
              id={income._id}
              comment={income.description}
              date={income.date}
              key={index}
            />
          );
        })}
    </div>
  );
}
