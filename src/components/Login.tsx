import { Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FormEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { getUserInfo, login } from '../services/rest';

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(1),
    width: '100%' // Fix IE 11 issue.
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function LoginBase({ history }: RouteComponentProps) {
  const [state, setState] = React.useState({
    password: '',
    username: ''
  });
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <h1>Login</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="username"
            name="username"
            label="Username"
            value={state.username}
            onChange={handleChange}
            autoFocus={true}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="password"
            type="password"
            name="password"
            label="Password"
            value={state.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );

  function handleChange(event: any) {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await login(state.username, state.password);
      await getUserInfo();
      if (res) {
        history.push('/');
      }
    } catch {
      // tslint:disable-next-line: no-empty
    }
  }
}

export const Login = withRouter(LoginBase);
