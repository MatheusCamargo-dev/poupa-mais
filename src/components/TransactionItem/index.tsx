import { FaCommentDots } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { MdDateRange } from 'react-icons/md';

import { TransactionProps } from '../History';

import { formatDateISOToBR } from '@/functions/formatDateISO';
import { toBRL } from '@/functions/toBRL';
import { ExpenseCategory } from '@/store/expenseCategory';
import { IncomeCategory } from '@/store/incomeCategory';

export default function TransactionItem(props: TransactionProps) {
  return (
    <div className="flex justify-between w-full p-3 px-5 border-2 items-center hover:bg-zinc-300 mx-auto border-zinc-500  rounded-2xl bg-zinc-50">
      <div className="flex items-center space-x-8">
        {props.type == 'expense'
          ? ExpenseCategory[props.category]
          : IncomeCategory[props.category]}
        <div className="flex flex-col ml-2 space-y-2 text-transaction text-lg">
          <div className="flex items-center gap-2">
            <div
              className={`${
                props.type == 'expense' ? 'bg-red-500' : 'bg-green-500'
              } rounded-full w-3 h-3`}
            ></div>
            <span className="font-semibold md:text-xl">{props.title}</span>
          </div>
          <div className="flex md:flex-row flex-col md:space-x-4 md:whitespace-nowrap">
            <span>{toBRL(props.amount)}</span>
            <span className="flex items-center">
              <MdDateRange />
              {formatDateISOToBR(props.date)}
            </span>
            <span className="flex items-center gap-1">
              <FaCommentDots />
              {props.description}
            </span>
          </div>
        </div>
      </div>
      <div className="sm:flex hidden items-center justify-center sm:mr-5 md:bg-teal-500 md:w-16 md:h-16 md:p-4 rounded-full text-white">
        <FiPlus size={100} className="text-teal-500 md:text-white"></FiPlus>
      </div>
    </div>
  );
}
