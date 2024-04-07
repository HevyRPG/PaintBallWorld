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
      Authorization: `Bearer ${token}`, // Append Authorization header
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
        // Show image preview
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
      setError('Please select a file.')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('photo', selectedFile)
    try {
      // Use the provided fieldId in the API endpoint
      const response = await axios.post(
        `/api/Field/FieldManagement/photos/${fieldId}`,
        formData
      )
      console.log('Photo uploaded successfully:', response.data)
      // You can handle success behavior here, such as closing the dialog
    } catch (error) {
      console.error('Error uploading photo:', error)
      if (error.response) {
        setError('Error uploading photo: ' + error.response.data.message)
      } else {
        setError('Error uploading photo. Please try again later.')
      }
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

const AddPhotoDialog = ({ fieldId }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="lg" className="rounded border-primary">
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
