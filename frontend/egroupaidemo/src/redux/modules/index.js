import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';

import Recognition from './Recognition';
import Welcome from './Welcome';
import WelcomeEpics from './Welcome/epics';
import BlackList from './BlackList';
import BlackListEpics from './BlackList/epics';
import WhiteList from './WhiteList';
import WhiteListEpics from './WhiteList/epics';
import Train from './Train';
import TrainEpics from './Train/epics';
import EngineSettings from './EngineSettings';

export const rootEpic = combineEpics(WelcomeEpics, TrainEpics, BlackListEpics, WhiteListEpics);

export const rootReducer = combineReducers({
  Recognition,
  Welcome,
  Train,
  BlackList,
  WhiteList,
  EngineSettings
});
