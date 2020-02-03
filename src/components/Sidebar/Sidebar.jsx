import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Box } from '@material-ui/core';
import './Sidebar.css';

//list icons
import ListIcon from '@material-ui/icons/List';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MemoryIcon from '@material-ui/icons/Memory';
import CodeIcon from '@material-ui/icons/Code';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PowerIcon from '@material-ui/icons/Power';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import BuildIcon from '@material-ui/icons/Build';
import { ContactSupportButton } from './ContactSupportButton';

const navLinks = [
  { title: "JOBS", icon: <ListIcon color="primary"/>},
  { title: "FILES", icon: <FileCopyIcon color="primary"/>},
  { title: "WORKFLOWS", icon: <MemoryIcon color="primary"/>},
  { title: "PRESETS", icon: <BuildIcon color="primary"/>},
  { title: "SOFTWARE", icon: <CodeIcon color="primary"/>},
  { title: "USAGE", icon: <EqualizerIcon color="primary"/>},
  { title: "CONNECTIONS", icon: <PowerIcon color="primary"/>},
  { title: "DESKTOPS", icon: <DesktopWindowsIcon color="primary"/>}
];

export const Sidebar = () => {
  return (
    <Box 
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bgcolor="rgb(46,80,122)"
      style={{ background: "linear-gradient(180deg, rgba(46,80,122,1) 48%, rgba(6,25,47,1) 100%)"}}
    >
      <SidebarHeader/>
      <nav>
        <ol>
          { navLinks.map(l => (
            <li key={l.title}>
              {l.icon}
              <a href={`/${l.title.toLowerCase()}`}>
                {l.title} 
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <SidebarFooter/>
    </Box>
  );
};

const SidebarHeader = ({user}) => {
  const userContext = useContext(UserContext);
  return (
    <Box mb="3em" justifySelf="flex-start">
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

      <h2>SCALA<br/>COMPUTING</h2>

      <div className="user-logo-wrapper">
        { !!userContext.user && <img src={userContext.logo} alt={`${userContext.user}-logo`}/> }
      </div>
    </Box>
  );
};

const SidebarFooter = () => {
  const currentYear = new Date().getFullYear(); 
  return (
    <div className="sidebar-footer">
      <ContactSupportButton/>
      <div className="copyright-text">
        <p>Copyright &copy; {currentYear}, Scala Computing Inc.</p>
      </div>
    </div>
  )
}

