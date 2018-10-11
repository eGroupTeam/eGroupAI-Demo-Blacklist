import { of, concat } from 'rxjs';
import { switchMap, flatMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { getApi } from 'utils';
import {
  FETCH_POST_MODEL_TRAIN,
} from './types';
import {
  fetchPostModelTrainRequest,
  fetchPostModelTrainSuccess,
  fetchPostModelTrainFailure,
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
          ]),
          catchError(error => of(fetchPostModelTrainFailure(error)))
        )
      )
    )
  );

export default combineEpics(
  fetchPostModelTrainEpic
);
