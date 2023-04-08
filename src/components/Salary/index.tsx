import { toBRL } from '@/functions/toBRL';

interface Salary {
  min: number;
  max: number;
}

export default function Salary(props: Salary) {
  const { min, max } = props;
  return (
    <>
      <div className="text-violet-300 flex justify-between text-xl items-center">
        <span>Minímo</span>
        <span className="text-3xl font-semibold">Salário</span>
        <span>Máximo</span>
      </div>
      <div className="flex flex-col py-4 space-y-2">
        <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500  rounded-2xl bg-zinc-100">
          <span className="text-md md:text-2xl font-bold whitespace-nowrap text-transaction">
            {toBRL(min)}
          </span>
          <span className="text-md md:text-2xl font-bold whitespace-nowrap text-transaction">
            {toBRL(max)}
          </span>
        </div>
      </div>
    </>
  );
}
