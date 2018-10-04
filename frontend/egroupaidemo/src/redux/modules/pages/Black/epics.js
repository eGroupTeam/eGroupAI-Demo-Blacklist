import { of, concat } from 'rxjs';
import { switchMap, flatMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { Map } from 'immutable';

import { getApi } from 'utils';
import { FETCH_GET_BLACK_WHITE } from './types';
import {
  fetchGetBlackWhiteRequest,
  fetchGetBlackWhiteSuccess,
  fetchGetBlackWhiteFailure
} from './actions';

export const fetchGetBlackWhiteEpic = action$ =>
  action$.pipe(
    ofType(FETCH_GET_BLACK_WHITE),
    switchMap(action =>
      concat(
        of(fetchGetBlackWhiteRequest()),
        getApi(action.payload, 'fetchGetBlackWhite').pipe(
          flatMap(response => {
            let data = Map(response.data);
            data = data.map(value => ({
              ...value,
              frameFacePath: value.frameFacePath.replace(/^.*[\\/]/, ''),
              framePath: value.framePath.replace(/^.*[\\/]/, '')
            }));
            return [fetchGetBlackWhiteSuccess(data)];
          }),
          catchError(error => of(fetchGetBlackWhiteFailure(error)))
        )
      )
    )
  );

export default combineEpics(fetchGetBlackWhiteEpic);
