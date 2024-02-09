import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Papa from 'papaparse' // Import PapaParse for parsing CSV
import 'leaflet/dist/leaflet.css'
import '../index.css'

const TestMap = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864]
  const [mapPosition, setMapPosition] = useState(initialPosition)
  const [markers, setMarkers] = useState([])
  const [filteredMarkers, setFilteredMarkers] = useState([]) // New state for filtered markers
  const [searchTerm, setSearchTerm] = useState('')
  const [radius, setRadius] = useState(5)

  useEffect(() => {
    // Load and parse CSV data
    Papa.parse('../assets/geoData.csv', {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const csvMarkers = result.data.map((city) => ({
          name: city.name,
          position: [parseFloat(city['@lat']), parseFloat(city['@lon'])],
        }))
        setMarkers(csvMarkers)
        setFilteredMarkers(csvMarkers) // Initialize filtered markers with all markers
      },
    })
  }, [])

  const handleSearch = () => {
    const newMarkers = [...markers]

    const filteredMarkers = newMarkers.filter((marker) => {
      const distance = L.latLng(marker.position).distanceTo(mapPosition) / 1000
      return distance <= radius
    })

    setFilteredMarkers(filteredMarkers) // Update the filteredMarkers state
  }

  return (
    <>
      <div className="container mx-auto mt-8 mb-8 max-w-screen-xl flex">
        <div className="w-[900px]">
          <MapContainer
            center={mapPosition}
            zoom={13}
            scrollWheelZoom={true}
            className="leaflet-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredMarkers.map((marker, index) => (
              <Marker key={index} position={marker.position}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="w-[400px] overflow-y-auto bg-bgs max-h-[500px]">
          {/* Search Bar */}
          <div className="mb-2 p-2 flex justify-between">
            <input
              type="text"
              placeholder="Search location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            >
              <option value={5}>5 km</option>
              <option value={20}>20 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
              <option value={150}>150 km</option>
            </select>
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Example scrollable list */}
          <ul className="text-white list-none p-0 grid">
            {filteredMarkers.map((marker, index) => (
              <li
                key={index}
                onClick={() => setMapPosition(marker.position)}
                className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
              >
                {marker.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-white">KURWY</h1>
      </div>
    </>
  )
}

export default TestMap
