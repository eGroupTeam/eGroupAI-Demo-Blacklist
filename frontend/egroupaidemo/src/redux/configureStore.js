import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fromJS } from 'immutable';
import {
  connectRouter,
  routerMiddleware
} from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';

import { componentsEpics, components } from './modules/components';

// root reducer
const rootReducer = combineReducers({
  components
});
// root epic
const rootEpic = combineEpics(componentsEpics);

// initialState
const initialState = fromJS();

// middlewares
const epicMiddleware = createEpicMiddleware();
export const history = createBrowserHistory();

const middleware = [epicMiddleware, routerMiddleware(history)];

// fancy chrome develop tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
export const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// call epicMiddleware.run() with the rootEpic this need to call after createStore()
epicMiddleware.run(rootEpic);
