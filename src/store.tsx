import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { rootSaga } from './sagas';
import { ImageReducer } from './reducers/image';
import { authReducer } from './reducers/auth';

const reducer = combineReducers<AppState>({
  auth: authReducer,
  imageState: ImageReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga as any);
