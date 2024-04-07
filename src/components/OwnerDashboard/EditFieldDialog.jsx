import React, { useState, useContext, useEffect } from 'react'
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
import { AuthContext } from '@/context/AuthContext' // Ensure this path is correct
import APIKEYS from '@/components/APIKEYS' // Ensure this path is correct
import '@/index.css'

const MultiPageDialog = ({ fieldId }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [formState, setFormState] = useState({
    phone: '',
    street: '',
    houseNo: '',
    city: '',
    postalCode: '',
    coordinates: '',
    fieldName: '',
    area: '',
    regulations: '',
    Description: '',
    minPlayers: '',
    maxPlayers: '',
    maxSimultaneousEvents: '',
  })
  const [errorRegister, setErrorRegister] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        setLoading(true)
        const token = Cookies.get('authToken')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(`/api/Field/Fields/${fieldId}`, config) // Replace {fieldId} with actual field ID
        if (response.status === 200) {
          const fieldData = response.data
          setFormState({
            ...formState,
            phone: fieldData.phone,
            street: fieldData.street,
            houseNo: fieldData.houseNo,
            city: fieldData.city,
            postalCode: fieldData.postalCode,
            coordinates: fieldData.coordinates,
            fieldName: fieldData.fieldName,
            area: fieldData.area,
            regulations: fieldData.regulations, // Assuming regulations field is also a placeholder
            Description: fieldData.Description,
            minPlayers: fieldData.minPlayers,
            maxPlayers: fieldData.maxPlayers,
            maxSimultaneousEvents: fieldData.maxSimultaneousEvents,
          })
        }
      } catch (error) {
        setErrorRegister('Error fetching field data.')
      } finally {
        setLoading(false)
      }
    }

    fetchFieldData()
  }, [])

  const { isLoggedIn } = useContext(AuthContext)

  const handleInputChange = (field, value, index) => {
    if (index !== undefined) {
      // Handling changes in the sets array
      setFormState((prevState) => ({
        ...prevState,
        sets: prevState.sets.map((set, i) =>
          i === index ? { ...set, [field]: value } : set
        ),
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
    formData.append('address.City', formState.city)
    formData.append('address.PostalNumber', formState.postalCode)
    formData.append('address.Coordinates', formState.coordinates)

    formData.append('name', formState.fieldName)
    formData.append('area', formState.area)

    // Ensure 'formState.regulations' contains a File object.
    // If 'formState.regulations' is coming from a file input, it should be a File object.
    if (formState.regulations instanceof File)
      formData.append('regulations', formState.regulations)

    formData.append('description', formState.Description)
    formData.append('minPlayers', formState.minPlayers)
    formData.append('maxPlayers', formState.maxPlayers)
    formData.append('maxSimultaneousEvents', formState.maxSimultaneousEvents)
    formData.append('fieldType', 'Paintball')

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`, // Append Authorization header
      },
    }

    try {
      const response = await axios.post(
        '/api/Field/Fields/Create',
        formData,
        config
      )

      if (response.status === 200) {
        setErrorRegister('Zmieniono dane! Możesz zamknąć to okno.')
        // Reset form or navigate as needed
        setLoading(false)
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status
        const defaultMessage = 'Wystąpił błąd. Powiadom administratora.'
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
            setErrorRegister(`Uzupełnij wszystkie pola`)
            break
          case 401:
            setErrorRegister(`Nieautoryzowana próba. Powiadom administratora`)
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
          'Brak odpowiedzi z serwera. Skontaktuj się z administratorem'
        )
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorRegister('Wystąpił błąd. Spróbuj ponownie później')
      }

      setLoading(false)
    }
  }

  const renderPage = () => {
    if (errorRegister) {
      return <p>Błąd podczas ładowania danych. Spróbuj ponownie później.</p>
    }
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
          label="Geotag (współrzędne)"
          type="text"
          value={formState.coordinates}
          onChange={(e) => handleInputChange('coordinates', e.target.value)}
          placeholder={formState.coordinates}
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
          value={formState.fieldName}
          onChange={(e) => handleInputChange('fieldName', e.target.value)}
          placeholder={formState.fieldName}
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
          onChange={(e) => handleInputChange('regulations', e.target.value)}
          placeholder={formState.regulations}
        />
      </div>
      <label className="text-primary">Opis</label>
      <textarea
        placeholder={formState.Description}
        rows="9"
        cols="40"
        className="text-black"
        value={formState.Description}
        onChange={(e) => handleInputChange('Description', e.target.value)}
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
            errorRegister === 'Zmieniono dane! Możesz zamknąć to okno.'
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
        <Button variant="outline" size="lg" className="rounded border-primary">
          Edytuj pole
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj pole</DialogTitle>
        </DialogHeader>
        <MultiPageDialog fieldId={fieldId} />
      </DialogContent>
    </Dialog>
  )
}

export default EditFieldDialog
