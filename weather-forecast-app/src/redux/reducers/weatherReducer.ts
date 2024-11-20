// src/redux/reducers/weatherReducer.ts
import { SET_WEATHER_DATA, WEATHER_ERROR } from '../types';

interface WeatherState {
  data: any[];
  error: string | null;
}

const initialState: WeatherState = {
  data: [],
  error: null,
};

const weatherReducer = (state = initialState, action: any): WeatherState => {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return { ...state, data: [...state.data, action.payload], error: null };
    case WEATHER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
