import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {createStore, applyMiddleware, compose} from "redux"
import {Provider} from 'react-redux'
import reducer from './modules/reducer'

const handleAsync = reduxApi => next => action => {
    if (typeof action === 'function') {
        return action(reduxApi.dispatch, reduxApi.getState)
    }
    next(action)
}

const store = createStore(reducer, compose(applyMiddleware(handleAsync)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
)