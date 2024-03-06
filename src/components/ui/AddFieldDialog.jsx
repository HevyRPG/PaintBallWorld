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
import { AuthContext } from '@/context/AuthContext' // Ensure this path is correct
import APIKEYS from '@/components/APIKEYS' // Ensure this path is correct
import '@/index.css'

const MultiPageDialog = () => {
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
    sets: [{ ammo: 0, price: 0, description: '' }],
  })
  const [errorRegister, setErrorRegister] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useContext(AuthContext) // Using AuthContext

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

  const addNewSet = () => {
    setFormState((prevState) => ({
      ...prevState,
      sets: [...prevState.sets, { ammo: 0, price: 0, description: '' }],
    }))
  }

  const deleteLastSet = () => {
    setFormState((prevState) => {
      if (prevState.sets.length > 1) {
        return { ...prevState, sets: prevState.sets.slice(0, -1) }
      }
      return prevState // Don't modify state if only one set exists
    })
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
    const token = Cookies.get('authToken')

    formData.append('address.PhoneNo', formState.phone)
    formData.append('address.Street', formState.street)
    formData.append('address.HouseNo', formState.houseNo)
    formData.append('address.City', formState.city) // Removed the extra period after 'City'
    formData.append('address.PostalNumber', formState.postalCode)
    formData.append('address.Coordinates', formState.coordinates)

    formData.append('name', formState.fieldName)
    formData.append('area', formState.area)

    if (formState.regulations instanceof File)
      formData.append('regulations', formState.regulations)

    formData.append('description', formState.Description)
    formData.append('minPlayers', formState.minPlayers)
    formData.append('maxPlayers', formState.maxPlayers)
    formData.append('maxSimultaneousEvents', formState.maxSimultaneousEvents)
    formData.append('fieldType', 'Paintball')
    formData.append('Sets', JSON.stringify(formState.sets))

    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`, 
      },
    }
   
    try {
     
      const response = await axios.post(
        '/api/Field/Fields/Create',
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
        const defaultMessage = 'An error occurred. Please try again.'
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
            setErrorRegister(`Bad Request: ${message}`)
            break
          case 401:
            setErrorRegister(`Unauthorized: ${message}`)
            break
          case 500:
            setErrorRegister(`Server Error: ${message}`)
            break
          default:
            // Handle other statuses
            setErrorRegister(message)
        }

        console.error(`Error ${statusCode}:`, message)
      } else if (error.request) {
        // The request was made but no response was received
        setErrorRegister('No response received. Check your network connection.')
        console.error('Request made but no response received:', error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorRegister('Error setting up the request.')
        console.error('Error message:', error.message)
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
          />
        )
      case 3:
        return (
          <Page3
            formState={formState}
            prevPage={prevPage}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            addNewSet={addNewSet}
            deleteLastSet={deleteLastSet}
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
          label="Geotag (współrzędne)"
          type="text"
          value={formState.coordinates}
          onChange={(e) => handleInputChange('coordinates', e.target.value)}
          placeholder="52.23198970, 21.005957745"
        />
      </div>
      <Button variant="outline" onClick={nextPage}>
        Dalej
      </Button>
    </div>
  )
}

const Page2 = ({ formState, handleInputChange, prevPage, nextPage }) => {
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
          value={formState.regulations}
          onChange={(e) => handleInputChange('regulations', e.target.value)}
        />
      </div>
      <label className="text-primary">Opis</label>
      <textarea
        placeholder="Opis"
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
      <div className="grid gap-2">
        <Button variant="outline" onClick={prevPage}>
          Cofnij
        </Button>
        <Button variant="outline" onClick={nextPage}>
          Dalej
        </Button>
      </div>
    </div>
  )
}

const Page3 = ({
  formState,
  prevPage,
  handleSubmit,
  handleInputChange,
  addNewSet,
  deleteLastSet,
  loading,
  errorRegister,
}) => {
  return (
    <div className="grid gap-2">
      <h1>Uzupełnij co najmniej jeden wariant</h1>
      {formState.sets.map((set, index) => (
        <div key={index} className="grid grid-cols-4 items-center gap-4">
          <h2>Wariant {index + 1}</h2>
          <FormInput
            label="Ilość kulek"
            type="text"
            value={set.ammo}
            onChange={(e) => handleInputChange('ammo', e.target.value, index)}
          />
          <FormInput
            label="Cena"
            type="text"
            value={set.price}
            onChange={(e) => handleInputChange('price', e.target.value, index)}
          />
          <FormInput
            label="Opis"
            type="text"
            value={set.description}
            onChange={(e) =>
              handleInputChange('description', e.target.value, index)
            }
          />
        </div>
      ))}
      <div className="flex justify-between mb-2">
        <Button variant="secondary" onClick={addNewSet} className="">
          Dodaj nowy wariant
        </Button>
        <Button variant="destructive" onClick={deleteLastSet} className="">
          Usuń ostatni wariant
        </Button>
      </div>
      <div>
        <Button variant="ghost" onClick={prevPage}>
          Cofnij
        </Button>
        <Button variant="default" onClick={handleSubmit}>
          Wyślij
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center mt-2">
          <div className="loader"></div>
        </div>
      )}
      {/* Error message */}
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
        <Button variant="outline" size="lg" className="rounded">
          Dodaj Pole
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj pole</DialogTitle>
        </DialogHeader>
        <MultiPageDialog />
      </DialogContent>
    </Dialog>
  )
}

export default AddFieldDialog
