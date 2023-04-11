import { toBRL } from '@/functions/toBRL';

export default function TotIncome(props: { value: number }) {
  return (
    <div className="flex flex-col md:flex-row p-4 items-center border-2 w-full justify-center border-zinc-300 text-center  text-transaction rounded-md bg-white">
      <span className={'text-xl md:text-2xl font-bold text-transaction'}>
        Total de rendimentos:
      </span>
      <span
        className={'text-2xl px-1 md:text-4xl text-emerald-600 font-semibold'}
      >
        {isNaN(props.value) ? 'R$ 0.00' : toBRL(props.value)}
      </span>
    </div>
  );
}
