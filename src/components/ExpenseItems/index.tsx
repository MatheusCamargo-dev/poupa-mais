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
        expenses.map((expense: ExpenseProps, index) => {
          return (
            <ExpenseItem
              value={expense.amount}
              category={expense.category}
              expense={expense.title}
              id={expense._id}
              comment={expense.description}
              date={expense.date}
              key={index}
            />
          );
        })}
    </div>
  );
}
