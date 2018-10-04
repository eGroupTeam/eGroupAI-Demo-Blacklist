import {
  fetchGetBlackWhite,
  fetchGetBlackWhiteRequest,
  fetchGetBlackWhiteSuccess,
  fetchGetBlackWhiteFailure
} from './actions';

export const FETCH_GET_BLACK_WHITE = fetchGetBlackWhite().type;
export const FETCH_GET_BLACK_WHITE_REQUEST = fetchGetBlackWhiteRequest().type;
export const FETCH_GET_BLACK_WHITE_SUCCESS = fetchGetBlackWhiteSuccess().type;
export const FETCH_GET_BLACK_WHITE_FAILURE = fetchGetBlackWhiteFailure().type;
