import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom' // Import useNavigate hook
import { AuthContext } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import FormInput from '../components/FormInput'
import '../index.css'

const LoginPage = () => {
  const { isLoggedIn, login } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorRegister, setErrorRegister] = useState('')
  const navigate = useNavigate() // Use useNavigate hook for redirection

  const handleLogin = async () => {
    setLoading(true)
    setErrorRegister('')

    try {
      await login(username, password)
      navigate('/profile') // Redirect to dashboard on successful login
    } catch (error) {
      console.error('Error logging in:', error)
      setErrorRegister('Wystąpił błąd podczas logowania. Spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoggedIn) {
    return (
      <p className="flex justify-center text-white">Jesteś już zalogowany.</p>
    ) // Or redirect to another page
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="bg-bgs p-8 rounded shadow-md w-96 mt-4">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Logowanie</h2>
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
            type="submit"
            className="w-full p-2 rounded bg-primary text-primary-foreground"
            onClick={handleLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logowanie...' : 'Login'}
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
              errorRegister === 'Witamy!' ? 'text-primary' : 'text-destructive'
            }`}
          >
            {errorRegister}
          </p>
        )}
        <p className="mt-4 text-gray-300 text-sm">
          <Link
            to="/forgot-password"
            className="text-err hover:underline hover:text-primary"
          >
            Nie pamiętasz hasła?
          </Link>
        </p>
        <p className="mt-4 text-sm">
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
