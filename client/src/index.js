import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {createStore, applyMiddleware, compose} from "redux"
import {Provider} from 'react-redux'
import reducer, {getQuizzes} from './modules/reducer'

const handleAsync = reduxApi => next => action => {
    if (typeof action === 'function') {
        return action(reduxApi.dispatch, reduxApi.getState)
    }
    next(action)
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(handleAsync)))
store.dispatch(getQuizzes())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
)