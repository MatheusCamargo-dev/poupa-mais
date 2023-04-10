'use client';
import FormIncome from '@/components/FormIncome';
import IncomeItems from '@/components/IncomeItems';
import TotIncome from '@/components/TotIncome';

import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function Incomes() {
  const { totIncome } = useStoreSelector((store) => store.Incomes);
  return (
    <div className="h-full w-full">
      <div className=" mx-auto container h-max my-10">
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Rendimentos
          </h1>
          <div className="flex text-white flex-col space-y-4 md:space-x-8 md:flex-row justify-between mt-5 ">
            <TotIncome value={totIncome}></TotIncome>
          </div>
          <div className="flex sm:flex-row flex-col sm:space-x-8 mt-5">
            <FormIncome />
            <IncomeItems></IncomeItems>
          </div>
        </div>
      </div>
    </div>
  );
}
