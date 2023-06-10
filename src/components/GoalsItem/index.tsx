import React from 'react'
import { GiMoneyStack } from 'react-icons/gi'
import { TbFilePencil, TbTrashFilled } from 'react-icons/tb'

export default function GoalsItem() {
  return (
    <div className="flex w-full space-x-4 p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500 rounded-2xl bg-zinc-50">
        <div className="bg-dash flex items-center justify-center rounded-lg px-6">
          <GiMoneyStack size={50} />
        </div>
        <div className="flex flex-col space-y-2 justify-center flex-1 text-transaction">
          <div className="flex justify-between text-zinc-700 font-semibold text-lg">
            <h1 >Total de patrimônio</h1>
            <h1>40,47% concluído</h1>
          </div>
          <div className="w-full h-4 bg-slate-400 rounded-lg"></div>
          <div className="flex justify-between whitespace-nowrap">
            <p>
              Valor atual: R$101.2372
            </p>
            <p>
              Objetivo: R$1.000.000
            </p>
            <p>
              Mês estimado para conclusão: 08/2027
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <div className='rounded-md border-2 border-zinc-400 text-transaction'>
            <TbFilePencil color='black' size={25}  />

          </div>
          <div className='rounded-md border-2 border-zinc-400 text-transaction'>
            <TbTrashFilled color='black' size={25} />
          </div>
        </div>
    </div>
  )
}
