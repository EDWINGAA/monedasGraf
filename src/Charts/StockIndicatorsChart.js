import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const StockIndicatorsChart = () => {
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=UFOXR7XJYUCIHBN2');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API response:', data);

        if (data.Note) {
          throw new Error('API rate limit exceeded');
        }

        if (!data['Time Series (Daily)']) {
          throw new Error('Invalid data format');
        }

        const timeSeries = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeries);
        const prices = dates.map(date => timeSeries[date]['4. close']);

        setChartData({
          labels: dates,
          datasets: [{
            label: 'IBM Stock Price',
            data: prices,
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

export default StockIndicatorsChart;


