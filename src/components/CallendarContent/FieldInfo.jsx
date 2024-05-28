import React from 'react'
import PhotoGallery from '../ui/PhotoGallery'
import { Link } from 'react-router-dom'
import FieldInfoSets from './FieldInfoSets'
import axios from 'axios'
import APIKEYS from '../APIKEYS'
import { useState, useEffect } from 'react'

const FieldInfo = ({
  name,
  owner,
  address,
  description,
  geoTag,
  regulations,
  fieldID,
}) => {
  const itemsPerPage = 2
  const [rating, setRating] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(
          `${apiUrl}/api/Rating/FieldRating?fieldId=${fieldID}`,
          APIKEYS
        )
        setRating(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user history:', error)
        setError('Error fetching user history')
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const isEmpty = !fieldID

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
        {name !== null && (
          <h1 className="text-primary text-2xl font-bold italic mb-2">
            {name}
          </h1>
        )}
        <h1 className="text-yellow-300 text-lg mb-1">{owner}</h1>
        {address !== null && (
          <h1 className="text-white text-lg mb-1">{address}</h1>
        )}
        {geoTag !== null && (
          <h1 className="text-gray-400 text-lg mb-1">{geoTag}</h1>
        )}

        {regulations && (
          <Link to={regulations} className="underline italic text-primary">
            Regulamin pola
          </Link>
        )}
        {description && (
          <p className="text-secondary-foreground italic mt-3">{description}</p>
        )}
        <FieldInfoSets fieldId={fieldID} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-full">
          <PhotoGallery fieldID={fieldID} width={800} height={500} />
        </div>
      </div>
    </div>
  )
}

export default FieldInfo
