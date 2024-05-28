import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import APIHeaders from '../components/APIHeaders'
import APIKEYS from '../components/APIKEYS'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get('authToken')
      setIsLoggedIn(!!token)
      setIsChecking(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (username, password) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(
        `${apiUrl}/api/Auth/Login`,
        { username, password },
        APIHeaders
      )

      const token = response.data.token
      const role = response.data.role

      Cookies.set('authToken', token, {
        expires: 3,
        secure: false,
        sameSite: 'Strict',
      })
      Cookies.set('role', role, {
        expires: 3,
        secure: false,
        sameSite: 'Strict',
      })
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Error logging in:', error)
      setIsLoggedIn(false)
      throw error
    }
  }

  const logout = () => {
    Cookies.remove('authToken')
    Cookies.remove('role')
    Cookies.remove('username')
    setIsLoggedIn(false)
  }

  const deleteAccount = async () => {
    try {
      const token = Cookies.get('authToken')
      const username = Cookies.get('username')

      await axios.delete(`${apiUrl}/api/Auth/Login`, {
        headers: {
          ...APIKEYS.headers,
          Authorization: `Bearer ${token}`,
        },
        data: {
          username: username,
        },
      })

      logout()
      navigate('/')
    } catch (error) {
      console.error('Błąd podczas usuwania konta:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isChecking, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  )
}
