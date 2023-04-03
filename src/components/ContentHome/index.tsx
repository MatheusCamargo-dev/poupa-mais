import StartNow from '../StartNow';

export default function ContentHome() {
  return (
    <div className="h-full bg-gradient-teal mx-auto flex flex-col pt-8 items-center">
      <h1 className="text-4xl font-bold tracking-tight">
        preview test gadjgdagdshj
      </h1>
      <div className="mt-16 flex">
        <img src="/cell.png" alt="" />
        <div className="flex flex-col  ml-32 mb-16 w-50 justify-center">
          <h1 className="text-4xl font-bold tracking-tight">
            preview test gadjgdagdshj.
          </h1>
          <h1 className="text-4xl font-bold tracking-tight">
            preview test gadjgdagdshj.
          </h1>
          <p className="text-black text-lg mt-16">
            See it all at a glance when you link your cash accounts, credit
            cards, investments, and bills.
          </p>
          <StartNow></StartNow>
        </div>
      </div>
    </div>
  );
}
