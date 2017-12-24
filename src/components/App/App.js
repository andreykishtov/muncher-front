import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { injectGlobal } from 'styled-components';
import WrappedLoginForm from '../../components/NewLogin/Login';
import WrappedSignupForm from '../../components/NewLogin/Signup';
import HomePage from '../../pages/HomePage/HomePage';
import Location from '../../pages/Location/Location';
import DashBoardPage from '../../containers/DashBoardPage';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';

export const global = injectGlobal`
  body {
    font-family: roboto;
    margin: 0;
  }
`;

const App = () => (
  <Router>
    <LocaleProvider locale={enUS}>
      <MuiThemeProvider>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={WrappedLoginForm} />
            <Route path="/signup" component={WrappedSignupForm} />
            <Route exact path="/location" component={NotFound} />
            <Route path="/location" component={Location} />
            <Route exact path="/dashboard" component={DashBoardPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </LocaleProvider>
  </Router>
);
export default App;
