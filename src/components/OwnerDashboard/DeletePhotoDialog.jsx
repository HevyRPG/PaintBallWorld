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
      Authorization: `Bearer ${token}`,
    },
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this photo?'
    )
    if (!confirmation) return

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
    <Button
      variant="destructive"
      size="lg"
      onClick={handleDelete}
      disabled={loading}
    >
      Usuń
    </Button>
  )
}

const PhotoList = ({ fieldId }) => {
  const token = Cookies.get('authToken')
  const [photos, setPhotos] = useState([])
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `/api/Field/FieldManagement/photos/${fieldId}`,
          config
        )
        setPhotos(response.data)
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    }
    fetchPhotos()
  }, [fieldId])

  const handleDelete = (deletedPhotoId) => {
    setPhotos(photos.filter((photo) => photo.id.value !== deletedPhotoId))
  }

  return (
    <div>
      <h2>Zdjęcia</h2>
      <div>
        {photos.map((photo) => (
          <div key={photo.id.value} className="flex items-center space-x-4">
            <img
              src={photo.url}
              alt={`Photo ${photo.id.value}`}
              className="max-w-xs max-h-xs m-2"
            />
            <PhotoDeleteButton
              photoId={photo.id.value}
              onDelete={handleDelete}
            />
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
