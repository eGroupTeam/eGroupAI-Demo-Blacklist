import {
  toggleRecognize,
  setResult,
  fetchPostModelTrain,
  fetchPostModelTrainRequest,
  fetchPostModelTrainSuccess,
  fetchPostModelTrainFailure,
} from './actions';

export const TOGGLE_RECOGNIZE = toggleRecognize().type;
export const SET_RESULT = setResult().type;

export const FETCH_POST_MODEL_TRAIN = fetchPostModelTrain().type;
export const FETCH_POST_MODEL_TRAIN_REQUEST = fetchPostModelTrainRequest().type;
export const FETCH_POST_MODEL_TRAIN_SUCCESS = fetchPostModelTrainSuccess().type;
export const FETCH_POST_MODEL_TRAIN_FAILURE = fetchPostModelTrainFailure().type;