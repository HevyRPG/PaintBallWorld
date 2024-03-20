import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import Autocomplete from '../components/CallendarContent/Autocomplete'
import OpenEventsTable from '../components/CallendarContent/OpenEventsTable'
import PrivateEventsTable from '../components/CallendarContent/PrivateEventsTable'
import FieldInfo from '../components/CallendarContent/FieldInfo'
import SelectComponent from '../components/CallendarContent/SelectComponent'
import { Button } from '@/components/ui/button'

const CallendarPage = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864]
  const [mapPosition, setMapPosition] = useState(initialPosition)
  const [events, setEvents] = useState([])
  const initialFieldID = 'TESTGAL' // Set the initial fieldID to 'TEST'
  const [fieldID, setFieldID] = useState(initialFieldID)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistance, setSelectedDistance] = useState('10')

  const fetchCityData = async (cityName) => {
    if (useTestData) {
      // Use test data
      const { name, geotag } = testCityData
      setSelectedCity(name)
      setMapPosition(geotag)
    } else {
      // Fetch real data using Axios
      const apiUrl = `https://example.com/api/cities/${encodeURIComponent(
        cityName
      )}`
      try {
        const response = await axios.get(apiUrl)
        const { name, geotag } = response.data
        setSelectedCity(name)
        setMapPosition(geotag.split(',').map(Number))
      } catch (error) {
        console.error('Failed to fetch city data:', error)
      }
    }
  }

  const handleAutocompleteSelection = (city) => {
    setSelectedCity(city)
  }

  // Handler for updating the selected distance
  const handleSelectChange = (distance) => {
    setSelectedDistance(distance)
  }

  // Function to handle the search click action
  const useTestData = true // Toggle this to false for real API calls

  const testCityData = {
    name: 'Pamiątkowo',
    geotag: [52.5542, 16.6827], // Example geotag
  }

  const handleSearchClick = async () => {
    if (useTestData) {
      // Use test data for demonstration
      const { name, geotag } = testCityData
      setSelectedCity(name)
      setMapPosition(geotag) // Assuming geotag is already an array [lat, lng]
      console.log(
        `Test mode: Selected city - ${name}, Geotag - ${geotag.join(',')}`
      )
    } else {
      // Fetch real data using Axios
      const apiUrl = `https://example.com/api/cities/${encodeURIComponent(
        selectedCity
      )}`
      try {
        const response = await axios.get(apiUrl)
        const { name, geotag } = response.data // Ensure your API's response structure is correctly referenced
        setSelectedCity(name)
        setMapPosition(geotag.split(',').map(Number))
        console.log(`Real mode: Selected city - ${name}, Geotag - ${geotag}`)
      } catch (error) {
        console.error('Failed to fetch city data:', error)
      }
    }
  }

  const mapRef = useRef()

  const handleListClick = (newPosition) => {
    setMapPosition(newPosition)
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

        <div className="overflow-y-auto  w-1/3 max-h-[500px]">
          <div className="sticky top-0 mr-2 bg-background z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Autocomplete onSelection={handleAutocompleteSelection} />
              </div>
              <div>
                <SelectComponent onChange={handleSelectChange} />
              </div>
              <div>
                <Button
                  variant="default"
                  className="p-6 rounded"
                  onClick={handleSearchClick}
                >
                  Szukaj
                </Button>
              </div>
            </div>
          </div>

          <ul className="text-white list-none mr-2 p-0 grid">
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
      <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center border justify-center  ">
        <div className="w-full ">
          <h1 className="text-white text-xl font-bold italic mb-4 ">
            Najbliższe rozgrywki otwarte na{' '}
            <span className="text-primary">NAZWA POLA</span>
          </h1>
          <OpenEventsTable fieldID="123" />
        </div>
      </div>
      <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center border justify-center ">
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
