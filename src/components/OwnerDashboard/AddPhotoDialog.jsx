import React, { useState } from 'react'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'
import APIKEYS from '@/components/APIKEYS'

const PhotoDialog = ({ fieldId }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('authToken')
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit.')
      } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only PNG and JPG files are allowed.')
      } else {
        setSelectedFile(file)
        setError(null)

        const reader = new FileReader()
        reader.onload = () => {
          setPreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const uploadPhoto = async () => {
    if (!selectedFile) {
      setError('Proszę wybrać zdjęcie.')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('photos', selectedFile)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(
        `${apiUrl}/api/Field/FieldManagement/photos/${fieldId}`,
        formData,
        config
      )
      console.log('Photo uploaded successfully:', response.data)
      if (response.status == 200) {
        setError('Dodano zdjęcie!')
      }
    } catch (error) {
      console.error('Error uploading photo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".png,.jpg,.jpeg" />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: '100%', maxHeight: 300 }}
        />
      )}
      <p className="my-5 text-secondary-foreground">
        Maksymalny rozmiar zdjęcia to 5MB. Zdjęcia wyświetlane są w wymiarach
        800x500 (16:10).
      </p>

      {selectedFile && (
        <div>
          <Button variant="default" onClick={uploadPhoto} disabled={loading}>
            Wyślij
          </Button>
        </div>
      )}
      {error && (
        <p
          className={
            error === 'Dodano zdjęcie!' ? 'text-green-500' : 'text-red-500'
          }
        >
          {error}
        </p>
      )}
    </div>
  )
}

const AddPhotoDialog = ({ fieldId }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="lg" className="rounded border-primary">
          Dodaj zdjęcie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj zdjęcie</DialogTitle>
        </DialogHeader>
        <PhotoDialog fieldId={fieldId} />
      </DialogContent>
    </Dialog>
  )
}

export default AddPhotoDialog
