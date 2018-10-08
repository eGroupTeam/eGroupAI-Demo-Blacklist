export const getIsStarted = state =>
  state.getIn(['Welcome', 'isStarted']);

export const getResult = state => state.getIn(['Welcome', 'result']);
