// Assuming your component file is in the same or a similar directory structure

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import APIHeaders from '../components/APIHeaders' // Adjust the path as necessary

function ImagesGallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url =
          'api/Field/FieldManagement/photos/071A0D1E-3966-42F6-998E-03A9B3F05370'
        const response = await axios.get(url, APIHeaders)
        setImages(response.data) // Assuming the response data is the array of image objects
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image.url} alt={`Fetched from URL ${index}`} />
      ))}
    </div>
  )
}

export default ImagesGallery
