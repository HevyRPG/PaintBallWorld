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

const PhotoDeleteButton = ({ photoId, onDelete }) => {
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
      await axios.delete(`/api/Field/FieldManagement/photos/${photoId}`, config)
      onDelete(photoId)
    } catch (error) {
      console.error('Error deleting photo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      Usuń
    </Button>
  )
}

const PhotoList = ({ fieldId }) => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `/api/Field/FieldManagement/photos/${fieldId}`
        )
        setPhotos(response.data)
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    }
    fetchPhotos()
  }, [fieldId])

  const handleDelete = (deletedPhotoId) => {
    setPhotos(photos.filter((photo) => photo.id !== deletedPhotoId))
  }

  return (
    <div>
      <h2>Zdjęcia</h2>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={photo.url}
              alt={`Photo ${photo.id}`}
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
            <PhotoDeleteButton photoId={photo.id} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  )
}

const DeletePhotoDialog = ({ fieldId }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="destructive"
          size="lg"
          className="rounded border-primary"
        >
          Usuń zdjęcie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuń zdjęcie</DialogTitle>
        </DialogHeader>

        <PhotoList fieldId={fieldId} />
      </DialogContent>
    </Dialog>
  )
}

export default DeletePhotoDialog
