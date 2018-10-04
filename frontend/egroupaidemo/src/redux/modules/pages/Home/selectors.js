export const getIsStarted = state =>
  state.getIn(['pages', 'Home', 'isStarted']);

export const getResult = state => state.getIn(['pages', 'Home', 'result']);
