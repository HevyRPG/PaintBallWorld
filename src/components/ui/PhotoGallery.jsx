import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import axios from 'axios' // Import Axios
import APIHeaders from '@/components/APIHeaders'

function PhotoGallery({ fieldID, photoGalleryProps, width, height }) {
  const [images, setImages] = useState([])
  const [error, setError] = useState('')

  const defaultPhotoGalleryProps = {
    showFullscreenButton: false,
    showThumbnails: true,
    showPlayButton: false,
    disableLazyLoad: true,
    autoPlay: true,
  }

  useEffect(() => {
    if (fieldID === 'TESTGAL') {
      // If fieldID is 'TESTGAL', display placeholder images
      setImages([
        {
          original: '/paint1.jpg',
          thumbnail: '/paint1.jpg',
          description: 'Placeholder Image 1',
          originalHeight: 300,
          originalWidth: 300,
        },
        {
          original: '/paint2.jpg',
          thumbnail: '/paint2.jpg',
          description: 'Placeholder Image 2',
          originalHeight: 300,
          originalWidth: 300,
        },
        {
          original: '/paint3.jpg',
          thumbnail: '/paint3.jpg',
          description: 'Placeholder Image 3',
          originalHeight: 300,
          originalWidth: 300,
        },
        {
          original: '/paint4.jpg',
          thumbnail: '/paint4.jpg',
          description: 'Placeholder Image 4',
          originalHeight: 300,
          originalWidth: 300,
        },
        // Add more placeholder images as needed
      ])
    } else {
      // Fetch images based on the fieldID using Axios and custom API headers
      axios
        .get(`api/Field/FieldManagement/photos/${fieldID}`, APIHeaders)
        .then((response) => {
          // Assuming response.data is an array of image objects
          const formattedImages = response.data.map((image) => ({
            original: image.url, // Assuming the API provides an `url` field for the image
            thumbnail: image.url, // Use the same URL for thumbnail if a separate one isn't provided
            description: image.description || 'No description', // Use a placeholder or omit if not needed
            originalHeight: 300, // Placeholder or extract from the API response if available
            originalWidth: 300, // Placeholder or extract from the API response if available
          }))

          setImages(formattedImages)
          setError('') // Clear any previous errors
        })
        .catch((error) => {
          console.error('Error fetching images:', error)
          setError('Failed to fetch images. Please try again later.') // Set an error message to display
        })
    }
  }, [fieldID]) // Re-run effect whenever fieldID changes

  return (
    <ImageGallery
      items={images}
      className="image-gallery"
      {...defaultPhotoGalleryProps} // Spread the photoGalleryProps
      renderItem={(item) => (
        <div className="image-gallery-image">
          <img
            src={item.original}
            alt={item.originalAlt}
            style={{
              width: `${width}px`, // Set width from props
              height: `${height}px`, // Set height from props
              objectFit: 'fill', // Stretch the image to fit container
            }}
          />
        </div>
      )}
    />
  )
}

export default PhotoGallery
