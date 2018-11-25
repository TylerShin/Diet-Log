import { Action } from 'redux';
import { put, all, takeEvery } from 'redux-saga/effects';
import { ACTION_TYPES } from './actions/actionTypes';
import { uploadImagesFlow } from './actions/uploadImage';

export function* rootSaga() {
  yield all([uploadImagesFlow()]);
}
