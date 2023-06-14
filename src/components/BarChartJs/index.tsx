import React from 'react';
import Chart from 'react-apexcharts'

import { GoalsStates } from '@/features/Goals';
import { toBRL } from '@/functions/toBRL';
import { useBalanceValue } from '@/hooks/useBalanceValue';




// ChartJS.register(ArcElement, Tooltip, Legend);
export default function BarChartJs({goals}: GoalsStates) {

  const { balanceValue, incomes } = useBalanceValue();
  const labels = goals.map((goal) => goal.balanceCategory);
  const chartData = goals.map((goal) => {
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

    // const completionPercentage = (((currentValue) * 100) / goal.endGoalValue);
    // const percentage = (completionPercentage > 100) ? 100 : completionPercentage;
    return {currentValue, goal: goal.endGoalValue}
  })


  return (

      <div className="flex w-96 items-center justify-center">
        <Chart width={350} height={350} type='bar'
          series={[{
            name: 'Valor atual',
            data: chartData.map(data => data.currentValue)
          },
          {
            name: 'Objetivo',
            data: chartData.map(data => data.goal),
            color: 'transparent'
          }
          ]}
          options={{
              labels: labels,
              chart: {
                stacked: true,
                stackType: '100%',
                toolbar: {
                  show: false
                }
              },
              yaxis: {
                labels: {
                  style: {
                    colors: ['#FFF'],
                  },
                  formatter(val) {
                      return val + '%'
                  },
                },
              },
              xaxis: {
                labels: {
                  style: {
                    colors: '#FFF'
                  }
                }
              },
              grid: {
                show: false
              },
              tooltip: {
                enabled: true,
                theme: 'dark',
                y: {
                  formatter(val) {
                      return toBRL(val)
                  },
                },
              },
              legend: {
                show: false,
              },


          }}
        />
      </div>
  )
}
