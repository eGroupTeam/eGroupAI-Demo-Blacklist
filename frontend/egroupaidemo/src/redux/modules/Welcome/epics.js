import { of, concat } from 'rxjs';
import { switchMap, flatMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { getApi } from 'utils';
import {
  FETCH_POST_MODEL_TRAIN,
  FETCH_POST_MODEL_SWITCH
} from './types';
import {
  fetchPostModelTrainRequest,
  fetchPostModelTrainSuccess,
  fetchPostModelTrainFailure,
  fetchPostModelSwitch,
  fetchPostModelSwitchRequest,
  fetchPostModelSwitchSuccess,
  fetchPostModelSwitchFailure,
} from './actions';

export const fetchPostModelTrainEpic = action$ =>
  action$.pipe(
    ofType(FETCH_POST_MODEL_TRAIN),
    switchMap(action =>
      // we can concat observable actions
      // see this comment https://github.com/redux-observable/redux-observable/issues/62#issuecomment-266337873
      concat(
        of(fetchPostModelTrainRequest()),
        getApi(action.payload, 'fetchPostModelTrain').pipe(
          flatMap(response => [
            fetchPostModelTrainSuccess(response.data),
            fetchPostModelSwitch()
          ]),
          catchError(error => of(fetchPostModelTrainFailure(error)))
        )
      )
    )
  );

export const fetchPostModelSwitchEpic = action$ =>
  action$.pipe(
    ofType(FETCH_POST_MODEL_SWITCH),
    switchMap(action =>
      concat(
        of(fetchPostModelSwitchRequest()),
        getApi(action.payload, 'fetchPostModelSwitch').pipe(
          flatMap(response => [
            fetchPostModelSwitchSuccess(response),
          ]),
          catchError(error => of(fetchPostModelSwitchFailure(error)))
        )
      )
    )
  );

export default combineEpics(
  fetchPostModelTrainEpic,
  fetchPostModelSwitchEpic
);
