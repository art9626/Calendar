import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import { authActions } from './redux/reducers/auth/authActions';
import { getIsAuth } from './redux/reducers/auth/authSelectors';
import { RouteNames } from './routes/routes';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(authActions.setAuth(true))
      dispatch(authActions.setUser({ 
        username: localStorage.getItem('username') || '', 
        password: localStorage.getItem('password') || '',
      }))
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainLayout isAuth={isAuth} />}>
        <Route index element={isAuth ? <Navigate to={RouteNames.CALENDAR_PAGE} /> : <Navigate to={RouteNames.LOGIN} />} />
        <Route path={RouteNames.CALENDAR_PAGE} element={isAuth ? <CalendarPage /> : <Navigate to={`/${RouteNames.LOGIN}`} />} />
        <Route path={RouteNames.LOGIN} element={isAuth ? <Navigate to={`/${RouteNames.CALENDAR_PAGE}`} /> : <LoginPage />} />
        <Route path='*' element={<div>404 Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
