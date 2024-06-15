import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const BolsaComparativaChart = () => {
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUSA = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=UFOXR7XJYUCIHBN2');
        const responseMexico = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MXX&apikey=UFOXR7XJYUCIHBN2');
        
        if (!responseUSA.ok || !responseMexico.ok) {
          throw new Error('Network response was not ok');
        }

        const dataUSA = await responseUSA.json();
        const dataMexico = await responseMexico.json();
        console.log('API response USA:', dataUSA);
        console.log('API response Mexico:', dataMexico);

        if (dataUSA.Note || dataMexico.Note) {
          throw new Error('API rate limit exceeded');
        }

        if (!dataUSA['Time Series (Daily)'] || !dataMexico['Time Series (Daily)']) {
          throw new Error('Invalid data format');
        }

        const timeSeriesUSA = dataUSA['Time Series (Daily)'];
        const timeSeriesMexico = dataMexico['Time Series (Daily)'];
        const datesUSA = Object.keys(timeSeriesUSA);
        const datesMexico = Object.keys(timeSeriesMexico);
        const pricesUSA = datesUSA.map(date => timeSeriesUSA[date]['4. close']);
        const pricesMexico = datesMexico.map(date => timeSeriesMexico[date]['4. close']);

        setChartData({
          labels: datesUSA,
          datasets: [
            {
              label: 'USA Stock Price (SPY)',
              data: pricesUSA,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
            },
            {
              label: 'Mexico Stock Price (MXX)',
              data: pricesMexico,
              borderColor: 'rgba(192,75,75,1)',
              backgroundColor: 'rgba(192,75,75,0.2)',
            },
          ]
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

export default BolsaComparativaChart;
