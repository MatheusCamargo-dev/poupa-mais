'use client';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ExpenseItem from '../ExpenseItem';

import { setExpenses } from '@/features/Expenses';
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
export default function ExpenseItems() {
  const { expenses } = useStoreSelector((store) => store.Expenses);
  const dispatch = useDispatch();
  const getExpenses = useCallback(async () => {
    const data = await apiClient(
      'http://localhost:3000/api/transactions/expense/',
      'GET'
    );
    console.log('api');
    const json = await data.json();
    dispatch(setExpenses(json.data));
  }, [dispatch]);
  useEffect(() => {
    if (expenses?.[0]?.title !== '') return;
    getExpenses();
  }, [expenses]);
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
