import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import store from './store/index.js';
import App from './app.jsx';

const $container = document.getElementById('app');
const root = createRoot($container);

axios.defaults.baseURL = 'http://localhost:1111';

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
