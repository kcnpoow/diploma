import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { auth, logout } from './store/slices/userSlice.js';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import SettingsPage from './pages/SettingsPage/index.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CircleLoader from './components/CircleLoader/index.jsx';
import './style.css';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleUnload = async () => {
    const rememberPassword = sessionStorage.getItem('rememberPassword');

    if (rememberPassword === 'false') {
      dispatch(logout());
    }
  };

  useEffect(() => {
    dispatch(auth());

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  if (isLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center w-100 h-100'>
        <CircleLoader size={100} />
      </div>
    );
  }

  return (
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
        path='courses'
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
  );
};

export default App;
