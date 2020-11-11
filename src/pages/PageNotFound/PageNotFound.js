import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Jumbotron>
      <h1 className="text-center">404 Page Not Found</h1>
      <p className="text-center">
        <NavLink to='/'>На главную</NavLink>
      </p>
    </Jumbotron>
  );
};

export default PageNotFound;
