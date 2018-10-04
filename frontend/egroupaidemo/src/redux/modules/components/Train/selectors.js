export const getUIState = state => state.getIn(['components', 'Train', 'ui']);

export const getModelTrainState = state =>
  state.getIn(['components', 'Train', 'modelTrain']);

export const getModelSwitchState = state =>
  state.getIn(['components', 'Train', 'modelSwitch']);
