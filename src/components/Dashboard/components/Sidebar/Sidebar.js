import React from 'react';
import UserProfile from './UserProfile';
import Navigation from './Navigation';

const Sidebar = ({ section, setSection }) => {
  return (
    <div className="sidebar">
      <UserProfile setSection={setSection} />
      <Navigation section={section} setSection={setSection} />
    </div>
  );
};

export default Sidebar;
