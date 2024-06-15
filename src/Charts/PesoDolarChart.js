import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const PesoDolarChart = () => {
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/d333330c400c4871344aa200/latest/USD');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API response:', data);

        if (!data.conversion_rates || !data.conversion_rates.MXN) {
          throw new Error('Invalid data format');
        }

        const rates = data.conversion_rates;
        setChartData({
          labels: ['USD'],
          datasets: [{
            label: 'USD to MXN',
            data: [rates.MXN],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
          }]
        });
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default PesoDolarChart;
