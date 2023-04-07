// import apiServer from '@/services/api-back-end';
'use client';
export default function App() {
  return (
    <div className="h-full w-full">
      <div className="container mx-auto h-max my-10">
        <div className="flex flex-col pb-5 px-2">
          <h1 className="text-2xl text-white font-bold">
            Bem vindo novamente, Matheus 👋
          </h1>
          <span className="text-xl text-zinc-400">
            Confira seus rendimentos
          </span>
        </div>
        <div className="flex flex-col rounded-md p-5 border-2 border-zinc-500 bg-gradient-dark-blue pb-64 w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Todas as transações
          </h1>
          <div className="flex text-white flex-col md:flex-row justify-between mt-5 ">
            <div className="flex flex-col space-y-6 w-full">
              <div className="dash h-72 border-white border-2 rounded">
                dashboard
              </div>
              <div className="flex space-x-4 text-transaction ">
                <div className="flex flex-col p-5 border-2 w-full border-zinc-300 rounded-md bg-zinc-300">
                  <span className="text-sm md:text-xl font-bold">
                    Total de rendimentos
                  </span>{' '}
                  <span className="text-xl md:text-4xl font-semibold">
                    R$ 1000
                  </span>
                </div>
                <div className="flex flex-col p-5 border-2 w-full border-zinc-300  rounded-md bg-zinc-300">
                  <span className="text-sm md:text-xl font-bold">
                    Total de despesas
                  </span>{' '}
                  <span className="text-xl md:text-4xl font-semibold">
                    R$ 1000
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-5 border-2 w-max mx-auto border-zinc-300  rounded-md bg-zinc-300">
                <span className="text-md md:text-2xl font-bold text-transaction text-center">
                  Saldo total
                </span>{' '}
                <span className="text-2xl px-10 md:text-4xl text-emerald-600 font-semibold">
                  R$ 10.000
                </span>
              </div>
            </div>

            <div className="flex flex-col w-full p-5">
              <h1 className="text-white text-2xl">Histórico recente</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
