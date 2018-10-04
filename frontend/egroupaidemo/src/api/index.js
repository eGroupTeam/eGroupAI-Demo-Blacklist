import axios from 'axios';
import queryString from 'query-string';

const fetcher = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export const fetchPostModelTrain = payload =>
  fetcher.post('/model/train', payload);
export const fetchPostModelSwitch = payload =>
  fetcher.post('/model/switch', payload);
export const fetchGetBlackWhite = payload =>
  fetcher.get(`/blackWhite?${queryString.stringify(payload)}`);
