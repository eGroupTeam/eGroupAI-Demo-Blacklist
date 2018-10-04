export const getUIState = state => state.getIn(['Train', 'ui']);

export const getModelTrainState = state =>
  state.getIn(['Train', 'modelTrain']);

export const getModelSwitchState = state =>
  state.getIn(['Train', 'modelSwitch']);
