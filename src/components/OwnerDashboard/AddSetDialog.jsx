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
import FormInput from '@/components/FormInput' // Assuming correct path to FormInput component

const AddSetDialog = ({ fieldId }) => {
  const [set, setSet] = useState({
    ammo: 0,
    price: 0,
    description: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setSet((prevSet) => ({
      ...prevSet,
      [field]: value,
    }))
  }

  const handleAddSet = async () => {
    setLoading(true)
    try {
      await axios.post(`/api/Field/Sets/${fieldId}`, set)
      console.log('Set added successfully')
    } catch (error) {
      console.error('Error adding set:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="lg" className="rounded border-primary">
          Dodaj zestaw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj zestaw</DialogTitle>
        </DialogHeader>
        <FormInput
          label="Ammo"
          type="number"
          value={set.ammo}
          onChange={(e) => handleChange('ammo', e.target.value)}
        />
        <FormInput
          label="Price"
          type="number"
          value={set.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
        <FormInput
          label="Description"
          type="text"
          value={set.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <Button onClick={handleAddSet} disabled={loading}>
          Dodaj
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddSetDialog
