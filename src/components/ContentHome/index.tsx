import Image from 'next/image';

import StartNow from '../StartNow';

export default function ContentHome() {
  return (
    <div className="h-full bg-gradient-dark-blue mx-auto flex flex-col pt-8 items-center pb-32">
      <div className='flex items-center rounded-xl px-8 pt-4 transform transition-all hover:scale-105'>
        <h1 className="text-4xl space-x-2 font-bold text-center whitespace-nowrap text-teal-400 md:text-left tracking-tight">
          Poupa Mais
        </h1>
        <Image
            className="mb-6 h-16 w-16"
            src="/PriceHouse.ico"
            width={32}
            height={32}
            alt="Your Company"
          />
      </div>
      <div className="mt-4 flex flex-col md:flex-row px-8">
        <Image width={750} height={750} src="/HomePage.png" className="transform transition-all hover:scale-105" alt="" />
        <div className="flex flex-col text-white ml-32 mb-16 w-50 justify-center ">
          <h1 className="text-4xl text-teal-300 font-bold tracking-tight">
            Nunca foi tão fácil controlar os seus gastos!
          </h1>
          <p className="text-gray-200 text-lg mt-6">
              Controle suas despesas de forma fácil e rápida com nosso app de finanças pessoais.
              Planeje seu orçamento, acompanhe seus gastos e atinja seus objetivos financeiros em questão de minutos.
              Crie uma conta agora e comece a transformar sua vida financeira!
          </p>
          <StartNow></StartNow>
        </div>
      </div>
    </div>
  );
}
