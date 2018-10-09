import { fromJS, set } from 'immutable';
import { handleActions } from 'redux-actions';
import { TOGGLE_RECOGNIZE, SET_RESULT } from './types';

const reducer = handleActions(
  {
    [TOGGLE_RECOGNIZE]: state =>
      set(state, 'isStarted', !state.get('isStarted')),
    [SET_RESULT]: (state, action) => set(state, 'result', action.payload)
  },
  fromJS({
    isStarted: false,
    result: []
  })
);

export default reducer;
