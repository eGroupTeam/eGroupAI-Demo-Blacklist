import _get from 'lodash/get';
import * as apis from 'api';
import { createObservableApi } from '@e-group/frontend-utils';

/**
 * Create observable api
 * @param {any} payload
 * @param {string} apiName
 */
export default function getApi(payload, apiName) {
  const api = _get(apis, apiName);
  if (api) {
    return createObservableApi(payload, api);
  }
  throw new Error(
    `Undefined api name "${apiName}" please check you have this api.`
  );
}
