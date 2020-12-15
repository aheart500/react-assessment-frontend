import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import {Provider} from 'react-redux'
import store from './redux/store';
import theme from './theme'
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);


