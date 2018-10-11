import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import moment from 'moment';
// import 'moment/locale/zh-tw';

import { store, history } from 'redux/configureStore';

import EntrancePage from 'components/EntrancePage';
import ErrorBoundry from 'components/ErrorBoundry';
import Welcome from 'components/Welcome';

import BlackListLayout from 'layouts/BlackListLayout';

moment.locale(navigator.language.toLowerCase());

const App = () => {
  return (
    <ErrorBoundry>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={EntrancePage} />
            <Route path="/blacklist-demo" component={BlackListLayout} />
            <Route path="/welcome-demo" component={Welcome} />
            <Route path="*" render={() => (<div>查無頁面</div>)}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    </ErrorBoundry>
  );
};

export { App };
