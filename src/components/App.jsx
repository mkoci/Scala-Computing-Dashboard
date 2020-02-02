import React, { useState } from 'react';
import './App.css';
import { Sidebar } from './Sidebar/Sidebar';

export const UserContext = React.createContext({});

export const App = (props) => {
  /* Root state holds user login context

  */
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


function Layout() {
  return (
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
  )
};