import React from 'react';
import { SidebarHeader } from './SidebarHeader';
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
import { Box, ResponsiveDrawer } from '@material-ui/core';

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
    <ResponsiveDrawer anchor="left">
      <Box 
        height="100%"
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
      </Box>
    </ResponsiveDrawer>
  );
};
