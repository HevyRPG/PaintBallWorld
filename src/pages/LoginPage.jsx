import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../components/auth'
import APIHeaders from '../components/APIHeaders'
import { Button } from '@/components/ui/button'
import FormInput from '../components/FormInput'
import '../index.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorRegister, setErrorRegister] = useState('')

  console.log(isLoggedIn())

  const handleLogin = async (e) => {
    setLoading(true)
    setErrorRegister('')

    console.log('Logging in with:', { username, password })
    try {
      const response = await axios.post(
        '/api/Auth/Login/Login',
        { username, password },
        APIHeaders
      )
      const token = response.data.token
      localStorage.setItem('token', token)
      console.log('token:', token)
      window.location.href = '/'
      if (response.status === 200) {
        setErrorRegister('Witamy!')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      if (error.response && error.response.status === 400) {
        // Extract error messages from the response
        const { data } = error.response
        if (data && data.errors) {
          const errorMessages = data.errors
            .map((error) => error.description)
            .join(', ')
          setErrorRegister(errorMessages)
        } else {
          setErrorRegister('Wystąpił błąd podczas logowania. Spróbuj ponownie.')
        }
      } else {
        setErrorRegister('Wystąpił błąd podczas logowania. Spróbuj ponownie.')
      }
    } finally {
      // Set loading to false after request completes
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="bg-bgs p-8 rounded shadow-md w-96 mt-4">
        {isLoggedIn() ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-primary">
              Logowanie
            </h2>
            <form>
              <FormInput
                label="Nazwa użytkownika"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormInput
                label="Hasło"
                type="password"
                name="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="outline"
                type="button"
                className="w-full p-2 rounded bg-primary text-primary-foreground"
                onClick={handleLogin}
              >
                Login
              </Button>
            </form>
            {loading && (
              <div className="flex justify-center mt-2">
                <div className="loader"></div>
              </div>
            )}
            {errorRegister && (
              <p
                className={`mt-2 text-sm ${
                  errorRegister === 'Witamy!'
                    ? 'text-primary'
                    : 'text-destructive'
                }`}
              >
                {errorRegister}
              </p>
            )}
            <p className="mt-4 text-gray-300 text-sm">
              <Link
                to="/register"
                className="text-err hover:underline hover:text-primary"
              >
                Nie pamiętasz hasła?
              </Link>
            </p>
            <p className="mt-4  text-sm">
              <Link
                to="/register"
                className="text-primary hover:underline hover:text-primary"
              >
                Utwórz konto
              </Link>
            </p>
          </div>
        ) : (
          <p className="flex justify-center text-white">Panie co pan?</p>
        )}
      </div>
    </div>
  )
}

export default LoginPage
