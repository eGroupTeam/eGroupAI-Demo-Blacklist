export const getUIState = state => state.getIn(['pages', 'Train', 'ui']);

export const getModelTrainState = state =>
  state.getIn(['pages', 'Train', 'modelTrain']);

export const getModelSwitchState = state =>
  state.getIn(['pages', 'Train', 'modelSwitch']);
