import React from 'react'
import PhotoGallery from '../ui/PhotoGallery'

const FieldInfo = ({ name, owner, address, description, geoTag, fieldID }) => {
  // Sprawdź, czy wszystkie wymagane propsy są dostarczone
  const isEmpty =
    !name || !owner || !address || !geoTag || !fieldID || !description

  if (isEmpty) {
    return (
      <div className="text-center text-xl font-bold">
        Wybierz <span className="text-primary">pole</span> aby uzyskać więcej
        informacji
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-8 mb-4 p-3 max-w-screen-2xl bg-background border rounded border-primary grid md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-primary text-2xl font-bold italic mb-2">{name}</h1>
        <h1 className="text-yellow-300 text-lg mb-1">{owner}</h1>
        <h1 className="text-white text-lg mb-1">{address}</h1>
        <h1 className="text-gray-400 text-lg mb-1">{geoTag}</h1>
        <p className="text-secondary-foreground mt-3">{description}</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full h-full">
          <PhotoGallery fieldID={fieldID} width={600} height={400} />
        </div>
      </div>
    </div>
  )
}

export default FieldInfo
