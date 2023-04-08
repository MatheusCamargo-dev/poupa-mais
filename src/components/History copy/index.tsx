import Expense from '../Expenses';
import Income from '../Income';

export default function History() {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold">Histórico recente</h1>
      <div className="flex flex-col py-4 space-y-2">
        <Expense expense="Consulta no dentista" value={200}></Expense>
        <Expense expense="Viagem" value={1250}></Expense>
        <Income income="Freelance" value={3250}></Income>
      </div>
    </>
  );
}
