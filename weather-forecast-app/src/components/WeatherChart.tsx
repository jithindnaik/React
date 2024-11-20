// src/components/WeatherChart.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { fetchWeather } from '../redux/actions/weatherActions';
import { RootState } from '../redux/store';
import { Col, Card, Table } from 'react-bootstrap';

const WeatherChart: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const error = useSelector((state: RootState) => state.weather.error);

  // List of Indian states (you can extend this list)
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
];

  useEffect(() => {
    // Fetch weather data for each state
    states.forEach((state) => {
      dispatch(fetchWeather(state));
    });
  }, [dispatch]);

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Weather Forecast for Indian States',
    },
    xAxis: {
      categories: states,
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)',
      },
    },
    series: [
      {
        name: 'Temperature',
        data: weatherData.map((item) => item.temperature),
      },
      {
        name: 'Humidity',
        data: weatherData.map((item) => item.humidity),
      },
      {
        name: 'Pressure',
        data: weatherData.map((item) => item.pressure),
      },
    ],
  };

   // Bar chart options
   const barChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Weather Forecast for Indian States (Humidity)',
    },
    xAxis: {
      categories: states,
    },
    yAxis: {
      title: {
        text: 'Humidity (%)',
      },
    },
    series: [
      {
        name: 'Humidity',
        data: weatherData.map((item) => item.humidity),
      },
    ],
  };

  // Pie chart options (Humidity distribution)
  const pieChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Weather Forecast Pie Chart (Pressure)',
    },
    series: [
      {
        name: 'Pressure',
        colorByPoint: true,
        data: weatherData.map((item) => ({
          name: item.state,
          y: item.pressure,
        })),
      },
    ],
  };

  // Table options for displaying weather data
  const renderTableData = weatherData.map((item) => (
    <tr key={item.state}>
      <td>{item.state}</td>
      <td>{item.temperature}°C</td>
      <td>{item.humidity}%</td>
      <td>{item.pressure} hPa</td>
      <td>{item.rainPrediction ? item.rainPrediction + '%' : '0%'}</td>
    </tr>
  ));

  return (
    <div>
      {error && <p>{error}</p>}
      <HighchartsReact highcharts={Highcharts} options={options} />

      <h2>Humidity Bar Chart</h2>
      <HighchartsReact highcharts={Highcharts} options={barChartOptions} />

      <h2>Pressure Pie Chart</h2>
      <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />

      <h2>Weather Data Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>State</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Pressure (hPa)</th>
            <th>Rain Prediction (%)</th>
          </tr>
        </thead>
        <tbody>{renderTableData}</tbody>
      </Table>
    </div>
  );
};

export default WeatherChart;
