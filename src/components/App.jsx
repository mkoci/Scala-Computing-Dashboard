import React, { useState } from 'react';
import './App.css';
import { Sidebar } from './Sidebar/Sidebar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary:{ main: '#35B0E4'},
    secondary: { main: '#8CD5DF'},
  }
});

//Context for current User
export const UserContext = React.createContext({});

export const App = () => {
  const [userContext] = useState({
    user: 'skynext',
    logo: 'https://www.skymetweather.com/themes/skymet/images/logo.png'
  });

  return (
    <UserContext.Provider value={{ user: userContext.user, logo: userContext.logo}}>
      <Layout/>
    </UserContext.Provider>
  );
};


const Layout = () => (
  <ThemeProvider theme={theme}>
    <div className="app-container">
      <div className="sidebar-layout">
        <section className="sidebar-section">
          <Sidebar/>
        </section>
        <section className="main-section">
          <div id="main-content"/>
        </section>
      </div>
    </div>
  </ThemeProvider>
);