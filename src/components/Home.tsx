import { Button, Container } from '@material-ui/core';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { forceLogout } from '../services/interceptors';

export function Home() {
  return (
    <Container component="main">
      <h1>HOME</h1>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <br />
      <Switch>
        <Route path="/" exact={true}>
          <ul>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/detail">Detail</Link>
            </li>
          </ul>
        </Route>
        <Route path="/list">
          <br />
          List Component
        </Route>
        <Route path="/detail">
          <br />
          Detail Component
        </Route>
      </Switch>
    </Container>
  );

  function handleLogout() {
    forceLogout();
  }
}
