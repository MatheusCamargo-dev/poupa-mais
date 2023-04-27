import ContentTotValue from '../ContentTotValue';
import Dashboard from '../Dashboard';
import TotIncome from '../TotExpense';
import TotExpense from '../TotIncome';

export default function Transactions() {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="dash h-80 border-white border-2 rounded">
        <Dashboard />
      </div>
      <div className="flex space-x-4 ">
        <TotIncome flex="col"></TotIncome>
        <TotExpense flex="col"></TotExpense>
      </div>
      <ContentTotValue />
    </div>
  );
}
