import React, { useContext } from 'react';
import { UserContext } from '../App';
import './Sidebar.css';

export const SidebarHeader = ({user}) => {
  const userContext = useContext(UserContext);
  return (
    <div className="sidebar-header">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="33.297px" height="33.277px" viewBox="0 0 33.297 33.277" style={{enableBackground: 'new 0 0 33.297 33.277'}}
        xmlSpace="preserve">
        <rect x="0.428" style={{fill: '#35B0E4'}} width="7.582" height="7.458"/>
        <rect x="12.734" style={{fill: '#35B0E4'}} width="7.582" height="7.458"/>
        <rect x="25.288" style={{fill: '#35B0E4'}} width="7.582" height="7.458"/>
        <rect y="12.768" style={{fill: '#35B0E4'}} width="8.01" height="7.879"/>
        <rect x="25.287" y="12.768" style={{fill: '#35B0E4'}} width="8.01" height="7.879"/>
        <rect x="11.799" y="11.848" style={{fill: '#FFFFFF'}} width="9.789" height="9.627"/>
        <rect x="0.428" y="25.819" style={{fill: '#35B0E4'}} width="7.582" height="7.458"/>
        <rect x="12.734" y="25.819" style={{fill: '#35B0E4'}} width="7.582" height="7.458"/>
        <rect x="25.288" y="25.819" style={{fill: '#35B0E4'}} width="7.582" height="7.458"/>
      </svg>

      <h2>SCALA COMPUTING</h2>

      <div className="user-logo-wrapper">
        { !!userContext.user && <img src={userContext.logo} alt={`${userContext.user}-logo`}/> }
      </div>
    </div>
);
};