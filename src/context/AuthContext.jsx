import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import APIHeaders from '../components/APIHeaders' // Importing your APIHeaders

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isChecking, setIsChecking] = useState(true) // add a state to indicate the checking process

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get('authToken')
      setIsLoggedIn(!!token)
      setIsChecking(false) // set it to false after checking the auth status
    }

    checkAuthStatus()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        '/api/Auth/Login/Login',
        { username, password }, // This is the correct place for the payload
        APIHeaders // Directly use APIHeaders here as the configuration
      )

      const token = response.data.token
      // Store token in cookies with security flags
      Cookies.set('authToken', token, {
        expires: 1,
        secure: true,
        sameSite: 'Strict',
      })
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Error logging in:', error)
      setIsLoggedIn(false)
      throw error // Re-throw the error for handling in the component
    }
  }

  const logout = () => {
    // Remove token from cookies
    Cookies.remove('authToken')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
