import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import store from './store/index.js';
import App from './App.jsx';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

axios.defaults.baseURL = 'http://localhost:1111';

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
