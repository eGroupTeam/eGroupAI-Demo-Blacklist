import { of, concat } from 'rxjs';
import { switchMap, flatMap, catchError, delay, mapTo } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { getApi } from 'utils';
import {
  WAIT_USER_TO_TRAIN,
  STOP_RETRIVE_FACES,
  FETCH_POST_MODEL_TRAIN,
  FETCH_POST_MODEL_SWITCH
} from './types';
import {
  fetchPostModelTrain,
  fetchPostModelTrainRequest,
  fetchPostModelTrainSuccess,
  fetchPostModelTrainFailure,
  fetchPostModelSwitch,
  fetchPostModelSwitchRequest,
  fetchPostModelSwitchSuccess,
  fetchPostModelSwitchFailure,
  startRetriveFaces,
  showRetrivedFaces,
  trainProcessFinish
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
            trainProcessFinish()
          ]),
          catchError(error => of(fetchPostModelSwitchFailure(error)))
        )
      )
    )
  );

export const waitUserToTrainEpic = (action$, state$) =>
  action$.pipe(
    ofType(WAIT_USER_TO_TRAIN),
    delay(3000),
    mapTo(startRetriveFaces())
  );

export const stopRetriveFacesEpic = (action$, state$) =>
  action$.pipe(
    ofType(STOP_RETRIVE_FACES),
    flatMap(action => {
      if (state$.value.getIn(['components', 'Train', 'ui', 'isAutoTrain'])) {
        return [
          fetchPostModelTrain({
            trainName: action.payload,
            // scenarioType a unchangeable param detail here http://egroup-eds-env.d2mnbckxqi.ap-northeast-1.elasticbeanstalk.com/dashboard/flow/aea8cdd4df534fcd88319783c44f3024/2018-08-21T03:04:51.972Z
            scenarioType: '1',
            blackStatus: state$.value.getIn([
              'components',
              'Train',
              'ui',
              'blackStatus'
            ]),
            imagePathList: state$.value
              .getIn(['components', 'Train', 'ui', 'retrivedFaces'])
              .map(value => value.frameFacePath)
              .toJS()
          })
        ];
      } else {
        return [showRetrivedFaces()];
      }
    })
  );

export default combineEpics(
  waitUserToTrainEpic,
  stopRetriveFacesEpic,
  fetchPostModelTrainEpic,
  fetchPostModelSwitchEpic
);
