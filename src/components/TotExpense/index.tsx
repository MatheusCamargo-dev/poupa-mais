import { toBRL } from '@/functions/toBRL';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function TotIncome(props: { flex?: string }) {
  const { totExpenses } = useStoreSelector((store) => store.Expenses);
  const { flex } = props;
  return (
    <div
      className={`flex flex-col md:flex-${
        flex ? flex : 'row'
      } p-4 items-center border-2 w-full justify-center border-zinc-300 text-center  text-transaction rounded-md bg-white`}
    >
      <span className={'text-xl md:text-2xl font-bold text-transaction'}>
        Total de despesas:
      </span>
      <span className={'text-2xl px-1 md:text-4xl text-red-600 font-semibold'}>
        {isNaN(totExpenses) ? 'R$ 0.00' : toBRL(totExpenses)}
      </span>
    </div>
  );
}