import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios' // Import Axios for making HTTP requests

const CallendarPage = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864] // Initial map position
  const [mapPosition, setMapPosition] = useState(initialPosition)
  const [events, setEvents] = useState([]) // State to store fetched events
  const [selectedDistance, setSelectedDistance] = useState(null) // State to store selected distance
  const [searchInput, setSearchInput] = useState('') // State to store search input
  const [isDistanceExpanded, setIsDistanceExpanded] = useState(false) // State to manage distance filter expansion

  const handleListClick = (newPosition) => {
    setMapPosition(newPosition)
  }

  const mapRef = useRef()

  useEffect(() => {
    // Fetch events when component mounts
    fetchEvents()
  }, [])

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://your-api-url/events')
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  // Filter events based on selected distance
  const filterEventsByDistance = (distance) => {
    setSelectedDistance(distance)
    setIsDistanceExpanded(false) // Collapse the distance filter
    // Implement filtering logic based on the selected distance
    // You can use a library like GeoLib to calculate distances
  }

  // Filter events based on search input
  const filterEventsBySearch = (input) => {
    setSearchInput(input)
    // Implement filtering logic based on the search input
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
        <div className="w-[1100px]">
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
            {events.map((event) => (
              <Marker
                key={event.id}
                position={[event.latitude, event.longitude]}
              >
                <Popup>{event.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="w-[436px] overflow-y-auto bg-bgs max-h-[500px]">
          {/* Search bar */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => filterEventsBySearch(e.target.value)}
              className="w-1/2 p-2 mr-2"
            />
            {/* Distance filter */}
            <div className="relative">
              <button
                onClick={() => setIsDistanceExpanded(!isDistanceExpanded)}
                className="rounded-md border border-gray-300 bg-secondary text-gray-800 px-4 py-2 w-32"
              >
                +{selectedDistance !== null ? selectedDistance : '0'} km
              </button>
              {isDistanceExpanded && (
                <div className="absolute top-full right-0 bg-white p-2 border rounded flex flex-col">
                  <button
                    className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary "
                    onClick={() => filterEventsByDistance(0)}
                  >
                    +0 km
                  </button>
                  <button
                    className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary "
                    onClick={() => filterEventsByDistance(20)}
                  >
                    +20 km
                  </button>
                  <button
                    className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary "
                    onClick={() => filterEventsByDistance(50)}
                  >
                    +50 km
                  </button>
                  <button
                    className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary "
                    onClick={() => filterEventsByDistance(100)}
                  >
                    +100 km
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Example scrollable list */}
          <ul className="text-white list-none p-0 grid">
            {events.map((event) => (
              <li
                key={event.id}
                onClick={() =>
                  handleListClick([event.latitude, event.longitude])
                }
                className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
              >
                {event.name}
              </li>
            ))}
            <li
              onClick={() =>
                handleListClick([52.5478589721108, 16.65486723010457])
              }
              className="mb-2 p-2  active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Test pos
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
      <div className="container mx-auto h-96 mt-8 mb-4 max-w-screen-2xl bg-bgs">
        <h1 className="text-white">KURWY</h1>
      </div>
    </>
  )
}

export default CallendarPage
