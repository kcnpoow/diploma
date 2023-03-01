import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { auth } from './store/slices/user.slice.js';
import CoursesPage from './pages/courses.page.jsx';
import SettingsPage from './pages/settings.page/index.jsx';
import PrivateRoute from './components/private.route.jsx';
import ProtectedRoute from './components/protected-route.jsx';
import LoginPage from './pages/login.page.jsx';
import RegisterPage from './pages/register.page/index.jsx';
import CircleLoader from './components/circle-loader.jsx';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  html, body, #app {
    height: 100%;
  }

  body {
    min-width: 15rem;
  }

  button {
    background-color: transparent;
    border: none;
  }

  ul, ol {
  list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const response = await dispatch(auth());

      if (response.payload && response.payload.accessToken) {
        localStorage.setItem('accessToken', response.payload.accessToken);
      }
    })();
  }, []);

  if (user.isLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center position-absolute top-0 bottom-0 start-0 end-0'>
        <CircleLoader
          loaderSize={100}
          lineWidth={10}
          thumbColor='#0d6efd'
          truckColor='#eeeeee'
        />
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <CoursesPage />
            </PrivateRoute>
          }
        />
        <Route
          path='settings'
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='login'
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='register'
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
