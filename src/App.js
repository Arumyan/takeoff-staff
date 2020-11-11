import React from 'react';
import './App.scss';

import Login from './pages/Login/Login';
import Contacts from './pages/Contacts/Contacts';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from 'react-bootstrap';

import { Switch, Route } from 'react-router-dom';

const App = () => {

  return (
    <>
      <Navbar bg='light'>
        <Navbar.Brand>Takeoff Staff</Navbar.Brand>
        <Button
          className='ml-auto'
          variant='outline-success'
        >
          Войти
        </Button>
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
