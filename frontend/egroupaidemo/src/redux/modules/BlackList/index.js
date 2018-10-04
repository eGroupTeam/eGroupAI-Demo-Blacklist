import { createFetchGetReducer } from '@e-group/frontend-utils';

import {
  FETCH_GET_BLACK_WHITE,
  FETCH_GET_BLACK_WHITE_REQUEST,
  FETCH_GET_BLACK_WHITE_SUCCESS,
  FETCH_GET_BLACK_WHITE_FAILURE
} from './types';

const reducer = createFetchGetReducer(
  {
    take: FETCH_GET_BLACK_WHITE,
    request: FETCH_GET_BLACK_WHITE_REQUEST,
    success: FETCH_GET_BLACK_WHITE_SUCCESS,
    failure: FETCH_GET_BLACK_WHITE_FAILURE
  },
  {},
  {
    data: []
  }
);

export default reducer;
