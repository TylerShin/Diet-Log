import { SagaIterator } from 'redux-saga';

export function* helloSaga() {
  console.log('hello sagas');
  return true;
}
