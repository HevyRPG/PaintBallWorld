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

  function translateErrorMessage(errorMessage) {
    switch (errorMessage) {
      case 'Passwords must be at least 8 characters.':
        return (
          <>
            {'Hasło musi zawierać co najmniej 8 znaków.'}
            <br />
          </>
        )
      case 'Passwords must have at least one non alphanumeric character.':
        return (
          <>
            {'Hasło musi zawierać co najmniej jeden znak niealfanumeryczny.'}
            <br />
          </>
        )
      case "Passwords must have at least one digit ('0'-'9').":
        return (
          <>
            {'Hasło musi zawierać co najmniej jedną cyfrę.'}
            <br />
          </>
        )
      case "Passwords must have at least one uppercase ('A'-'Z').":
        return (
          <>
            {'Hasło musi zawierać co najmniej jedną wielką literę.'}
            <br />
          </>
        )
      case `Username '${username}' is already taken.`:
        return (
          <>
            {`Nazwa użytkownika '${username}' jest już zajęta.`}
            <br />
          </>
        )
      default:
        return errorMessage
    }
  }

  function validateUserEmail(email) {
    const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return generalEmailRegex.test(email)
  }

  function validateBusinessEmail(businessEmail) {
    const businessEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return businessEmailRegex.test(businessEmail)
  }

  const handleOwnerRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorRegister('')

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
    if (!validateUserEmail(email)) {
      setErrorRegister('Niepoprawny adres e-mail.')
      setLoading(false)
      return
    }
    if (!validateBusinessEmail(businessEmail)) {
      setErrorRegister('Niepoprawny służbowy adres e-mail.')
      setLoading(false)
      return
    }

    const formattedDateOfBirth = `${dateOfBirth}T00:00:00`
    const ownerData = {
      email: email,
      username: username,
      password: password,
      dateOfBirth: formattedDateOfBirth,
      firstName: ownerFirstName,
      lastName: ownerLastName,
      company: {
        taxId: nip,
        companyName: companyName,
        email: businessEmail,
        address: {
          phoneNo: companyPhone,
          street: companyStreet,
          houseNo: companyHouseNO,
          city: companyCity,
          postalNumber: companyPostalNumber,
          country: 'string',
          coordinates: 'string',
        },
      },
    }
    console.log(ownerData)

    try {
      const response = await axios.post(
        '/api/Auth/RegisterOwner',
        JSON.stringify(ownerData),
        APIHeaders
      )
      if (response.status === 200) {
        setErrorRegister('Zarejestrowano pomyślnie!')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      if (error.response && error.response.status === 400) {
        const { data } = error.response

        if (data && data.errors) {
          const errorMessages = data.errors.map((error) =>
            translateErrorMessage(error.description)
          )
          setErrorRegister(
            <div>
              {errorMessages.map((message, index) => (
                <React.Fragment key={index}>{message}</React.Fragment>
              ))}
            </div>
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

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorRegister('')

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
    if (!validateUserEmail(email)) {
      setErrorRegister('Niepoprawny adres e-mail.')
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
        '/api/Auth/Register',
        JSON.stringify(userData),
        APIHeaders
      )

      if (response.status === 200) {
        setErrorRegister('Zarejestrowano pomyślnie!')
      }
    } catch (error) {
      console.error('Error registering user:', error)

      if (error.response && error.response.status === 400) {
        const { data } = error.response

        if (data && data.errors) {
          const errorMessages = data.errors.map((error) =>
            translateErrorMessage(error.description)
          )
          setErrorRegister(
            <div>
              {errorMessages.map((message, index) => (
                <React.Fragment key={index}>{message}</React.Fragment>
              ))}
            </div>
          )
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
      <div className="bg-bgs p-8 rounded shadow-md w-96 border-primary border">
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
                label="Nazwa firmy**"
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
                label="NIP**"
                type="text"
                name="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />
              <FormInput
                label="Służbowy numer telefonu**"
                type="tel"
                name="companyPhone"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
              <FormInput
                label="Ulica**"
                type="text"
                name="companyStreet"
                value={companyStreet}
                onChange={(e) => setCompanyStreet(e.target.value)}
              />
              <FormInput
                label="Numer domu**"
                type="text"
                name="companyHouseNO"
                value={companyHouseNO}
                onChange={(e) => setCompanyHouseNO(e.target.value)}
              />
              <FormInput
                label="Miasto**"
                type="text"
                name="companyCity"
                value={companyCity}
                onChange={(e) => setCompanyCity(e.target.value)}
              />
              <FormInput
                label="Kod pocztowy**"
                type="text"
                name="companyPostalNumber"
                value={companyPostalNumber}
                onChange={(e) => setCompanyPostalNumber(e.target.value)}
              />
              <div className="mb-4">
                <p className="mt-4 text-yellow-400 text-sm">
                  ** Powyższe dane mają na celu szybszą weryfikację właściciela
                  i nie są konieczne do potwierdzenia. W przypadku braku danych
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
            type="submit"
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
                ? 'text-green-500'
                : 'text-destructive'
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
