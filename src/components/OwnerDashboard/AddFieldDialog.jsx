import React, { useState, useContext } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import FormInput from '@/components/FormInput'
import { AuthContext } from '@/context/AuthContext'
import APIKEYS from '@/components/APIKEYS'
import '@/index.css'

const MultiPageDialog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [formState, setFormState] = useState({
    phone: '',
    street: '',
    houseNo: '',
    city: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    fieldName: '',
    area: '',
    regulations: null,
    Description: '',
    minPlayers: '',
    maxPlayers: '',
    maxSimultaneousEvents: '',
  })
  const [errorRegister, setErrorRegister] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useContext(AuthContext)

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }))
    console.log(formState.longitude)
    console.log(formState.latitude)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setFormState((prevState) => ({
        ...prevState,
        regulations: file,
      }))
    } else {
      setErrorRegister('Wybierz plik PDF!.')
    }
  }

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const prevPage = () => {
    setFormState((prevState) => ({
      ...prevState,
      regulations: null,
    }))
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleSubmit = async () => {
    if (
      !formState.phone ||
      !formState.street ||
      !formState.houseNo ||
      !formState.city ||
      !formState.postalCode ||
      !formState.latitude ||
      !formState.longitude ||
      !formState.fieldName ||
      !formState.area ||
      !formState.Description ||
      !formState.minPlayers ||
      !formState.maxPlayers ||
      !formState.maxSimultaneousEvents
    ) {
      setErrorRegister('Uzupełnij wszystkie pola')
      return
    }

    const formData = new FormData()
    setLoading(true)
    setErrorRegister('')
    console.log(formData)

    const token = Cookies.get('authToken')

    formData.append('address.PhoneNo', formState.phone)
    formData.append('address.Street', formState.street)
    formData.append('address.HouseNo', formState.houseNo)
    formData.append('address.City', formState.city)
    formData.append('address.PostalNumber', formState.postalCode)
    formData.append('address.Country', 'Poland')
    formData.append('address.location.Latitude', formState.latitude)
    formData.append('address.location.Longitude', formState.longitude)

    formData.append('name', formState.fieldName)
    formData.append('area', formState.area)
    formData.append('regulations', formState.regulations)

    formData.append('description', formState.Description)
    formData.append('minPlayers', formState.minPlayers)
    formData.append('maxPlayers', formState.maxPlayers)
    formData.append('maxSimultaneousEvents', formState.maxSimultaneousEvents)
    formData.append('fieldType', 'Paintball')
    const phoneRegex = /^\+?[0-9\s-]{3,}$/

    const postalCodeRegex = /^\d{2}-\d{3}$/

    if (!phoneRegex.test(formState.phone)) {
      setErrorRegister('Wprowadź poprawny numer telefonu (9 cyfr).')
      setLoading(false)
      return
    }

    if (!postalCodeRegex.test(formState.postalCode)) {
      setErrorRegister('Wprowadź poprawny kod pocztowy (XX-XXX).')
      setLoading(false)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`,
      },
    }
    console.log('Logging config:', config)
    console.log('Logging formdata:', formData)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(
        `${apiUrl}/api/Field/Fields`,
        formData,
        config
      )

      if (response.status === 200) {
        setErrorRegister('Pole dodane pomyślnie! Możesz zamknąć to okno')

        setLoading(false)
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status
        const defaultMessage = 'Wystąpił błąd. Spróbuj ponownie później'
        let message = defaultMessage

        if (error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors
          message = Object.entries(errors)
            .map(([key, value]) => `${key}: ${value.join(', ')}`)
            .join('\n')
        } else {
          message =
            error.response.data.message ||
            error.response.data.error ||
            defaultMessage
        }

        switch (statusCode) {
          case 400:
            setErrorRegister(`Uzupełnij wszystkie pola`)
            break
          case 401:
            setErrorRegister(`Nieautoryzowany request. Powiadom administratora`)
            break
          case 500:
            setErrorRegister(`Wystąpił błąd. Spróbuj ponownie później.`)
            break
          default:
            setErrorRegister(message)
        }
      } else if (error.request) {
        setErrorRegister(
          'Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.'
        )
      } else {
        setErrorRegister('Coś poszło nie tak. Spróbuj ponownie później.')
      }

      setLoading(false)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <Page1
            formState={formState}
            handleInputChange={handleInputChange}
            nextPage={nextPage}
          />
        )
      case 2:
        return (
          <Page2
            formState={formState}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            prevPage={prevPage}
            nextPage={nextPage}
            handleSubmit={handleSubmit}
            loading={loading}
            errorRegister={errorRegister}
          />
        )
      default:
        return null
    }
  }

  return <div>{renderPage()}</div>
}

const Page1 = ({ formState, handleInputChange, nextPage }) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput
          label="Numer telefonu"
          type="text"
          value={formState.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
        <FormInput
          label="Ulica"
          type="text"
          value={formState.street}
          onChange={(e) => handleInputChange('street', e.target.value)}
        />
        <FormInput
          label="Numer domu"
          type="text"
          value={formState.houseNo}
          onChange={(e) => handleInputChange('houseNo', e.target.value)}
        />
        <FormInput
          label="Miasto"
          type="text"
          value={formState.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
        <FormInput
          label="Kod pocztowy"
          type="text"
          value={formState.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          placeholder="00-000"
        />
        <FormInput
          label="Szerokość geograficzna (Latitude)"
          type="text"
          value={formState.latitude.replace('.', ',')}
          onChange={(e) => handleInputChange('latitude', e.target.value)}
          placeholder="22,2222"
        />
        <FormInput
          label="Długość geograficzna (Longitude)"
          type="text"
          value={formState.longitude.replace('.', ',')}
          onChange={(e) => handleInputChange('longitude', e.target.value)}
          placeholder="11,111"
        />
      </div>
      <Button variant="outline" onClick={nextPage}>
        Dalej
      </Button>
    </div>
  )
}

const Page2 = ({
  formState,
  prevPage,
  handleSubmit,
  handleInputChange,
  handleFileChange,
  loading,
  errorRegister,
}) => {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput
          label="Nazwa pola"
          type="text"
          value={formState.fieldName}
          onChange={(e) => handleInputChange('fieldName', e.target.value)}
        />
        <FormInput
          label="Powierzchnia w m²"
          type="text"
          value={formState.area}
          onChange={(e) => handleInputChange('area', e.target.value)}
        />
        <FormInput
          label="Regulamin"
          type="file"
          className="text-white"
          onChange={handleFileChange}
        />
      </div>
      <label className="text-primary">Opis (max 500 znaków)</label>
      <textarea
        placeholder="Opis"
        rows="9"
        cols="40"
        className="text-black"
        value={formState.Description}
        onChange={(e) => handleInputChange('Description', e.target.value)}
        maxLength={500}
      ></textarea>
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput
          label="Minimalna liczba graczy"
          type="text"
          value={formState.minPlayers}
          onChange={(e) => handleInputChange('minPlayers', e.target.value)}
        />
        <FormInput
          label="Maksymalna liczba graczy"
          type="text"
          value={formState.maxPlayers}
          onChange={(e) => handleInputChange('maxPlayers', e.target.value)}
        />
        <FormInput
          label="Ilość wydarzeń które mogą odbywać się jednocześnie"
          type="text"
          value={formState.maxSimultaneousEvents}
          onChange={(e) =>
            handleInputChange('maxSimultaneousEvents', e.target.value)
          }
        />
      </div>
      <div>
        <Button variant="ghost" onClick={prevPage}>
          Cofnij
        </Button>
        <Button
          variant="default"
          onClick={handleSubmit}
          className="hover:bg-green-500"
        >
          Wyślij
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
            errorRegister === 'Pole dodane pomyślnie! Możesz zamknąć to okno'
              ? 'text-green-500'
              : 'text-destructive'
          }`}
        >
          {errorRegister}
        </p>
      )}
    </div>
  )
}

const AddFieldDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="lg" className="rounded border-primary">
          Dodaj Pole
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-max border-primary">
        <DialogHeader>
          <DialogTitle>Dodaj pole</DialogTitle>
        </DialogHeader>
        <MultiPageDialog />
      </DialogContent>
    </Dialog>
  )
}

export default AddFieldDialog
