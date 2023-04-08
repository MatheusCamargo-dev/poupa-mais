import { toBRL } from '@/functions/toBRL';

interface Content {
  value: number;
  msg: string;
  type: string;
}

export default function ContentTotValue(props: Content) {
  return (
    <div className="flex flex-col p-4 border-2 w-full border-zinc-300  text-transaction rounded-md bg-zinc-300">
      <span
        className={
          props.type === 'balance'
            ? 'text-xl md:text-2xl font-bold text-transaction text-center'
            : 'text-sm md:text-xl font-bold'
        }
      >
        {props.msg}
      </span>{' '}
      <span
        className={
          props.type === 'balance'
            ? 'text-2xl px-10 md:text-4xl text-emerald-600 font-semibold'
            : 'text-xl md:text-4xl font-semibold'
        }
      >
        {toBRL(props.value)}
      </span>
    </div>
  );
}
