'use client';

import Bundler from '@/components/Bundler';
import HeaderHome from '@/components/HeaderHome';
import StartNow from '@/components/StartNow';

export default function Home() {
  return (
    <>
      <HeaderHome></HeaderHome>
      <Bundler></Bundler>
      <div className="h-8 bg-dark-blue"></div>
      <div className="h-screen bg-gradient-teal mx-auto flex flex-col pt-8 items-center">
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
    </>
  );
}
