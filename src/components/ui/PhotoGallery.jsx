import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

function PhotoGallery({ fieldID, photoGalleryProps, width, height }) {
  const [images, setImages] = useState([])

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
      // Fetch images based on the fieldID
      fetch(`https://your-api-endpoint.com/images?fieldID=${fieldID}`)
        .then((response) => response.json())
        .then((data) => {
          setImages(data)
        })
        .catch((error) => {
          console.error('Error fetching images:', error)
        })
    }
  }, [fieldID]) // Re-run effect whenever fieldID changes

  return (
    <div className="container mx-auto">
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
    </div>
  )
}

export default PhotoGallery
