'use client';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ExpenseItem from '../ExpenseItem';

import { setexpenses } from '@/features/Expenses';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { apiClient } from '@/services/api-client';

export interface ExpenseProps {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}
export default function IncomeItems() {
  const { expenses } = useStoreSelector((store) => store.Expenses);
  const dispatch = useDispatch();
  const getExpenses = useCallback(async () => {
    const data = await apiClient(
      'http://localhost:3000/api/transactions/expense/',
      'GET'
    );
    const json = await data.json();
    dispatch(setexpenses(json.data));
  }, [dispatch]);
  useEffect(() => {
    console.log(expenses);
    if (expenses.length === 0) return;
    getExpenses();
  }, [getExpenses]);
  return (
    <div className="flex flex-col sm:w-full space-y-4 mt-5">
      {expenses?.length > 0 &&
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
