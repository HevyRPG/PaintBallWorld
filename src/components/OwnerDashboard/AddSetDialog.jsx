import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import FormInput from '@/components/FormInput'
import APIKEYS from '@/components/APIKEYS'
import Cookies from 'js-cookie'

const AddSetDialog = ({ fieldId }) => {
  const token = Cookies.get('authToken')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [defaultSet, setDefaultSet] = useState([
    {
      ammo: 0,
      price: 0,
      description: '',
    },
  ])

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  const handleChange = (field, value) => {
    setDefaultSet([
      {
        ...defaultSet[0],
        [field]: value,
      },
    ])
  }

  const handleAddSet = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      await axios.post(
        `${apiUrl}/api/Field/Sets/${fieldId}`,
        defaultSet,
        config
      )
      setError('Dodano zestaw!')
    } catch (error) {
      console.error('Error adding set:', error)
      setError('Wystąpił błąd. Spróbuj ponownie później.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="lg" className="rounded border-primary">
          Dodaj zestaw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj zestaw</DialogTitle>
        </DialogHeader>
        <FormInput
          label="Ilość kulek"
          type="number"
          value={defaultSet[0].ammo}
          onChange={(e) => handleChange('ammo', e.target.value)}
        />
        <FormInput
          label="Cena w zł"
          type="number"
          value={defaultSet[0].price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
        <FormInput
          label="Opis pakietu"
          type="text"
          value={defaultSet[0].description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <Button onClick={handleAddSet} disabled={loading}>
          Dodaj
        </Button>
        {error && (
          <p
            className={
              error === 'Dodano zestaw!' ? 'text-green-500' : 'text-red-500'
            }
          >
            {error}
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddSetDialog
