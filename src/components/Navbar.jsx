import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../components/auth'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const location = useLocation()
  const [shouldReload, setShouldReload] = useState(false)

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
      <div key={path} className="md:px-4 md:py-2 ">
        <Link to={path} className={`ml-2 text-xl ${isActive(path)}`}>
          {label}
        </Link>
      </div>
    ))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setShouldReload((prevState) => !prevState)
  }

  const buttonStyles =
    'inline-block px-4 py-2 text-sm font-medium border rounded focus:outline-none '

  return (
    <nav className="bg-gray-900 shadow shadow-gray-900 w-full px-8 py-2 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex max-w-screen-2xl items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-indigo-500 md:order-1">
          <img className="w-12 h-12" src="./logosm.png" alt="Logo" />
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <div className="flex font-semibold justify-between">
            {renderNavLinks()}
          </div>
        </div>
        <div className="order-2 md:order-3">
          {isLoggedIn() ? (
            <>
              <Link to="/register">
                <Button variant="ghost" size="" className="rounded h-10 mr-2 ">
                  Zarejestruj się
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded bg-primary text-primary-foreground"
                >
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button
                  variant="default"
                  className=" mr-4 rounded bg-secondary text-primary hover:bg-white "
                >
                  Profil
                </Button>
              </Link>
              <Button
                variant="ghost"
                className=" rounded "
                onClick={handleLogout}
              >
                Wyloguj
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
