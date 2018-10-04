export const getIsStarted = state =>
  state.getIn(['components', 'Recognition', 'isStarted']);

export const getResult = state => state.getIn(['components', 'Recognition', 'result']);
