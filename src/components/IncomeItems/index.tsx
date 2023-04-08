import { FaCommentDots } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import { TbTrashFilled } from 'react-icons/tb';

import { toBRL } from '@/functions/toBRL';

interface Income {
  income: string;
  value: number;
}
export default function IncomeItems(props: Income) {
  const { income, value } = props;
  return (
    <div className="flex flex-col sm:w-full mt-5">
      <div className="flex justify-between w-full p-3 px-5 border-2 mx-auto border-zinc-500  rounded-2xl bg-zinc-50">
        <div className="flex items-center space-x-8">
          <GiHealthNormal
            size={35}
            className="text-transaction"
          ></GiHealthNormal>
          <div className="flex flex-col ml-2 space-y-2 text-transaction text-lg">
            <span className="font-semibold sm:text-xl">{income}</span>
            <div className="flex sm:flex-row flex-col space-x-1 sm:whitespace-nowrap">
              <span>{toBRL(value)}</span>
              <span className="flex items-center">
                <MdDateRange />
                19/10/2003
              </span>
              <span className="flex items-center gap-1">
                <FaCommentDots />
                Limpeza nos dentes
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center sm:mr-5 sm:bg-transaction sm:p-4 rounded-full text-white">
          <TbTrashFilled
            size={30}
            className="text-transaction sm:text-white "
          ></TbTrashFilled>
        </div>
      </div>
    </div>
  );
}
