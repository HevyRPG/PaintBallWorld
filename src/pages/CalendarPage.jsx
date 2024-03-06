import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import Autocomplete from '../components/CallendarContent/Autocomplete'
import PhotoGallery from '../components/ui/PhotoGallery'
import OpenEventsTable from '../components/CallendarContent/OpenEventsTable'
import PrivateEventsTable from '../components/CallendarContent/PrivateEventsTable'
import FieldInfo from '../components/CallendarContent/FieldInfo'

const CallendarPage = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864]
  const [mapPosition, setMapPosition] = useState(initialPosition)
  const [events, setEvents] = useState([])
  const initialFieldID = 'TESTGAL' // Set the initial fieldID to 'TEST'
  const [fieldID, setFieldID] = useState(initialFieldID)

  const handleAutocompleteSelection = (selectedCityName) =>
    console.log('Selected Value:', selectedCityName)

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
        <h1 className="text-4xl text-primary font-bold mb-4">Terminarz</h1>
        <p className="text-lg text-secondary-foreground">
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

        <div className="w-1/3 overflow-y-auto max-h-[500px]">
          {/* Sticky container for Autocomplete and Select components */}
          <div className="sticky top-0 bg-background z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Autocomplete onSelection={handleAutocompleteSelection} />
              </div>
              <div>
                <select
                  onChange={(e) =>
                    filterEventsByDistance(parseInt(e.target.value))
                  }
                  className="p-3 rounded text-primary-foreground"
                >
                  <option value="10">+10 KM</option>
                  <option value="50">+50 KM</option>
                  <option value="100">+100 KM</option>
                </select>
              </div>
            </div>
          </div>

          <ul className="text-white list-none p-0 grid">
            <li
              onClick={() =>
                handleListClick([52.5478589721108, 16.65486723010457])
              }
              className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary bg-primary cursor-pointer text-primary-foreground hover:text-secondary-foreground transition-all flex flex-col items-center justify-center h-16"
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
      <div>
        <FieldInfo
          name="Nazwa Pola"
          owner="Owner Name"
          address="Address Here"
          geoTag="GeoTag Information"
          fieldID="TESTGAL"
          description="Opis pola"
        />
      </div>
      <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center justify-center  ">
        <div className="w-full ">
          <h1 className="text-white text-xl font-bold italic mb-4 ">
            Najbliższe rozgrywki otwarte na{' '}
            <span className="text-primary">NAZWA POLA</span>
          </h1>
          <OpenEventsTable fieldID="123" />
        </div>
      </div>
      <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center justify-center ">
        <div className="w-full">
          <h1 className="text-white text-xl font-bold italic mb-4">
            Najbliższe wolne terminy na zamówienie pola na{' '}
            <span className="text-primary">NAZWA POLA</span>
          </h1>
          <PrivateEventsTable fieldID="123" />
        </div>
      </div>
    </>
  )
}

export default CallendarPage
