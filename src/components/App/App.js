import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { injectGlobal } from 'styled-components';
import WrappedLoginForm from '../../components/NewLogin/Login';
import WrappedSignupForm from '../../components/NewLogin/Signup';

// import SignupPage from '../../components/SignupPage/SignupPage';
import HomePage from '../../pages/HomePage/HomePage';
import Location from '../../pages/Location/Location';
import DashBoardPage from '../../containers/DashBoardPage';
import Header from '../Header/Header';

export const global = injectGlobal`
  body {
    font-family: roboto;
    margin: 0;
  }
`;

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={WrappedLoginForm} />
          <Route path="/signup" component={WrappedSignupForm} />

          {/* <Route path="/signup" component={SignupPage} /> */}
          <Route path="/location" component={Location} />
          <Route exact path="/dashboard" component={DashBoardPage} />
          <Route component={() => <h1>Oops.. page not found</h1>} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </Router>
);
export default App;
