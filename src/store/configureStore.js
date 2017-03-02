import { createStore, applyMiddleware, compose } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'

const loggerMiddleware = createLogger();

export default function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, loggerMiddleware, reduxImmutableStateInvariant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
