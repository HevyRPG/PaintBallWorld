import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext' // Adjust the path as necessary
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate() // Use the useNavigate hook
  const { isLoggedIn, logout } = useContext(AuthContext) // Use context to check if user is logged in

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

  const handleLogout = () => {
    logout() // Use logout function from context
    navigate('/') // Redirect to home page after logout
  }

  return (
    <nav className="bg-gray-900 shadow shadow-gray-900 w-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-8 md:flex-row">
        <div className="flex-1 flex justify-start">
          <img className="w-12 h-12" src="./logosm.png" alt="Logo" />
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
            <>
              <Link to="/profile">
                <Button
                  variant="default"
                  className="mr-4 rounded bg-secondary text-primary hover:bg-white"
                >
                  Profil
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="rounded"
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
