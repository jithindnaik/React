// src/redux/sagas/weatherSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { setWeatherData, weatherError } from '../actions/weatherActions';
import { FETCH_WEATHER } from '../types';

const API_KEY = ''; // Replace with your OpenWeatherMap API key

function* fetchWeatherData(action: any): Generator {
  try {
    const response: any = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/weather?q=${action.payload},IN&appid=${API_KEY}&units=metric`
    );
    const weatherData = {
      state: action.payload,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
    };
    yield put(setWeatherData(weatherData));
  } catch (error) {
    yield put(weatherError('Failed to fetch weather data'));
  }
}

export default function* weatherSaga() {
  yield takeEvery(FETCH_WEATHER, fetchWeatherData);
}
