import ContentTotValue from '../ContentTotValue';
import TotIncome from '../TotExpense';
import TotExpense from '../TotIncome';

export default function Transactions() {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="dash h-72 border-white border-2 rounded">dashboard</div>
      <div className="flex space-x-4 ">
        <TotIncome flex="col"></TotIncome>
        <TotExpense flex="col"></TotExpense>
      </div>
      <div className="flex flex-col border-2 w-full sm:w-max sm:mx-auto border-zinc-300  rounded-md bg-white">
        <ContentTotValue />
      </div>
    </div>
  );
}
