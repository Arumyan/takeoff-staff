import React, { useEffect } from 'react';
import './App.scss';

import Login from './pages/Login/Login';
import Contacts from './pages/Contacts/Contacts';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from 'react-bootstrap';

import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk, setAuthActionCreator } from './redux/reducers/authReducer';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authReducer);

  const logout = () => {
    dispatch(logoutThunk());
  };

  const getСookie = (cookie_name) => {
    var results = document.cookie.match(
      '(^|;) ?' + cookie_name + '=([^;]*)(;|$)'
    );

    if (results) return unescape(results[2]);
    else return null;
  }

  useEffect(() => {
    if(getСookie('userIsAuth')) {
      dispatch(setAuthActionCreator({isAuth: true}));
    };
  }, []);

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand>Takeoff Staff</Navbar.Brand>
        {isAuth && (
          <Button
            className='ml-auto'
            variant='outline-success'
            onClick={logout}
          >
            Выйти
          </Button>
        )}
      </Navbar>

      <div className='app-content'>
        <Switch>
          <Route path='/' exact component={Contacts}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='*' component={PageNotFound}></Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
