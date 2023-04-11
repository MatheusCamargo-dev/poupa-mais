import { useCallback } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import { TbTrashFilled } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

import { deleteIncomes } from '@/features/Incomes';
import { formatDateISOToBR } from '@/functions/formatDateISO';
import { toBRL } from '@/functions/toBRL';
import { apiClient } from '@/services/api-client';

interface IncomeItem {
  id: string;
  value: number;
  income: string;
  comment?: string;
  date: string;
}
export default function ExpenseItem(props: IncomeItem) {
  const dispatch = useDispatch();
  const deleteItem = useCallback(async (id: any) => {
    const body = id;
    const response = await apiClient(
      'http://localhost:3000/api/transactions/income/',
      'DELETE',
      body
    );
    const { data } = await response.json();
    if (data) {
      dispatch(deleteIncomes(data));
    }
  }, []);
  return (
    <div className="flex justify-between w-full p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500  rounded-2xl bg-zinc-50">
      <div className="flex items-center space-x-8">
        <GiHealthNormal size={35} className="text-transaction"></GiHealthNormal>
        <div className="flex flex-col ml-2 space-y-2 text-transaction text-lg">
          <span className="font-semibold md:text-xl">{props.income}</span>
          <div className="flex md:flex-row flex-col md:space-x-4 md:whitespace-nowrap">
            <span>{toBRL(props.value)}</span>
            <span className="flex items-center">
              <MdDateRange />
              {formatDateISOToBR(props.date)}
            </span>
            <span className="flex items-center gap-1">
              <FaCommentDots />
              {props.comment}
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={() => deleteItem(props.id)}
        className="sm:flex hidden items-center sm:mr-5 md:bg-transaction md:p-4 rounded-full text-white"
      >
        <TbTrashFilled
          size={30}
          className="text-transaction md:text-white "
        ></TbTrashFilled>
      </div>
    </div>
  );
}
