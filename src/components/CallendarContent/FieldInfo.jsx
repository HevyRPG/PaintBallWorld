import React from 'react'
import PhotoGallery from '../ui/PhotoGallery'

const FieldInfo = ({ name, owner, address, description, geoTag, fieldID }) => {
  // Check if all necessary props are provided
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
    <div className="container mx-auto mt-8 mb-4 p-3 max-w-screen-2xl bg-background border rounded border-primary flex flex-wrap items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <h1 className="text-primary text-2xl font-bold italic">{name}</h1>
        <h1 className="text-yellow-300 text-xl">{owner}</h1>
        <h1 className="text-white text-xl">{address}</h1>
        <h1 className="text-gray-400 text-xl">{geoTag}</h1>
        <p className="text-secondary-foreground mt-3">{description}</p>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="min-h-[600px] min-w-[400px]">
          <PhotoGallery fieldID={fieldID} width={600} height={400} />
        </div>
      </div>
    </div>
  )
}

export default FieldInfo
