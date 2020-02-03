import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Sidebar } from './Sidebar/Sidebar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export const UserContext = React.createContext({});

export const App = () => {
  //init base context for user.
  const [userContext] = useState({
    user: 'skynext',
    logo: 'https://www.skymetweather.com/themes/skymet/images/logo.png'
  });
  return (
    <Router>
      <UserContext.Provider value={{ user: userContext.user, logo: userContext.logo}}>
        <Layout/>
      </UserContext.Provider>
    </Router>
  );
};

const Layout = () => (
  <ThemeProvider theme={theme}>
    <div className="app-container">
      <div className="sidebar-layout">
        <section className="sidebar-section">
          <Sidebar/>
        </section>
        <section className="sidebar-placeholder"/>
        <section className="main-section" id="main-section">
          <UserBar/>
          <Routing/>        
        </section>
      </div>
    </div>
  </ThemeProvider>
);

const Routing = () => (
  <Switch>
    <Route path="/files" render={() => {
      if(!!window.loadFileScript) window.loadFileScript.exec();
      return null
    }}/>
    <Route render={() => {
      if(window.loadFileScript.invoked) window.loadFileScript.exit();
      return <NotFound/>
    }}/>
  </Switch>
)

const UserBar = () => {
  const userContext = useContext(UserContext);
  return (
    <div className="user-bar">
      <div className="user-dropdown">
        <span>{userContext.user}</span>
      </div>
    </div>
)}

// Set material-ui default params
const theme = createMuiTheme({
  palette: {
    primary:{ main: '#35B0E4'},
    secondary: { main: '#8CD5DF'},
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        height: '1.5em',
        width: '1.5em',
        verticalAlign: 'middle'
      }
    }
  }
});

const NotFound = () => (
  <div className="not-found">
    <h1>Sorry, this route is under construction. Check back soon</h1>
  </div>
)