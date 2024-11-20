// src/redux/store.ts
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import weatherReducer from './reducers/weatherReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // This gives us the root state type

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
