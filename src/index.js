import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from "./reducers";
import App from "./components/app"

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

function Hello(props) {
  return (
    <div>Hello</div>
  );
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App/>
  </Provider>
  , document.querySelector("#root")
);
