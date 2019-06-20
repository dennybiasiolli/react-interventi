import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';

import { App } from './App';
import './services/interceptors';
import { store } from './store';

const mainComponent = (
  <React.Fragment>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.Fragment>
);

ReactDOM.render(mainComponent, document.getElementById('root'));
