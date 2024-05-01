import React, { useState, useEffect, useContext } from 'react'
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

const MultiPageDialog = ({ fieldId }) => {
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
    description: '',
    minPlayers: '',
    maxPlayers: '',
    maxSimultaneousEvents: '',
  })
  const [errorRegister, setErrorRegister] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useContext(AuthContext)

  const fetchFieldData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const token = Cookies.get('authToken')
      const response = await axios.get(
        `${apiUrl}/api/Field/Fields/${fieldId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...APIKEYS.headers,
          },
        }
      )
      const fieldData = response.data

      // Map the fetched field data to match the formState structure
      const mappedData = {
        phone: fieldData.address.phoneNo,
        street: fieldData.address.street,
        houseNo: fieldData.address.houseNo,
        city: fieldData.address.city,
        postalCode: fieldData.address.postalNumber,
        latitude: fieldData.address.location.latitude
          .toString()
          .replace('.', ','),
        longitude: fieldData.address.location.longitude
          .toString()
          .replace('.', ','),

        area: fieldData.area,
        name: fieldData.name,
        regulations: fieldData.regulations,
        description: fieldData.description,
        minPlayers: fieldData.minPlayers,
        maxPlayers: fieldData.maxPlayers,
        maxSimultaneousEvents: fieldData.maxSimultaneousEvents,
      }

      setFormState(mappedData)
    } catch (error) {
      console.error('Error fetching field data:', error)
      // Handle error if needed
    }
  }

  useEffect(() => {
    fetchFieldData()
    console.log(formState)
  }, [fieldId])

  const handleInputChange = (field, value, index) => {
    if (field === 'latitude' || field === 'longitude') {
      value = value.replace('.', ',')
    }

    if (index !== undefined) {
      // Handling changes in the sets array
      setFormState((prevState) => ({
        ...prevState,
        sets: prevState.sets.map((set, i) =>
          i === index ? { ...set, [field]: value } : set
        ),
      }))
    } else if (field === 'regulations' && value instanceof File) {
      // If regulations field is a file
      setFormState((prevState) => ({
        ...prevState,
        [field]: value,
      }))
    } else {
      // Handling changes in top-level form state properties
      setFormState((prevState) => ({
        ...prevState,
        [field]: value,
      }))
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
    const formData = new FormData()
    setLoading(true)
    setErrorRegister('')
    console.log(formData)
    // Retrieve the token from cookies
    const token = Cookies.get('authToken')

    formData.append('address.PhoneNo', formState.phone)
    formData.append('address.Street', formState.street)
    formData.append('address.HouseNo', formState.houseNo)
    formData.append('address.City', formState.city) // Removed the extra period after 'City'
    formData.append('address.PostalNumber', formState.postalCode)
    formData.append('address.Country', 'Poland')
    formData.append('address.location.Latitude', formState.latitude)
    formData.append('address.location.Longitude', formState.longitude)

    formData.append('name', formState.name)
    formData.append('area', formState.area)
    if (formState.regulations instanceof File)
      formData.append('regulations', formState.regulations)

    formData.append('description', formState.description)
    formData.append('minPlayers', formState.minPlayers)
    formData.append('maxPlayers', formState.maxPlayers)
    formData.append('maxSimultaneousEvents', formState.maxSimultaneousEvents)
    formData.append('fieldType', 'Paintball')

    const phoneRegex = /^\+?[0-9\s-]{3,}$/

    const postalCodeRegex = /^\d{2}-\d{3}$/

    // Validate phone number
    if (formState.phone && !phoneRegex.test(formState.phone)) {
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
        Authorization: `Bearer ${token}`, // Append Authorization header
      },
    }
    console.log('Logging config:', config)
    console.log('Logging formdata:', formData)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.put(
        `${apiUrl}/api/Field/Fields/${fieldId}`,
        formData,
        config
      )

      if (response.status === 200) {
        setErrorRegister('Zmieniono dane! Możesz zamknąć to okno')
        // Reset form or navigate as needed
        setLoading(false)
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status
        const defaultMessage = 'Wystąpił błąd. Spróbuj ponownie później'
        let message = defaultMessage

        if (error.response.data && error.response.data.errors) {
          // If there are validation errors, construct a message from them
          const errors = error.response.data.errors
          message = Object.entries(errors)
            .map(([key, value]) => `${key}: ${value.join(', ')}`)
            .join('\n')
        } else {
          // Otherwise, try to retrieve a more specific message from the server's response
          message =
            error.response.data.message ||
            error.response.data.error ||
            defaultMessage
        }

        switch (statusCode) {
          case 400:
            setErrorRegister(`Zweryfikuj poprawność danych.`)
            break
          case 401:
            setErrorRegister(`Nieautoryzowany request. Powiadom administratora`)
            break
          case 500:
            setErrorRegister(`Wystąpił błąd. Spróbuj ponownie później.`)
            break
          default:
            // Handle other statuses
            setErrorRegister(message)
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorRegister(
          'Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.'
        )
      } else {
        // Something happened in setting up the request that triggered an Error
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
          placeholder={formState.phone}
        />
        <FormInput
          label="Ulica"
          type="text"
          value={formState.street}
          onChange={(e) => handleInputChange('street', e.target.value)}
          placeholder={formState.street}
        />
        <FormInput
          label="Numer domu"
          type="text"
          value={formState.houseNo}
          onChange={(e) => handleInputChange('houseNo', e.target.value)}
          placeholder={formState.houseNo}
        />
        <FormInput
          label="Miasto"
          type="text"
          value={formState.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          placeholder={formState.city}
        />
        <FormInput
          label="Kod pocztowy"
          type="text"
          value={formState.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          placeholder={formState.postalCode}
        />
        <FormInput
          label="Szerokość geograficzna (Latitude)"
          type="text"
          value={formState.latitude}
          onChange={(e) => handleInputChange('latitude', e.target.value)}
          placeholder={formState.latitude}
        />
        <FormInput
          label="Długość geograficzna (Longitude)"
          type="text"
          value={formState.longitude}
          onChange={(e) => handleInputChange('longitude', e.target.value)}
          placeholder={formState.latitude}
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
  loading,
  errorRegister,
}) => {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput
          label="Nazwa pola"
          type="text"
          value={formState.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder={formState.name}
        />
        <FormInput
          label="Powierzchnia w m²"
          type="text"
          value={formState.area}
          onChange={(e) => handleInputChange('area', e.target.value)}
          placeholder={formState.area}
        />
        <FormInput
          label="Regulamin"
          type="file"
          value={formState.regulations}
          className="text-white"
          onChange={(e) => handleInputChange('regulations', e.target.value)}
          placeholder={formState.regulations}
        />
      </div>
      <label className="text-primary">Opis (max 500 znaków)</label>
      <textarea
        placeholder={formState.description}
        rows="9"
        cols="40"
        className="text-black"
        value={formState.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        maxLength={500}
      ></textarea>
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput
          label="Minimalna liczba graczy"
          type="text"
          value={formState.minPlayers}
          onChange={(e) => handleInputChange('minPlayers', e.target.value)}
          placeholder={formState.minPlayers}
        />
        <FormInput
          label="Maksymalna liczba graczy"
          type="text"
          value={formState.maxPlayers}
          onChange={(e) => handleInputChange('maxPlayers', e.target.value)}
          placeholder={formState.maxPlayers}
        />
        <FormInput
          label="Ilość wydarzeń które mogą odbywać się jednocześnie"
          type="text"
          value={formState.maxSimultaneousEvents}
          onChange={(e) =>
            handleInputChange('maxSimultaneousEvents', e.target.value)
          }
          placeholder={formState.maxSimultaneousEvents}
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
            errorRegister === 'Zmieniono dane! Możesz zamknąć to okno'
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

const EditFieldDialog = ({ fieldId }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="lg" className="rounded border-primary">
          Edytuj pole
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-max border-primary">
        <DialogHeader>
          <DialogTitle>Edytuj pole</DialogTitle>
        </DialogHeader>

        <MultiPageDialog fieldId={fieldId} />
      </DialogContent>
    </Dialog>
  )
}

export default EditFieldDialog
