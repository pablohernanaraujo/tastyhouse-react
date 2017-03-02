import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import InicioPage from './components/inicio/InicioPage'
import PrivatePage from './components/private/PrivatePage'
import requireAuth from './utils/requireAuth'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={InicioPage} />
    <Route path="private" component={requireAuth(PrivatePage)} />
  </Route>
);
