'use client';
import { useEffect, useState } from 'react';

import Expense from '../Expenses';
import Income from '../Income';

import { useStoreSelector } from '@/hooks/useStoreSelector';
export interface TransactionProps {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}

export default function History() {
  const { expenses } = useStoreSelector((store) => store.Expenses);
  const { incomes } = useStoreSelector((store) => store.Incomes);
  const [finances, setFinances] = useState<TransactionProps[]>([]);

  useEffect(() => {
    if (expenses.length > 0 || incomes.length > 0) {
      const merged = expenses.concat(incomes);
      const sorted = merged.sort((a: TransactionProps, b: TransactionProps) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      const recent = sorted.slice(0, 3);
      setFinances(recent);
    }
  }, [expenses, incomes]);
  return (
    <>
      <h1 className="text-white text-3xl font-semibold tracking-tight">
        Histórico recente
      </h1>
      <div className="flex flex-col py-4 space-y-2">
        {finances.length > 0 &&
          finances.map((finance) => {
            return finance.type == 'income' ? (
              <Income
                key={crypto.randomUUID()}
                income={finance.title}
                value={finance.amount}
              ></Income>
            ) : (
              <Expense
                key={crypto.randomUUID()}
                expense={finance.title}
                value={finance.amount}
              ></Expense>
            );
          })}
      </div>
    </>
  );
}
