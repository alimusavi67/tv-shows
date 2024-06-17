import React from 'react';
import TimeZoneSelector from '../../TimeZoneSelector/TimeZoneSelector';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-800 text-white flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center text-2xl font-bold">
        <a href="/">TV Shows DB</a>
      </div>
      <TimeZoneSelector />
    </header>
  );
};

export default Header;
