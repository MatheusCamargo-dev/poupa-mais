import React from 'react'
import { GiMoneyStack } from 'react-icons/gi'
import { TbFilePencil, TbTrashFilled } from 'react-icons/tb'

import { GoalStates } from '@/features/Goals';
import { toBRL } from '@/functions/toBRL';
import { useBalanceValue } from '@/hooks/useBalanceValue';
import { useCompoundInterest } from '@/hooks/useCompoundInterest';
import { useStoreSelector } from '@/hooks/useStoreSelector'

export default function GoalsItem(goal: GoalStates) {
  const { incomes } = useStoreSelector((store) => store.Incomes);
  const { balanceValue } = useBalanceValue();
  let currentValue = 0;

  const incomeFilter = incomes.filter((income) => income.category == goal.balanceCategory);

  if(goal.balanceCategory == 'Saldo Total'){
    currentValue = balanceValue + goal.initialValue;
  }else{
    currentValue = incomeFilter.reduce((acc, item) => {
      acc = item.amount
      return acc
    },0) + goal.initialValue;
  }

  const completionPercentage = (((currentValue) * 100) / goal.endGoalValue);
  const percentage = (completionPercentage > 100) ? 100 : completionPercentage;

  const { estimatedDate } = useCompoundInterest({
    currentValue,
    endGoalValue: goal.endGoalValue,
    interestRate: goal.interestRate,
    monthlyValue: goal.monthlyValue
  });

  return (
    <div className="flex w-full space-x-4 p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500 rounded-2xl bg-zinc-50">
        <div className="bg-dash flex items-center justify-center rounded-lg px-6">
          <GiMoneyStack size={50} />
        </div>
        <div className="flex flex-col space-y-2 justify-center flex-1 text-transaction">
          <div className="flex justify-between text-zinc-700 font-semibold text-lg">
            <h1 >{goal.title}</h1>
            <h1>{percentage.toFixed(2)}% concluído</h1>
          </div>
          <div className="h-4 rounded-lg w-full bg-slate-400 flex items-center">
            <div className={`bg-green-500 h-4 rounded-lg `} style={{ width: `${Math.max(percentage, 1).toFixed(2)}%`}}>
            </div>
          </div>
          <div className="flex justify-between whitespace-nowrap">
            <p>
              Valor atual: {toBRL(currentValue)}
            </p>
            <p>
              Objetivo: {toBRL(goal.endGoalValue)}
            </p>
            <p>
               { percentage !== 100 &&  `Mês estimado para a conclusão: ${estimatedDate} ` }
               { percentage == 100 &&  `Meta concluída! ` }
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
