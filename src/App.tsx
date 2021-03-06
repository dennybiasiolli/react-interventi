import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { getUserInfo } from './services/rest';
import { RootState } from './store';

const mapStateToProps = (state: RootState) => ({
  userInfo: state.auth.userInfo,
  userInfoLoading: state.auth.userInfoLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

export interface AppProps
  extends ReturnType<typeof mapStateToProps>,
  ReturnType<typeof mapDispatchToProps> { }

// tslint:disable-next-line: function-name
function AppBase({ userInfoLoading, userInfo }: AppProps) {
  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" render={getMainComponent} />
      <Route>404 PAGE NOT FOUND</Route>
    </Switch>
  );

  function getMainComponent() {
    if (userInfoLoading) {
      return <div>LOADING</div>;
    }
    if (userInfo) {
      return <Home />;
    }
    return <Redirect to="/login" />;
  }
}

// tslint:disable-next-line: variable-name
export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBase);
