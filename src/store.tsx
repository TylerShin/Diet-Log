import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { helloSaga } from './sagas';

const appReducer: Reducer = (state: AppState = { currentUser: null }, action) => {
  switch (action.type) {
    case 'SUCCESS_TO_SIGN_IN':
      return { ...state, currentUser: action.payload.username };

    default:
      return state;
  }
};
const reducer = combineReducers({
  app: appReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(helloSaga as any);

// const action = type => store.dispatch({type})
