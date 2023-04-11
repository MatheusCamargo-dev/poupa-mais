'use client';
import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function ContentTotValue() {
  const { totExpenses } = useStoreSelector((store) => store.Expenses);
  const { totIncome } = useStoreSelector((store) => store.Incomes);

  const balanceValue = totIncome - totExpenses;
  return (
    <div className="flex flex-col p-4 border-2 w-full border-zinc-300  text-transaction rounded-md bg-zinc-300">
      <span
        className={'text-xl md:text-2xl font-bold text-transaction text-center'}
      >
        Saldo total
      </span>{' '}
      <span
        className={'text-2xl px-10 md:text-4xl text-emerald-600 font-semibold'}
      >
        {toBRL(balanceValue)}
      </span>
    </div>
  );
}
