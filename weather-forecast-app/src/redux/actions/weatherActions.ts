// src/redux/actions/weatherActions.ts
import { FETCH_WEATHER, SET_WEATHER_DATA, WEATHER_ERROR } from '../types';

export const fetchWeather = (state: string) => ({
  type: FETCH_WEATHER,
  payload: state,
});

export const setWeatherData = (data: any) => ({
  type: SET_WEATHER_DATA,
  payload: data,
});

export const weatherError = (error: string) => ({
  type: WEATHER_ERROR,
  payload: error,
});

export const fetchHistoricalWeatherData = (state: string, lat: number, lon: number) => async (dispatch: any) => {
  try {
    // Here, we use a loop to get historical data for each of the past 5 years.
    const historicalData = [];
    for (let year = 2019; year <= 2023; year++) {
      const response: any = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.floor(new Date(`${year}-01-01`).getTime() / 1000)}&appid=YOUR_API_KEY&units=metric`
      );
      historicalData.push({
        year,
        temperature: response.data.current.temp, // Get temperature or any other metric
      });
    }

    dispatch({
      type: 'FETCH_HISTORICAL_WEATHER_SUCCESS',
      payload: {
        state,
        historicalData,
      },
    });
  } catch (error: any) {
    dispatch({
      type: 'FETCH_HISTORICAL_WEATHER_FAILURE',
      payload: error.message,
    });
  }
};