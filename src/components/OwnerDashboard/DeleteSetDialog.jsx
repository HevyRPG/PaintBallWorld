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
import Cookies from 'js-cookie'
import APIKEYS from '../APIKEYS'

const DeleteSetDialog = ({ fieldId, set }) => {
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('authToken')

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`, // Append Authorization header
    },
  }
  const handleDeleteSet = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      await axios.delete(
        `${apiUrl}/api/Field/Sets/${fieldId}/${set.id}`,
        config
      )
      console.log('Set deleted successfully')
    } catch (error) {
      console.error('Error deleting set:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="destructive"
          size="lg"
          className="rounded border-primary"
        >
          Usuń zestaw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuń zestaw</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this set?</p>
        <Button
          variant="destructive"
          onClick={handleDeleteSet}
          disabled={loading}
        >
          Usuń
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteSetDialog
