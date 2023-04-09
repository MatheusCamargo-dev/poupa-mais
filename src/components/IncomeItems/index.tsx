'use client';
import { useCallback, useEffect, useState } from 'react';

import IncomeItem from '../IncomeItem';

import { apiClient } from '@/services/api-client';

interface IncomeProps {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}
export default function IncomeItems() {
  const [incomes, setIncomes] = useState([]);
  const getIncomes = useCallback(async () => {
    const data = await apiClient(
      'http://localhost:3000/api/transactions/income/',
      'GET'
    );
    const json = await data.json();
    setIncomes(json.data);
  }, []);
  useEffect(() => {
    getIncomes();
  }, []);
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
