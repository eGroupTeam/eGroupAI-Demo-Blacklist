import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';

import Recognition from './Recognition';
import BlackList from './BlackList';
import BlackListEpics from './BlackList/epics';
import WhiteList from './WhiteList';
import WhiteListEpics from './WhiteList/epics';
import Train from './Train';
import TrainEpics from './Train/epics';

export const componentsEpics = combineEpics(TrainEpics, BlackListEpics, WhiteListEpics);

export const components = combineReducers({
  Recognition,
  Train,
  BlackList,
  WhiteList
});
