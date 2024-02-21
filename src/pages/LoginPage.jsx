// src/components/LoginPage.js
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with:', { username, password })
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="bg-bgs p-8 rounded shadow-md w-96 mt-4">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Logowanie</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-1">
              Nazwa użytkownika
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-1">
              Hasło
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-[#96DA2B] text-white p-2 rounded hover:bg-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-300 text-sm">
          <Link
            to="/register"
            className="text-err hover:underline hover:text-primary"
          >
            Nie pamiętasz hasła?
          </Link>
        </p>
        <p className="mt-4 text-gray-300 text-sm">
          <Link
            to="/register"
            className="text-primary hover:underline hover:text-primary"
          >
            Utwórz konto
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
