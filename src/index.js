import React from 'react'
import { render } from 'react-dom'
import { Router, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { Provider } from 'react-redux'

import routes from './routes'
import configureStore from './store/configureStore'
import { getAuth } from './actions/Auth'

const store = configureStore();
const appHistory = useRouterHistory(createHashHistory)();
const Root = document.getElementById('root');

store.dispatch(getAuth());

render(
  <Provider store={store}>
    <Router history={appHistory} routes={routes} />
  </Provider>
  ,Root
);
