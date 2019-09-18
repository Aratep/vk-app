import 'core-js/es6/map';
import 'core-js/es6/set';
import { Provider } from "react-redux";
import { createStore } from "redux";
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
import registerServiceWorker from './sw';

import reducers from "./reducers";
// Init VK App
connect.send('VKWebAppInit', {});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Service Worker For Cache
registerServiceWorker();
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'));
