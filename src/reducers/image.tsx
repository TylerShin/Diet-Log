import { Action, Reducer } from 'redux';
import { ACTION_TYPES } from '../actions/actionTypes';

const IMAGES_INITIAL_STATE = {
  images: [],
};

export const ImageReducer: Reducer = (state: ImagesState = IMAGES_INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_IMAGES:
      return { ...state, images: action.payload.images };

    default:
      return state;
  }
};
