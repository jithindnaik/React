// src/App.tsx
import React from 'react';
import './App.css';
import WeatherChart from './components/WeatherChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Weather Forecast for India</h1>
      <WeatherChart />
    </div>
  );
};

export default App;
