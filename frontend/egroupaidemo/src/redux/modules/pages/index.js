import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';

import Home from './Home';
import Black from './Black';
import BlackEpics from './Black/epics';
import White from './White';
import WhiteEpics from './White/epics';
import Train from './Train';
import TrainEpics from './Train/epics';

export const pagesEpics = combineEpics(TrainEpics, BlackEpics, WhiteEpics);

export const pages = combineReducers({
  Home,
  Train,
  Black,
  White
});
