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
    const fetchImages = async () => {
      if (fieldID === 'TESTGAL') {
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
        try {
          const apiUrl = import.meta.env.VITE_API_URL
          const response = await axios.get(
            `${apiUrl}/api/Field/FieldManagement/photos/${fieldID}`,
            APIHeaders
          )
          console.log(fieldID)
          const formattedImages = response.data.map((image) => ({
            original: image.url, // Assuming `url` is the property name in your response
            thumbnail: image.url,
            description: image.description || 'No description',
            originalHeight: 300, // Placeholder or from the API
            originalWidth: 300, // Placeholder or from the API
          }))

          setImages(formattedImages)
          setError('') // Reset any previous errors
        } catch (error) {
          console.error('Error fetching images:', error)
          setError('Failed to fetch images. Please try again later.')
        }
      }
    }

    fetchImages()
  }, [fieldID]) // Re-run effect whenever fieldID changes

  return (
    <>
      {images.length === 0 && <p className="text-pink-400">Brak zdjęć :(</p>}
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
    </>
  )
}

export default PhotoGallery
