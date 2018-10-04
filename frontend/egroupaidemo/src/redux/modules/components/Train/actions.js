import actionCreators from 'redux/modules/actionCreators';

export const {
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
} = actionCreators.components.train;
