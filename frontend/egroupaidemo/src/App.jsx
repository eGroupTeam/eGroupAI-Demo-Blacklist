import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { store, history } from 'redux/configureStore';

import BasicLayout from 'layouts/BasicLayout';
import ErrorBoundry from 'components/ErrorBoundry';
import moment from 'moment';
import 'moment/locale/zh-tw';

moment.locale(navigator.language.toLowerCase());

const App = () => {
  return (
    <ErrorBoundry>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={BasicLayout} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </ErrorBoundry>
  );
};

export { App };
