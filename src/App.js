import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import ThemeConfig from './config/theme';
import AbsentRequest from './components/absentRequest';
import AbsentRequestFormContextProvider from './components/absentRequestForm/absentFormContext/absentContextProvider';

function App() {
  const Theme = createTheme(ThemeConfig);
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={AbsentRequest} />
            <Route path="/request-form" component={AbsentRequestFormContextProvider} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
