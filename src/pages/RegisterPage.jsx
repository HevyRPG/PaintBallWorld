import React, { useState } from 'react'
import axios from 'axios'
import '../index.css'
import APIHeaders from '../components/APIHeaders'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [registerAsOwner, setRegisterAsOwner] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [ownerFirstName, setOwnerFirstName] = useState('')
  const [ownerLastName, setOwnerLastName] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [nip, setNip] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyStreet, setCompanyStreet] = useState('')
  const [companyHouseNO, setCompanyHouseNO] = useState('')
  const [companyCity, setCompanyCity] = useState('')
  const [companyPostalNumber, setCompanyPostalNumber] = useState('')

  const [errorRegister, setErrorRegister] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOwnerRegister = async () => {
    setLoading(true)
    setErrorRegister('')

    // Validation for owner
    if (
      !username ||
      !email ||
      !password ||
      !dateOfBirth ||
      !ownerFirstName ||
      !ownerLastName ||
      !businessEmail
    ) {
      setErrorRegister('Uzupełnij wszystkie wymagane pola (bez *).')
      setLoading(false)
      return
    }
    if (password !== repeatPassword) {
      setErrorRegister('Hasła nie pasują do siebie.')
      setLoading(false)
      return
    }

    const formattedDateOfBirth = `${dateOfBirth}T00:00:00`
    const ownerData = {
      email,
      username,
      password,
      DateOfBirth: formattedDateOfBirth,
      owner: {
        firstName: ownerFirstName,
        lastName: ownerLastName,
        company: {
          taxId: nip,
          Name: companyName,
          phoneNo: companyPhone,
          email: businessEmail,
          address: {
            phoneNo: companyPhone,
            street: companyStreet,
            houseNo: companyHouseNO,
            city: companyCity,
            postalNumber: companyPostalNumber,
            country: '',
            coordinates: '',
          },
        },
      },
    }

    try {
      const response = await axios.post(
        '/api/Auth/Register/RegisterOwner',
        JSON.stringify(ownerData),
        APIHeaders
      )
      if (response.status === 200) {
        setErrorRegister('Zarejestrowano pomyślnie!')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      setErrorRegister(
        'Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    setErrorRegister('')

    // Validation for regular user registration
    if (!username || !email || !password || !dateOfBirth) {
      setErrorRegister('Uzupełnij wszystkie wymagane pola (bez *).')
      setLoading(false)
      return
    }
    if (password !== repeatPassword) {
      setErrorRegister('Hasła nie pasują do siebie.')
      setLoading(false)
      return
    }

    const formattedDateOfBirth = `${dateOfBirth}T00:00:00`
    const userData = {
      username,
      email,
      password,
      DateOfBirth: formattedDateOfBirth,
    }

    try {
      const response = await axios.post(
        '/api/Auth/Register/Register',
        JSON.stringify(userData),
        APIHeaders
      )
      if (response.status === 200) {
        setErrorRegister('Zarejestrowano pomyślnie!')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      setErrorRegister(
        'Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.'
      )
    } finally {
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
                  htmlFor="ownerFirstName"
                  className="block text-primary mb-1"
                >
                  Imię właściciela
                </label>
                <input
                  type="text"
                  id="ownerFirstName"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setOwnerFirstName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ownerLastName"
                  className="block text-primary mb-1"
                >
                  Nazwisko właściciela
                </label>
                <input
                  type="text"
                  id="ownerLastName"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setOwnerLastName(e.target.value)}
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
                  htmlFor="companyStreet"
                  className="block text-primary mb-1"
                >
                  Ulica*
                </label>
                <input
                  id="companyStreet"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyStreet(e.target.value)}
                ></input>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyHouseNO"
                  className="block text-primary mb-1"
                >
                  Numer domu*
                </label>
                <input
                  id="companyHouseNO"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyHouseNO(e.target.value)}
                ></input>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyCity"
                  className="block text-primary mb-1"
                >
                  Miasto*
                </label>
                <input
                  id="companyCity"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyCity(e.target.value)}
                ></input>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyPostalNumber"
                  className="block text-primary mb-1"
                >
                  Kod pocztowy*
                </label>
                <input
                  id="companyPostalNumber"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setCompanyPostalNumber(e.target.value)}
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
                ? 'text-secondary'
                : 'text-err'
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
