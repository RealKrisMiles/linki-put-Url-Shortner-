import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip, Filler } from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler
);

const mathRandom = () => {
  return Math.floor(Math.random() * 225);
};

const Graph = ({ myUrlList }) => {
    // console.log("Graph received data:", myUrlList);
  const labels = myUrlList?.map(item => `${item.clickDate}`) || [];
  const userPerData = myUrlList?.map(item => item.count) || [];
  const defaultLabels = Array(11).fill('');
  const defaultData = [1,2,3,4,5,6,5,4,3,2,1];

  const effectiveLabels = labels.length > 0 ? labels : defaultLabels;
  const effectiveData = labels.length > 0 ? userPerData : defaultData;

  // Generate a random color for each bar
  const backgroundColors = effectiveData.map(() =>
    `rgba(${mathRandom()}, ${mathRandom()}, ${mathRandom()}, ${labels.length > 0 ? 0.5 : 0.1})`
  );

  const data = {
    labels: effectiveLabels,
    datasets: [
      {
        label: "Total Click",
        data: effectiveData,
        backgroundColor: backgroundColors,
        fill: true,
        borderWidth: 1,
        tension: 0.4,
        barThickness: 10,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => Number.isInteger(value) ? value.toString() : "",
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold"
          },
          color: "#FF0000",
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold"
          },
          color: "#FF0000",
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
