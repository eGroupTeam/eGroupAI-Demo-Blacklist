import { handleActions } from 'redux-actions';
import { fromJS, merge, set } from 'immutable';

import {
  HANDLE_CHANGE,
  HANDLE_TOGGLE_SETTINGS
} from './types';

const reducer = handleActions(
  {
    [HANDLE_CHANGE]: (state,action) =>
      merge(state, action.payload),
    [HANDLE_TOGGLE_SETTINGS]: (state) =>
    state.set('openSettings', !state.get('openSettings')),
  },
  fromJS({
    threshold: 0.7,
    resolution: '720p',
    cam: 0,
    rtspURL: '',
    minimumFaceSize: 100,
    isHideMainWindow: true,
    threads: 2,
    openSettings: true,

    videoWidth: 1280,
    videoHeight: 720,
  })
);

export default reducer;
