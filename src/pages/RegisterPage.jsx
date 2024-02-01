// src/components/RegisterPage.js
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [registerAsOwner, setRegisterAsOwner] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [nip, setNip] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [fieldAddress, setFieldAddress] = useState('')

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Registering with:', {
      username,
      email,
      password,
      birthdate,
      registerAsOwner,
      companyName,
      businessEmail,
      nip,
      companyPhone,
      companyAddress,
      fieldAddress,
    })
  }

  return (
    <div className="flex flex-col justify-center items-center bg-bgm p-8">
      <div className="bg-bgs p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          Zarejestruj się
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-primary mb-1">
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
            <label htmlFor="email" className="block text-primary mb-1">
              Adres e-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="birthdate" className="block text-primary mb-1">
              Data urodzenia
            </label>
            <input
              type="date"
              id="birthdate"
              className="w-full p-2 border rounded"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-primary mb-1">
              Hasło
            </label>
            <input
              type="password"
              id="password"
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
            onClick={handleRegister}
          >
            Zarejestruj
          </button>
        </form>
        <p className="mt-4 text-gray-300 text-sm"></p>
      </div>
    </div>
  )
}

export default RegisterPage
