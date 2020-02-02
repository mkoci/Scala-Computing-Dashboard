import React from 'react';
import { SidebarHeader } from './SidebarHeader';
import './Sidebar.css';

const navLinks = [
  { title: "JOBS", icon: ""},
  { title: "FILES", icon: ""},
  { title: "WORKFLOWS", icon: ""},
  { title: "PRESETS", icon: ""},
  { title: "SOFTWARE", icon: ""},
  { title: "USAGE", icon: ""},
  { title: "CONNECTIONS", icon: ""},
  { title: "DESKTOPS", icon: ""}
];

export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <SidebarHeader/>
      <nav>
        <ol>
          { navLinks.map(l => (
            <li key={l.title}>
              <a href={`/${l.title.toLowerCase()}`}>
                {l.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
