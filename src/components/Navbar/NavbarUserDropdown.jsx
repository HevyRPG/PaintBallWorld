import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AuthContext } from '../../context/AuthContext'
import Cookies from 'js-cookie'

export function DropdownMenuDemo() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const role = Cookies.get('role')
  const isOwner = role === 'Owner'
  useEffect(() => {
    if (
      !Cookies.get('role') ||
      !Cookies.get('username') ||
      !Cookies.get('authToken')
    ) {
      logout()
      navigate('/')
    }

    const interval = setInterval(() => {
      if (
        !Cookies.get('role') ||
        !Cookies.get('username') ||
        !Cookies.get('authToken')
      ) {
        logout()
        navigate('/')
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [logout, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
          fill="white"
          className="hover:cursor-pointer"
        >
          <title>chevron-down</title>
          <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
        {isOwner && (
          <>
            <DropdownMenuSeparator />
            <Link to="/dashboard">
              <DropdownMenuItem className="text-primary">
                Dashboard
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem>Profil</DropdownMenuItem>
        </Link>
        <Link to="/edit-profile">
          <DropdownMenuItem>Ustawienia konta</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red">
          Wyloguj
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
