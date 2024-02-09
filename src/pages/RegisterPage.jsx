import React, { useState } from 'react'
import axios from 'axios'
import '../index.css'
import APIHeaders from '../components/APIHeaders'

const RegisterPage = () => {
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [RepeatPassword, setRepeatPassword] = useState('')
  const [DateOfBirth, setDateOfBirth] = useState('')
  const [registerAsOwner, setRegisterAsOwner] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [nip, setNip] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [fieldAddress, setFieldAddress] = useState('')
  const [errorRegister, setErrorRegister] = useState('')
  const [loading, setLoading] = useState(false) // Add loading state

  const handleOwnerRegister = () => {
    // Add your registration logic here
    console.log('Registering with:', {
      Username,
      Email,
      Password,
      DateOfBirth,
      registerAsOwner,
      companyName,
      businessEmail,
      nip,
      companyPhone,
      companyAddress,
      fieldAddress,
    })
  }

  const handleRegister = async () => {
    // Set loading to true to show spinner
    setLoading(true)

    // Reset error message
    setErrorRegister('')

    // Validation for regular user registration
    if (!Username || !Email || !Password || !DateOfBirth) {
      setErrorRegister('Uzupełnij wszystkie wymagane pola.')
      setLoading(false) // Set loading to false
      return
    }
    if (Password !== RepeatPassword) {
      setErrorRegister('Hasła nie pasują do siebie.')
      setLoading(false) // Set loading to false
      return
    }
    const formattedDateOfBirth = `${DateOfBirth}T00:00:00`
    const userData = {
      Username,
      Email,
      Password,
      DateOfBirth: formattedDateOfBirth,
    }
    console.log('User Data:', JSON.stringify(userData))

    const apitest = await axios.get('/api/ping/ping', APIHeaders)
    console.log(apitest.data)

    try {
      // Send registration request to backend using Axios
      const response = await axios.post(
        '/api/Auth/Register/Register',
        JSON.stringify(userData),
        APIHeaders
      )

      // Check if the response status is OK
      if (response.status === 200) {
        setErrorRegister('Zarejestrowano pomyślnie!')
      }
    } catch (error) {
      // Handle error responses
      if (error.response && error.response.status === 400) {
        // Extract error messages from the response
        const { data } = error.response
        const errorMessages = data.errors
          .map((error) => error.description)
          .join(', ')
        setErrorRegister(errorMessages)
      } else {
        console.error('Error registering user:', error)
      }
    } finally {
      // Set loading to false after request completes
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-bgm p-8">
      <div className="bg-bgs p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          Zarejestruj się
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="Username" className="block text-primary mb-1">
              Nazwa użytkownika
            </label>
            <input
              type="text"
              id="Username"
              className="w-full p-2 border rounded"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-primary mb-1">
              Adres e-mail
            </label>
            <input
              type="email"
              id="Email"
              className="w-full p-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="DateOfBirth" className="block text-primary mb-1">
              Data urodzenia
            </label>
            <input
              type="date"
              id="DateOfBirth"
              className="w-full p-2 border rounded"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-primary mb-1">
              Hasło
            </label>
            <input
              type="password"
              id="Password"
              className="w-full p-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-primary mb-1">
              Powtórz hasło
            </label>
            <input
              type="password"
              id="repeatPassword"
              className="w-full p-2 border rounded"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="text-primary mb-4">
            <label htmlFor="registerAsOwner" className="flex items-center">
              <input
                type="checkbox"
                id="registerAsOwner"
                className="mr-2"
                checked={registerAsOwner}
                onChange={() => setRegisterAsOwner(!registerAsOwner)}
              />
              Zarejestruj się jako właściciel pola Paintballowego
            </label>
          </div>
          {registerAsOwner && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-primary mb-1"
                >
                  Nazwa firmy*
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="businessEmail"
                  className="block text-primary mb-1"
                >
                  Służbowy adres e-mail (Kontaktowy)
                </label>
                <input
                  type="email"
                  id="businessEmail"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setBusinessEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nip" className="block text-primary mb-1">
                  NIP*
                </label>
                <input
                  type="text"
                  id="nip"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setNip(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyPhone"
                  className="block text-primary mb-1"
                >
                  Służbowy numer telefonu*
                </label>
                <input
                  type="tel"
                  id="companyPhone"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyAddress"
                  className="block text-primary mb-1"
                >
                  Adres firmy (Ulica, Miasto, Kod pocztowy)*
                </label>
                <input
                  id="companyAddress"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyAddress(e.target.value)}
                ></input>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyAddress"
                  className="block text-primary mb-1"
                >
                  Adres pola (Ulica, Miasto, Kod pocztowy)
                </label>
                <input
                  id="companyAddress"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setFieldAddress(e.target.value)}
                ></input>
              </div>
              <div className="mb-4">
                <p className="mt-4 text-gray-300 text-sm">
                  * Powyższe dane mają na celu szybszą weryfikację właściciela i
                  nie są konieczne do potwierdzenia. W przypadku braku danych
                  proces weryfikacji może zostać wydłużony.
                </p>
                <p className="mt-4 text-gray-300 text-sm">
                  Weryfikacja może potrwać do 24 godzin.
                </p>
              </div>
            </>
          )}
          <button
            type="button"
            className="w-full bg-[#96DA2B] text-white p-2 rounded hover:bg-primary"
            onClick={registerAsOwner ? handleOwnerRegister : handleRegister}
          >
            Zarejestruj
          </button>
        </form>
        {loading && (
          <div className="flex justify-center mt-2">
            <div className="loader"></div>
          </div>
        )}
        {/* Error message */}
        {errorRegister && (
          <p
            className={`mt-2 text-sm ${
              errorRegister === 'Zarejestrowano pomyślnie!'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {errorRegister}
          </p>
        )}
      </div>
    </div>
  )
}

export default RegisterPage
