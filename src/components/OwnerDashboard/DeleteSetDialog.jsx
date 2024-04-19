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

const DeleteSetDialog = ({ fieldId, set }) => {
  const [loading, setLoading] = useState(false)

  const handleDeleteSet = async () => {
    setLoading(true)
    try {
      await axios.delete(`/api/Field/Sets/${fieldId}/${set.id}`)
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
        <Button variant="outline" size="lg" className="rounded border-primary">
          Usuń zestaw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuń zestaw</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this set?</p>
        <Button onClick={handleDeleteSet} disabled={loading}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteSetDialog
