import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Cookies from 'js-cookie'
import APIKEYS from '@/components/APIKEYS'

const FieldDeleteButton = ({ fieldId, onDelete }) => {
  const [loading, setLoading] = useState(false)

  const token = Cookies.get('authToken')
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`, // Append Authorization header
    },
  }
  const handleDelete = async () => {
    setLoading(true)
    try {
      await axios.delete(`/api/Field/Fields/${fieldId}`, config)
      onDelete(fieldId)
    } catch (error) {
      console.error('Error deleting field:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      Usuń pole
    </Button>
  )
}

const DeleteFieldDialog = ({ fieldId }) => {
  const [showFieldDeletedMessage, setShowFieldDeletedMessage] = useState(false)

  const handleFieldDelete = () => {
    setShowFieldDeletedMessage(true)
    // You can add additional logic here if needed
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="destructive"
          size="lg"
          className="rounded border-primary"
        >
          Usuń pole
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj pole</DialogTitle>
        </DialogHeader>

        <FieldDeleteButton fieldId={fieldId} onDelete={handleFieldDelete} />
        {showFieldDeletedMessage && (
          <p className="text-green-500">Pole zostało pomyślnie usunięte.</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DeleteFieldDialog
