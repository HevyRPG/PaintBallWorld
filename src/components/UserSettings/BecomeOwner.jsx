import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import Cookies from 'js-cookie'
import axios from 'axios' // Import axios here
import APIKEYS from '../APIKEYS'
import '@/index.css'

const BecomeOwner = () => {
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
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [errorRegister, setErrorRegister] = useState('')
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('authToken')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  const handleBecomeOwner = async (e) => {
    e.preventDefault()
    const becomeOwnerData = {
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
          country: 'Poland',
          location: null,
        },
      },
    }

    if (
      !companyName ||
      !ownerFirstName ||
      !ownerLastName ||
      !businessEmail ||
      !nip ||
      !companyPhone ||
      !companyStreet ||
      !companyHouseNO ||
      !companyCity ||
      !companyPostalNumber ||
      !latitude ||
      !longitude
    ) {
      setErrorRegister('Uzupełnij wszystkie pola.')
      return
    }

    try {
      setLoading(true)
      setErrorRegister('')
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.put(
        `${apiUrl}/api/Auth/RegisterOwner`,
        becomeOwnerData,
        config
      )

      if (response.status === 200) {
        setErrorRegister('Zarejestrowano pomyślnie!')
        console.log('Registration successful:', response.data)
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setErrorRegister('Wystąpił błąd. Spróbuj ponownie później')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg p-12">
      <form>
        <div className="flex justify-between">
          <div className="bg-bgs p-8 rounded shadow-md w-1/2 border-primary border">
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
              label="NIP**"
              type="text"
              name="nip"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />
          </div>
          <div className="bg-bgs p-8 rounded shadow-md w-1/2 ml-1 border-primary border">
            <FormInput
              label="Służbowy numer telefonu"
              type="tel"
              name="companyPhone"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
            <FormInput
              label="Ulica"
              type="text"
              name="companyStreet"
              value={companyStreet}
              onChange={(e) => setCompanyStreet(e.target.value)}
            />
            <FormInput
              label="Numer domu"
              type="text"
              name="companyHouseNO"
              value={companyHouseNO}
              onChange={(e) => setCompanyHouseNO(e.target.value)}
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
          </div>
        </div>
        <div className="mb-4">
          <p className="mt-4 text-yellow-400 text-sm">
            ** Powyższe dane mają na celu szybszą weryfikację właściciela i nie
            są konieczne do potwierdzenia. W przypadku braku danych proces
            weryfikacji może zostać wydłużony.
          </p>
          <p className="mt-4 text-gray-300 text-sm">
            Weryfikacja może potrwać do 24 godzin.
          </p>
          <div className="flex justify-center mt-2">
            <Button
              variant="outline"
              type="submit"
              size="lg"
              className="w-1/2  bg-primary text-primary-foreground p-2 rounded hover:bg-secondary"
              onClick={handleBecomeOwner}
            >
              Zostań Właścicielem
            </Button>
          </div>
          {loading && (
            <div className="flex justify-center mt-2">
              <div className="loader"></div>
            </div>
          )}
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
      </form>
    </div>
  )
}

export default BecomeOwner
