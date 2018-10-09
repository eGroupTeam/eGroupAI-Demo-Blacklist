export const getUIState = state => state.getIn(['Welcome', 'ui']);

export const getModelTrainState = state =>
  state.getIn(['Welcome', 'modelTrain']);

export const getModelSwitchState = state =>
  state.getIn(['Welcome', 'modelSwitch']);
