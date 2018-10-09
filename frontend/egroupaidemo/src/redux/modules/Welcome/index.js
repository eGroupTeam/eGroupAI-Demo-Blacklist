import { combineReducers } from 'redux-immutable';
import { fromJS, set } from 'immutable';
import { handleActions } from 'redux-actions';
import { createFetchPostReducer } from '@e-group/frontend-utils';

import { TOGGLE_RECOGNIZE, SET_RESULT,
  FETCH_POST_MODEL_TRAIN,
  FETCH_POST_MODEL_TRAIN_REQUEST,
  FETCH_POST_MODEL_TRAIN_SUCCESS,
  FETCH_POST_MODEL_TRAIN_FAILURE,
  FETCH_POST_MODEL_SWITCH,
  FETCH_POST_MODEL_SWITCH_REQUEST,
  FETCH_POST_MODEL_SWITCH_SUCCESS,
  FETCH_POST_MODEL_SWITCH_FAILURE } from './types';

const ui = handleActions(
  {
    [TOGGLE_RECOGNIZE]: state =>
      set(state, 'isStarted', !state.get('isStarted')),
    [SET_RESULT]: (state, action) => set(state, 'result', action.payload)
  },
  fromJS({
    isStarted: false,
    result: []
  })
);

const modelTrain = createFetchPostReducer({
  take: FETCH_POST_MODEL_TRAIN,
  request: FETCH_POST_MODEL_TRAIN_REQUEST,
  success: FETCH_POST_MODEL_TRAIN_SUCCESS,
  failure: FETCH_POST_MODEL_TRAIN_FAILURE
});

const modelSwitch = createFetchPostReducer({
  take: FETCH_POST_MODEL_SWITCH,
  request: FETCH_POST_MODEL_SWITCH_REQUEST,
  success: FETCH_POST_MODEL_SWITCH_SUCCESS,
  failure: FETCH_POST_MODEL_SWITCH_FAILURE
});

export default combineReducers({
  ui,
  modelTrain,
  modelSwitch
});
