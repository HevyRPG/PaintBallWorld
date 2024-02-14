import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import Autocomplete from '../components/Autocomplete'
import PhotoGallery from '../components/PhotoGallery'

const CallendarPage = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864]
  const [mapPosition, setMapPosition] = useState(initialPosition)
  const [events, setEvents] = useState([])
  const initialFieldID = 'TESTGAL' // Set the initial fieldID to 'TEST'
  const [fieldID, setFieldID] = useState(initialFieldID)

  const photoGalleryProps = {
    showFullscreenButton: false,
    showThumbnails: true,
    showPlayButton: false,
    disableLazyLoad: true,
    autoPlay: true,
  }

  const handleFieldIDChange = (newFieldID) => {
    setFieldID(newFieldID)
  }
  const mapRef = useRef()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://your-api-url/events')
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleListClick = (newPosition) => {
    setMapPosition(newPosition)
  }

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <>
      <div className="container mx-auto mt-8 max-w-screen-2xl">
        <h1 className="text-4xl text-white font-bold mb-4">Terminarz</h1>
        <p className="text-lg text-white">
          W terminarzu można łatwo znaleźć najbliższe pola i rozgrywki w danej
          okolicy
        </p>
      </div>
      <div className="container mx-auto mt-8 mb-8 max-w-screen-2xl flex">
        <div className="w-2/3">
          <MapContainer
            key={mapPosition.join(',')}
            center={mapPosition}
            zoom={13}
            scrollWheelZoom={true}
            className="leaflet-container"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={mapPosition}>
              <Popup>tetss</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="w-1/3 overflow-y-auto max-h-[500px] bg-bgs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Autocomplete />
            </div>
            <div>
              <select
                onChange={(e) =>
                  filterEventsByDistance(parseInt(e.target.value))
                }
                className="p-3 rounded"
              >
                <option value="10">+10 KM</option>
                <option value="50">+50 KM</option>
                <option value="100">+100 KM</option>
              </select>
            </div>
          </div>

          <ul className="text-white list-none p-0 grid">
            <li
              onClick={() =>
                handleListClick([52.5478589721108, 16.65486723010457])
              }
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary bg-indigo-900 cursor-pointer transition-all flex flex-col items-center justify-center h-16"
            >
              <span className="text-center font-bold">
                Paintball Wielkopolska
              </span>
              <span className="text-center italic">Pamiątkowo</span>
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center h-16"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 12.68])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
            <li
              onClick={() => handleListClick([53.548, 16.65])}
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Event 2
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center justify-center">
        {/* First div */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <h1 className="text-indigo-400 text-xl font-bold italic">
            NAZWA POLA
          </h1>
          <h1 className="text-yellow-300 text-xl">OWNER</h1>
          <h1 className="text-white text-xl">ADRES</h1>
          <h1 className="text-gray-400 text-xl">GEOTAG</h1>
        </div>

        {/* Second div */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <div className="min-h-600 min-w-400">
            <PhotoGallery
              fieldID="TESTGAL"
              photoGalleryProps={photoGalleryProps}
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center justify-center">
        <h1 className="text-white text-xl">Najbliższe rozgrywki otwarte</h1>
      </div>
      <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center justify-center">
        <h1 className="text-white text-xl">Najbliższe wolne terminy</h1>
      </div>
    </>
  )
}

export default CallendarPage
