import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isActive = (path) => {
    return location.pathname === path
      ? 'text-white font-bold'
      : 'text-primary hover:text-white'
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/calendar', label: 'Terminarz' },
    { path: '/about', label: 'O nas' },
  ]

  const renderNavLinks = () => {
    return navLinks.map(({ path, label }) => (
      <li key={path} className="md:px-4 md:py-2 hover:text-indigo-400">
        <Link to={path} className={`ml-2 text-xl ${isActive(path)}`}>
          {label}
        </Link>
      </li>
    ))
  }

  const buttonStyles =
    'inline-block px-4 py-2 text-sm font-medium border rounded focus:outline-none '

  return (
    <nav className="bg-gray-900 shadow shadow-gray-900 w-full px-8 py-2 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-indigo-500 md:order-1">
          <img className="w-12 h-12" src="./logosm.png" alt="Logo" />
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            {renderNavLinks()}
          </ul>
        </div>
        <div className="order-2 md:order-3">
          <Link
            to="/login"
            className={`${buttonStyles} text-white bg-violet-600 border-violet-600 active:text-violet-500 hover:bg-transparent hover:text-violet-600 ${isActive(
              '/'
            )}`}
          >
            Login
          </Link>
          <Link
            to="/dashboard"
            className={`${buttonStyles} ml-4 text-violet-600 border-violet-600 hover:bg-violet-600 hover:text-white active:bg-indigo-500 ${isActive(
              '/'
            )}`}
          >
            Profil
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
