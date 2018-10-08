import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { TOGGLE_RECOGNIZE, SET_RESULT } from './types';

const reducer = handleActions(
  {
    [TOGGLE_RECOGNIZE]: (state, action) =>
      state.set('isStarted', !state.get('isStarted')),
    [SET_RESULT]: (state, action) => state.set('result', action.payload)
  },
  fromJS({
    isStarted: false,
    result: []
  })
);

export default reducer;
