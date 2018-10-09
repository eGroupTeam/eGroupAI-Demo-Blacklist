import { toggleRecognize, setResult,
  fetchPostModelTrain,
  fetchPostModelTrainRequest,
  fetchPostModelTrainSuccess,
  fetchPostModelTrainFailure,
  fetchPostModelSwitch,
  fetchPostModelSwitchRequest,
  fetchPostModelSwitchSuccess,
  fetchPostModelSwitchFailure } from './actions';

export const TOGGLE_RECOGNIZE = toggleRecognize().type;
export const SET_RESULT = setResult().type;

export const FETCH_POST_MODEL_TRAIN = fetchPostModelTrain().type;
export const FETCH_POST_MODEL_TRAIN_REQUEST = fetchPostModelTrainRequest().type;
export const FETCH_POST_MODEL_TRAIN_SUCCESS = fetchPostModelTrainSuccess().type;
export const FETCH_POST_MODEL_TRAIN_FAILURE = fetchPostModelTrainFailure().type;

export const FETCH_POST_MODEL_SWITCH = fetchPostModelSwitch().type;
export const FETCH_POST_MODEL_SWITCH_REQUEST = fetchPostModelSwitchRequest()
  .type;
export const FETCH_POST_MODEL_SWITCH_SUCCESS = fetchPostModelSwitchSuccess()
  .type;
export const FETCH_POST_MODEL_SWITCH_FAILURE = fetchPostModelSwitchFailure()
  .type;
