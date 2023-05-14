import React from 'react'
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, TooltipItem } from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TransactionProps {
    date: string;
    amount: number;
    type: string;
}

interface DataTransaction {
  date: string;
  amount: number;
}

interface LineProps{
  merged: TransactionProps[],
  text: string,
}

export default function BalanceCharts({ merged, text }: LineProps) {
  const transactions = merged.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  .map((transaction) => {

    if(transaction.type == 'income'){
    return {
      date: transaction.date,
      amount: transaction.amount
    };
    }else{
      return {
        date: transaction.date,
        amount: -transaction.amount
      };
    }
  });

  const totTransactions =
  transactions
  .reduce<{ [key: string]: DataTransaction }>((acc: any, item) =>
    {
      const { date, amount } = item;
      const existingData = acc[date] || { date, amount: 0};
      const newData = {
        date,
        amount: existingData.amount + amount
      };

      return { ...acc, [date]: newData };
    }
  , {});

  const objTransacitons = Object.values(totTransactions);

  const totAmounts = objTransacitons.reduce<any>((acc, item, index) => {
  const { date, amount} = item;
  acc.amount += amount;
  const data = {
    date,
    amount: acc.amount
  }


  return { ...acc, [index]:data}
  },{amount: 0});
  delete totAmounts.amount;

  const getDataForChart = (data: TransactionProps[]): ChartData<"line"> => {
    const labels = data.map((item) => new Date(item.date).toLocaleDateString()); // Array com as datas
    const amounts = data.map((item) => item.amount); // Array com os valores

    return {
      labels: labels,
      datasets: [
        {
          label: 'Saldo',
          data: amounts,
          fill: true,
          tension: 0.1,
          borderColor:  'rgb(75, 192, 192)',
          pointBorderColor: 'transparent',
          pointBorderWidth: 4
        }
      ]
    };
  };

  const chartData = getDataForChart(Object.values(totAmounts));

  const optionsLineChart = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                // Formate o valor conforme necessário
                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
              }
              return label;
          },
        }
      }
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 6,
        backgroundColor: 'white',

      }
    },
    scales: {
      x: {
        grid: {
          color: '#999797',
        }
      },
      y: {
        grid: {
          color: '#999797',
        },
        ticks: {
          color: 'white',
          callback: (value: number | string) => Intl.NumberFormat('en', { notation: 'compact'}).format(Number(value)),
        }
      }
    }
  };

  return (
    <div className=" h-72 w-10/12 text-white flex gap-6 items-center flex-col">
      <h1 className="text-center text-xl font-bold">{text}</h1>
      <Line data={chartData} options={optionsLineChart} />
    </div>
  )
}
