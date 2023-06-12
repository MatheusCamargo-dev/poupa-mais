import React from 'react';
import { Bar } from 'react-chartjs-2';


import { GoalsStates } from '@/features/Goals';
import { useBalanceValue } from '@/hooks/useBalanceValue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartjsPluginStacked100 from 'chartjs-plugin-stacked100';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartjsPluginStacked100
  );




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

    const completionPercentage = (((currentValue) * 100) / goal.endGoalValue);
    const percentage = (completionPercentage > 100) ? 100 : completionPercentage;
    return Number(percentage.toFixed(2))
  })

  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
      },
      {
        data: chartData.map(() => 100),
        backgroundColor: [
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },

   ]
  };

  return (

      <div className="flex w-96 items-center justify-center">
        <Bar data={data} options={{
           responsive: true,
           plugins: {
             legend: {
               display: false,
             },
             title: {
               display: true,
               text: 'Metas',
               color: '#fff'
             },
             stacked100: {
              enable: true,
              replaceTooltipLabel: false,
             },
           },
           scales: {
            y: {
              beginAtZero: true
            }
           }
        }} />
      </div>
  )
}
