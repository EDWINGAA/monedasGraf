import React from 'react';
import PesoDolarChart from './Charts/PesoDolarChart';
import StockIndicatorsChart from './Charts/StockIndicatorsChart';
import BolsaComparativaChart from './Charts/BolsaComparativaChart';

function App() {
  return (
    <div className="App">
      <h1>Paridad Peso/Dólar</h1>
      <PesoDolarChart />
      <h1>Indicadores de la Bolsa de Valores</h1>
      <StockIndicatorsChart />
      <h1>Comparativa de la Bolsa Mexicana de Valores y la Bolsa de Estados Unidos</h1>
      <BolsaComparativaChart />
    </div>
  );
}

export default App;

