import React, { useState, useEffect, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet'
import L from 'leaflet' // Leaflet for custom markers
import axios from 'axios'
import Autocomplete from '../components/CallendarContent/Autocomplete'
import OpenEventsTable from '../components/CallendarContent/OpenEventsTable'
import PrivateEventsTable from '../components/CallendarContent/PrivateEventsTable'
import FieldInfo from '../components/CallendarContent/FieldInfo'
import SelectComponent from '../components/CallendarContent/SelectComponent'
import { Button } from '@/components/ui/button'

const CallendarPage = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864]
  const [mapCenter, setMapCenter] = useState(initialPosition)
  const [cityPosition, setCityPosition] = useState(initialPosition)
  const [fieldMarkers, setFieldMarkers] = useState([])
  const [events, setEvents] = useState([])
  const initialFieldID = 'TESTGAL' // Set the initial fieldID to 'TEST'
  const [fieldID, setFieldID] = useState(initialFieldID)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistance, setSelectedDistance] = useState('10000')
  const [radius, setRadius] = useState(null)

  const handleAutocompleteSelection = (city) => {
    setSelectedCity(city)
  }

  const handleSelectChange = (distance) => {
    setSelectedDistance(distance) // Update selected distance but not the radius yet
  }

  // Function to handle the search click action
  const useTestData = true // Toggle this to false for real API calls

  const testCityData = {
    name: 'Pamiątkowo',
    geotag: [52.5542, 16.6827], // Example geotag
  }

  const handleSearchClick = async () => {
    // Ensure there's a city selected before proceeding
    if (!selectedCity) {
      alert('Please select a city first.')
      return // Exit the function if no city is selected
    }

    if (selectedCity === 'Pamiątkowo') {
      // If "Pamiątkowo" is explicitly searched for, use the test data
      const { name, geotag } = testCityData
      setCityPosition(geotag) // Update city marker position
      setMapCenter(geotag) // Center the map on the selected city
      setRadius(Number(selectedDistance))
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
        setRadius(Number(selectedDistance)) // Update the radius based on the selected distance
        console.log(`Real mode: Selected city - ${name}, Geotag - ${geotag}`)
      } catch (error) {
        console.error('Failed to fetch city data:', error)
      }
    }
  }

  function MapCenter({ center }) {
    const map = useMap()
    map.setView(center, map.getZoom())
    return null
  }

  const mapRef = useRef()

  const handleListClick = (newPosition) => {
    setFieldMarkers((currentMarkers) => [...currentMarkers, newPosition])
    setMapCenter(newPosition) // Update map center to new position
  }

  const svgField = `<svg fill="#3B82F6" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.36 614.36" xml:space="preserve" stroke="#3B82F6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="19.454366"> <g> <g> <path d="M507.691,110.215l-42.667-32c-3.221-2.411-7.552-2.816-11.157-1.003c-3.605,1.813-5.888,5.504-5.888,9.536v95.637 c-36.373-10.987-89.365-16.235-132.117-18.709c-1.088-0.832-2.347-1.493-3.733-1.877c-2.923-0.811-5.888-0.235-8.32,1.237 c-20.373-1.003-37.419-1.387-47.829-1.515V134.77l38.4-28.8c2.688-2.005,4.267-5.184,4.267-8.533c0-3.349-1.579-6.528-4.267-8.533 l-42.667-32c-3.2-2.432-7.552-2.795-11.157-1.003c-3.627,1.813-5.909,5.504-5.909,9.536v96.085 c-10.411,0.149-27.456,0.533-47.829,1.515c-2.432-1.472-5.397-2.027-8.32-1.237c-1.408,0.384-2.667,1.045-3.733,1.877 c-52.16,3.029-119.616,10.155-153.451,26.816v-34.411l38.4-28.8c2.709-2.005,4.267-5.184,4.267-8.533 c0-3.349-1.579-6.528-4.267-8.533l-42.667-32c-3.221-2.411-7.509-2.816-11.157-1.003C2.283,79.026,0,82.717,0,86.749v128 c0,0.256,0.021,0.683,0.064,1.173l21.205,190.827c0,33.003,84.117,45.568,149.333,50.368v-71.701c0-17.643,14.357-32,32-32h85.333 c17.643,0,32,14.357,32,32v71.765c65.216-4.693,149.312-17.003,149.269-49.259l21.141-190.229c0-0.085,0.021-0.192,0.021-0.277 c0.043-0.491,0.107-1.003,0.149-1.472c0.043-0.491,0.064-0.917,0.064-1.173c0-9.771-8.107-17.749-21.333-24.256v-34.411 l38.443-28.821c2.688-2.005,4.267-5.184,4.267-8.533C511.957,115.399,510.379,112.221,507.691,110.215z M21.76,214.834 c3.499-4.779,18.347-10.859,43.648-16.469c0.299,0.576,0.469,1.195,0.875,1.707l29.333,36.672 C51.627,229.959,26.24,221.127,21.76,214.834z M125.675,240.647c-0.277-0.448-0.384-1.003-0.747-1.451l-36.245-45.312 c22.933-3.84,51.285-7.147,85.013-9.131l16.576,60.757C166.336,244.466,144.789,242.759,125.675,240.647z M277.995,246.301 c-2.539,0.064-4.949,0.171-7.531,0.213c-8.171,0.149-16.555,0.235-25.173,0.235c-8.64,0-17.045-0.085-25.237-0.235 c-2.56-0.043-4.949-0.149-7.467-0.213l-17.067-62.592c15.637-0.619,32.213-0.96,49.771-0.96c17.557,0,34.133,0.341,49.771,0.96 L277.995,246.301z M364.907,240.669c-2.624,0.299-5.141,0.597-7.872,0.875c-2.901,0.299-6.037,0.555-9.045,0.811 c-3.456,0.32-6.827,0.64-10.432,0.939c-3.605,0.277-7.445,0.512-11.179,0.768c-3.243,0.213-6.357,0.469-9.707,0.661 c-4.352,0.256-8.96,0.448-13.504,0.661c-0.96,0.043-1.877,0.085-2.837,0.128l16.576-60.779c33.771,2.005,62.165,5.269,85.12,9.003 l-36.373,45.483C365.291,239.666,365.184,240.199,364.907,240.669z M469.376,213.789l-0.064,0.277 c-0.192,0.341-0.597,0.725-0.917,1.088c-0.363,0.405-0.619,0.789-1.131,1.216c-0.448,0.363-1.088,0.747-1.643,1.109 c-0.683,0.448-1.28,0.896-2.133,1.365c-0.661,0.363-1.536,0.747-2.283,1.109c-1.003,0.491-1.941,0.981-3.136,1.493 c-0.875,0.384-1.963,0.747-2.944,1.131c-1.344,0.512-2.624,1.045-4.139,1.557c-1.088,0.384-2.389,0.747-3.584,1.131 c-1.664,0.533-3.264,1.067-5.12,1.6c-1.323,0.384-2.837,0.747-4.245,1.131c-2.005,0.533-3.925,1.067-6.101,1.6 c-1.451,0.341-3.093,0.683-4.608,1.045c-2.389,0.555-4.736,1.088-7.317,1.621c-1.664,0.341-3.52,0.661-5.248,1.003 c-2.688,0.512-5.291,1.045-8.171,1.557c-2.069,0.363-4.331,0.704-6.485,1.067c-1.685,0.277-3.349,0.555-5.099,0.832l29.312-36.629 c0.491-0.619,0.704-1.344,1.045-2.027C451.648,203.655,466.773,209.629,469.376,213.789z"></path> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M507.691,110.215l-42.667-32c-3.221-2.411-7.552-2.816-11.157-1.003c-3.605,1.813-5.888,5.504-5.888,9.536v95.637 c-36.373-10.987-89.365-16.235-132.117-18.709c-1.088-0.832-2.347-1.493-3.733-1.877c-2.923-0.811-5.888-0.235-8.32,1.237 c-20.373-1.003-37.419-1.387-47.829-1.515V134.77l38.4-28.8c2.688-2.005,4.267-5.184,4.267-8.533c0-3.349-1.579-6.528-4.267-8.533 l-42.667-32c-3.2-2.432-7.552-2.795-11.157-1.003c-3.627,1.813-5.909,5.504-5.909,9.536v96.085 c-10.411,0.149-27.456,0.533-47.829,1.515c-2.432-1.472-5.397-2.027-8.32-1.237c-1.408,0.384-2.667,1.045-3.733,1.877 c-52.16,3.029-119.616,10.155-153.451,26.816v-34.411l38.4-28.8c2.709-2.005,4.267-5.184,4.267-8.533 c0-3.349-1.579-6.528-4.267-8.533l-42.667-32c-3.221-2.411-7.509-2.816-11.157-1.003C2.283,79.026,0,82.717,0,86.749v128 c0,0.256,0.021,0.683,0.064,1.173l21.205,190.827c0,33.003,84.117,45.568,149.333,50.368v-71.701c0-17.643,14.357-32,32-32h85.333 c17.643,0,32,14.357,32,32v71.765c65.216-4.693,149.312-17.003,149.269-49.259l21.141-190.229c0-0.085,0.021-0.192,0.021-0.277 c0.043-0.491,0.107-1.003,0.149-1.472c0.043-0.491,0.064-0.917,0.064-1.173c0-9.771-8.107-17.749-21.333-24.256v-34.411 l38.443-28.821c2.688-2.005,4.267-5.184,4.267-8.533C511.957,115.399,510.379,112.221,507.691,110.215z M21.76,214.834 c3.499-4.779,18.347-10.859,43.648-16.469c0.299,0.576,0.469,1.195,0.875,1.707l29.333,36.672 C51.627,229.959,26.24,221.127,21.76,214.834z M125.675,240.647c-0.277-0.448-0.384-1.003-0.747-1.451l-36.245-45.312 c22.933-3.84,51.285-7.147,85.013-9.131l16.576,60.757C166.336,244.466,144.789,242.759,125.675,240.647z M277.995,246.301 c-2.539,0.064-4.949,0.171-7.531,0.213c-8.171,0.149-16.555,0.235-25.173,0.235c-8.64,0-17.045-0.085-25.237-0.235 c-2.56-0.043-4.949-0.149-7.467-0.213l-17.067-62.592c15.637-0.619,32.213-0.96,49.771-0.96c17.557,0,34.133,0.341,49.771,0.96 L277.995,246.301z M364.907,240.669c-2.624,0.299-5.141,0.597-7.872,0.875c-2.901,0.299-6.037,0.555-9.045,0.811 c-3.456,0.32-6.827,0.64-10.432,0.939c-3.605,0.277-7.445,0.512-11.179,0.768c-3.243,0.213-6.357,0.469-9.707,0.661 c-4.352,0.256-8.96,0.448-13.504,0.661c-0.96,0.043-1.877,0.085-2.837,0.128l16.576-60.779c33.771,2.005,62.165,5.269,85.12,9.003 l-36.373,45.483C365.291,239.666,365.184,240.199,364.907,240.669z M469.376,213.789l-0.064,0.277 c-0.192,0.341-0.597,0.725-0.917,1.088c-0.363,0.405-0.619,0.789-1.131,1.216c-0.448,0.363-1.088,0.747-1.643,1.109 c-0.683,0.448-1.28,0.896-2.133,1.365c-0.661,0.363-1.536,0.747-2.283,1.109c-1.003,0.491-1.941,0.981-3.136,1.493 c-0.875,0.384-1.963,0.747-2.944,1.131c-1.344,0.512-2.624,1.045-4.139,1.557c-1.088,0.384-2.389,0.747-3.584,1.131 c-1.664,0.533-3.264,1.067-5.12,1.6c-1.323,0.384-2.837,0.747-4.245,1.131c-2.005,0.533-3.925,1.067-6.101,1.6 c-1.451,0.341-3.093,0.683-4.608,1.045c-2.389,0.555-4.736,1.088-7.317,1.621c-1.664,0.341-3.52,0.661-5.248,1.003 c-2.688,0.512-5.291,1.045-8.171,1.557c-2.069,0.363-4.331,0.704-6.485,1.067c-1.685,0.277-3.349,0.555-5.099,0.832l29.312-36.629 c0.491-0.619,0.704-1.344,1.045-2.027C451.648,203.655,466.773,209.629,469.376,213.789z"></path> </g> </g> </g></svg>`
  const customIcon = new L.divIcon({
    className: 'custom-icon', // Custom class for further styling if needed
    html: svgField,
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [12, 12], // Point of the icon which will correspond to marker's location
    popupAnchor: [10, -10], // Point from which the popup should open relative to iconAnchor
  })

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
            center={mapCenter}
            zoom={11}
            scrollWheelZoom={true}
            className="leaflet-container"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={cityPosition}
              // Use the custom blue marker for the city
            >
              <Popup>City Details</Popup>
            </Marker>
            {fieldMarkers.map((position, idx) => (
              <Marker
                key={idx}
                position={position}
                icon={customIcon} // Use the custom green marker for fields
              >
                <Popup>Field Details</Popup>
              </Marker>
            ))}
            <Circle
              center={cityPosition}
              radius={Number(radius)}
              fillColor="green"
              color="blue"
              weight={4}
              opacity={0.2}
              fillOpacity={0.2}
            />
            <MapCenter center={mapCenter} />
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
          fieldID="071A0D1E-3966-42F6-998E-03A9B3F05370"
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
