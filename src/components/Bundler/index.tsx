import Image from 'next/image';

import StartNow from '../StartNow';

export default function Bundler() {
  return (
    <div className="bg-gradient-dark-teal py-32 md:py-64">
      <div className="flex justify-center items-center mx-auto">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 ml-4">
          <div className="lg:text-center group space-y-2">
            <h2 className="text-zinc-100 text-4xl md:text-5xl font-bold tracking-tight mb-2 transform transition-all hover:scale-110">
              Domine suas finanças com <span className='group-hover:text-teal-100'>Poupa Mais🤩</span>
            </h2>
            <br/>
            <p className="text-zinc-100 text-center text-lg md:text-xl font-light overflow-hidden line-clamp-3 transform transition-all hover:scale-110">
                Transforme suas finanças com <span className='group-hover:text-teal-100 group-hover:text-2xl'>Poupa Mais! </span>
                Controle seus gastos e alcance a estabilidade financeira desejada. <br/>
                Nosso aplicativo intuitivo oferece um poderoso sistema de orçamento pessoal,
                ajudando você a tomar decisões inteligentes, atingir metas financeiras e ter o controle total das suas finanças.
                Experimente agora e dê o primeiro passo para uma vida financeira equilibrada.
            </p>
          </div>
        </div>
        <Image
          width={300}
          height={300}
          src="/financas.png"
          alt=""
          className="h-64 w-64 mr-2 lg:w-80 lg:h-80 transform transition-all hover:scale-110"
        />
      </div>
      <StartNow></StartNow>
    </div>
  );
}
