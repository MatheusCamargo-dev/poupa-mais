import { FaCommentDots } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import { TbTrashFilled } from 'react-icons/tb';

import { toBRL } from '@/functions/toBRL';

interface IncomeItem {
  id: string;
  value: number;
  income: string;
  comment?: string;
  date?: string;
}
export default function IncomeItem(props: IncomeItem) {
  return (
    <div className="flex justify-between w-full p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500  rounded-2xl bg-zinc-50">
      <div className="flex items-center space-x-8">
        <GiHealthNormal size={35} className="text-transaction"></GiHealthNormal>
        <div className="flex flex-col ml-2 space-y-2 text-transaction text-lg">
          <span className="font-semibold md:text-xl">{props.income}</span>
          <div className="flex md:flex-row flex-col space-x-1 md:whitespace-nowrap">
            <span>{toBRL(props.value)}</span>
            <span className="flex items-center">
              <MdDateRange />
              {props.date}
            </span>
            <span className="flex items-center gap-1">
              <FaCommentDots />
              {props.comment}
            </span>
          </div>
        </div>
      </div>
      <div className="sm:flex hidden items-center sm:mr-5 md:bg-transaction md:p-4 rounded-full text-white">
        <TbTrashFilled
          size={30}
          className="text-transaction md:text-white "
        ></TbTrashFilled>
      </div>
    </div>
  );
}
