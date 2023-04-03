import StartNow from '../StartNow';

export default function Bundler() {
  return (
    <div className="bg-gradient-blue pt-24 pb-36 ">
      <div className="flex justify-center items-center mx-auto">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-white md:text-3xl text-xl font-bold tracking-tight mb-2">
              Controle seus gastos
            </h2>
            <p className="text-white text-xl font-light">
              Mantenha suas finanças sob controle com nossa ferramenta de
              orçamento pessoal
            </p>
          </div>
        </div>
        <img src="financas.png" alt="" className="h-64 w-64 mr-2" />
      </div>
      <StartNow></StartNow>
    </div>
  );
}
