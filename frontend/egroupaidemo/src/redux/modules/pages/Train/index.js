import { combineReducers } from 'redux-immutable';
import { handleActions } from 'redux-actions';
import { fromJS, merge, set, List } from 'immutable';
import { createFetchPostReducer } from '@e-group/frontend-utils';

import {
  WAIT_USER_TO_TRAIN,
  START_RETRIVE_FACES,
  STOP_RETRIVE_FACES,
  CONCAT_RETRIVED_FACES,
  TOGGLE_BLACK_STATUS,
  TOGGLE_AUTO_TRAIN,
  SHOW_RETRIVED_FACES,
  APPEND_SELECTED_FACE,
  TRAIN_PROCESS_FINISH,
  FETCH_POST_MODEL_TRAIN,
  FETCH_POST_MODEL_TRAIN_REQUEST,
  FETCH_POST_MODEL_TRAIN_SUCCESS,
  FETCH_POST_MODEL_TRAIN_FAILURE,
  FETCH_POST_MODEL_SWITCH,
  FETCH_POST_MODEL_SWITCH_REQUEST,
  FETCH_POST_MODEL_SWITCH_SUCCESS,
  FETCH_POST_MODEL_SWITCH_FAILURE
} from './types';

const ui = handleActions(
  {
    [WAIT_USER_TO_TRAIN]: (state, action) =>
      set(state, 'waitUserToTrain', true),
    [START_RETRIVE_FACES]: state =>
      merge(state, {
        // stop wait
        waitUserToTrain: false,
        // start retrive face process in componentDidUpdate
        startRetriveFace: true,
        // empty retrived faces
        retrivedFaces: List([]),
        // empty selected faces
        selectedFaces: List([]),
        // hide retrived faces
        showRetrivedFaces: false
      }),
    [STOP_RETRIVE_FACES]: state =>
      merge(state, {
        // stop retrive face process in componentDidUpdate
        startRetriveFace: false,
        // and slice it to make sure it'll not over 10.
        retrivedFaces: state.get('retrivedFaces').slice(0, 10)
      }),
    [CONCAT_RETRIVED_FACES]: (state, action) =>
      set(
        state,
        'retrivedFaces',
        state.get('retrivedFaces').concat(action.payload)
      ),
    [TOGGLE_BLACK_STATUS]: (state, action) =>
      set(state, 'blackStatus', action.payload),
    [TOGGLE_AUTO_TRAIN]: (state, action) =>
      set(state, 'isAutoTrain', action.payload),
    [SHOW_RETRIVED_FACES]: (state, action) =>
      set(state, 'showRetrivedFaces', true),
    [APPEND_SELECTED_FACE]: (state, action) =>
      set(
        state,
        'selectedFaces',
        state.get('selectedFaces').push(action.payload)
      ),
    [TRAIN_PROCESS_FINISH]: state =>
      merge(state, {
        // empty retrived faces
        retrivedFaces: List([]),
        // empty selected faces
        selectedFaces: List([]),
        // hide retrived faces
        showRetrivedFaces: false
      })
  },
  fromJS({
    blackStatus: 1,
    isAutoTrain: true,
    retrivedFaces: [],
    selectedFaces: [],
    startRetriveFace: false
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
