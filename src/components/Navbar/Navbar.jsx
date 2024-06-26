import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Button } from '@/components/ui/button'
import NavbarUserView from './NavbarUserView'

const Navbar = () => {
  const location = useLocation()

  const { isLoggedIn, logout } = useContext(AuthContext)

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
      <Link key={path} to={path} className={`mx-4 text-xl ${isActive(path)}`}>
        {label}
      </Link>
    ))
  }

  return (
    <nav className="bg-gray-900 shadow shadow-gray-900 w-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-8 md:flex-row">
        <div className="flex-1 flex justify-start">
          <Link to="/">
            <img className="w-12 h-12" src="./logosm.png" alt="Logo" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center font-semibold">
          {renderNavLinks()}
        </div>
        <div className="flex-1 flex justify-end">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="rounded bg-primary text-primary-foreground mr-2"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost" className="rounded h-10">
                  Zarejestruj się
                </Button>
              </Link>
            </>
          ) : (
            <NavbarUserView />
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
