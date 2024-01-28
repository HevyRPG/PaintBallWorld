import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-white font-bold' : 'text-primary hover:text-white';
  };

  return (
    <nav className="flex items-center justify-between max-w-screen-xl border-b mx-auto py-4 px-4 lg:px-8">
      <div className="flex items-center">
        <span className="font-semibold text-xl tracking-tight text-white">PW</span>
      </div>

      <div className="hidden lg:flex items-center">
        <ul className="flex items-center">
          <li className="mx-4">
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li className="mx-4">
            <Link to="/calendar" className={isActive('/calendar')}>
              Calendar
            </Link>
          </li>
          <li className="mx-4">
            <Link to="/about" className={isActive('/about')}>
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <Link to="/login" className="text-sm px-4 py-2 leading-none border rounded text-primary border-primary hover:bg-secondary hover:text-white hover:border-secondary mx-1">
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
