export const getIsStarted = state =>
  state.getIn(['Recognition', 'isStarted']);

export const getResult = state => state.getIn(['Recognition', 'result']);
