import ContentTotValue from '../ContentTotValue';

export default function Transactions() {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="dash h-72 border-white border-2 rounded">dashboard</div>
      <div className="flex space-x-4 ">
        <ContentTotValue
          msg="Total de rendimentos"
          type="income"
          value={1000}
        ></ContentTotValue>
        <ContentTotValue
          msg="Total de despesas"
          type="expense"
          value={1000}
        ></ContentTotValue>
      </div>
      <div className="flex flex-col border-2 w-full sm:w-max sm:mx-auto border-zinc-300  rounded-md bg-zinc-300">
        <ContentTotValue
          msg="Total de despesas"
          type="balance"
          value={10000}
        ></ContentTotValue>
      </div>
    </div>
  );
}
