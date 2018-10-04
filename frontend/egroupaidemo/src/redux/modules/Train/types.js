import {
  waitUserToTrain,
  startRetriveFaces,
  stopRetriveFaces,
  concatRetrivedFaces,
  toggleBlackStatus,
  toggleAutoTrain,
  showRetrivedFaces,
  appendSelectedFace,
  trainProcessFinish,
  fetchPostModelTrain,
  fetchPostModelTrainRequest,
  fetchPostModelTrainSuccess,
  fetchPostModelTrainFailure,
  fetchPostModelSwitch,
  fetchPostModelSwitchRequest,
  fetchPostModelSwitchSuccess,
  fetchPostModelSwitchFailure
} from './actions';

export const WAIT_USER_TO_TRAIN = waitUserToTrain().type;
export const START_RETRIVE_FACES = startRetriveFaces().type;
export const STOP_RETRIVE_FACES = stopRetriveFaces().type;
export const CONCAT_RETRIVED_FACES = concatRetrivedFaces().type;
export const TOGGLE_BLACK_STATUS = toggleBlackStatus().type;
export const TOGGLE_AUTO_TRAIN = toggleAutoTrain().type;
export const SHOW_RETRIVED_FACES = showRetrivedFaces().type;
export const APPEND_SELECTED_FACE = appendSelectedFace().type;
export const TRAIN_PROCESS_FINISH = trainProcessFinish().type;

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
