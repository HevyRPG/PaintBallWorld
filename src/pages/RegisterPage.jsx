import React, { useState } from 'react'
import axios from 'axios'
import '../index.css'
import APIHeaders from '../components/APIHeaders'
import FormInput from '../components/FormInput'
import { Button } from '@/components/ui/button'

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
      if (error.response && error.response.status === 400) {
        // Extract error messages from the response
        const { data } = error.response
        if (data && data.errors) {
          const errorMessages = data.errors
            .map((error) => error.description)
            .join(', ')
          setErrorRegister(errorMessages)
        } else {
          setErrorRegister(
            'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.'
          )
        }
      } else {
        setErrorRegister('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.')
      }
    } finally {
      // Set loading to false after request completes
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
      if (error.response && error.response.status === 400) {
        // Extract error messages from the response
        const { data } = error.response
        if (data && data.errors) {
          const errorMessages = data.errors
            .map((error) => error.description)
            .join(', ')
          setErrorRegister(errorMessages)
        } else {
          setErrorRegister(
            'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.'
          )
        }
      } else {
        setErrorRegister('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.')
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
          <FormInput
            label="Nazwa użytkownika"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            label="Adres e-mail"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="Data urodzenia"
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <FormInput
            label="Hasło"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            label="Powtórz hasło"
            type="password"
            name="repetPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
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
              <FormInput
                label="Nazwa firmy"
                type="text"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <FormInput
                label="Imię właściciela"
                type="text"
                name="ownerFirstName"
                value={ownerFirstName}
                onChange={(e) => setOwnerFirstName(e.target.value)}
              />
              <FormInput
                label="Nazwisko właściciela"
                type="text"
                name="ownerLastName"
                value={ownerLastName}
                onChange={(e) => setOwnerLastName(e.target.value)}
              />
              <FormInput
                label="Służbowy adres e-mail (Kontaktowy)"
                type="email"
                name="businessEmail"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
              />
              <FormInput
                label="NIP"
                type="text"
                name="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />
              <FormInput
                label="Służbowy numer telefonu"
                type="tel"
                name="companyPhone"
                value={companyPhone}
                onChange={setCompanyPhone}
              />
              <FormInput
                label="Ulica"
                type="text"
                name="companyStreet"
                value={companyStreet}
                onChange={setCompanyStreet}
              />
              <FormInput
                label="Numer domu"
                type="text"
                name="companyHouseNO"
                value={companyHouseNO}
                onChange={setCompanyHouseNO}
              />
              <FormInput
                label="Miasto"
                type="text"
                name="companyCity"
                value={companyCity}
                onChange={(e) => setCompanyCity(e.target.value)}
              />
              <FormInput
                label="Kod pocztowy"
                type="text"
                name="companyPostalNumber"
                value={companyPostalNumber}
                onChange={(e) => setCompanyPostalNumber(e.target.value)}
              />
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
          <Button
            variant="outline"
            type="button"
            className="w-full bg-primary text-primary-foreground p-2 rounded hover:bg-secondary"
            onClick={registerAsOwner ? handleOwnerRegister : handleRegister}
          >
            Zarejestruj
          </Button>
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
                : 'text-destructive-foreground'
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
