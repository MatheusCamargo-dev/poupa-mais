'use client';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import IncomeItem from '../IncomeItem';

import { setIncomes } from '@/features/Incomes';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { apiClient } from '@/services/api-client';

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
  const incomes = useStoreSelector((store) => store.Incomes.incomes);
  const dispatch = useDispatch();
  const getIncomes = useCallback(async () => {
    const data = await apiClient(
      'http://localhost:3000/api/transactions/income/',
      'GET'
    );
    const json = await data.json();
    dispatch(setIncomes(json.data));
  }, [dispatch]);
  useEffect(() => {
    console.log(incomes);
    if (incomes.length === 0) return;
    getIncomes();
  }, [getIncomes]);
  return (
    <div className="flex flex-col sm:w-full space-y-4 mt-5">
      {incomes?.length > 0 &&
        incomes.map((income: IncomeProps, index) => {
          return (
            <IncomeItem
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
