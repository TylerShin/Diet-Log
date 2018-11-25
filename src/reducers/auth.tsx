import { Reducer } from 'redux';
import { ACTION_TYPES } from '../actions/actionTypes';

export const authReducer: Reducer = (state: AuthState = { currentUser: null }, action) => {
  switch (action.type) {
    case ACTION_TYPES.SUCCESS_TO_SIGN_IN:
      return { ...state, currentUser: action.payload.username };

    default:
      return state;
  }
};
