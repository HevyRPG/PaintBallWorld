import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../index.css'

const CalendarPage = () => {
  const initialPosition = [51.505, -0.09] // Initial map position
  const [mapPosition, setMapPosition] = useState(initialPosition)

  const handleListClick = (newPosition) => {
    setMapPosition(newPosition)
  }
  return (
    <>
      <div className="container mx-auto mt-8 mb-8 max-w-screen-xl flex">
        <div className="w-[900px]">
          <MapContainer
            key={mapPosition.join(',')}
            center={mapPosition}
            zoom={13}
            scrollWheelZoom={true}
            className="leaflet-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="w-[400px] overflow-y-auto bg-bgs max-h-[500px]">
          {/* Example scrollable list */}
          <ul className="text-white  list-none p-0 grid">
            <li
              onClick={() => handleListClick([52.548, 16.65])}
              className="mb-2 p-2  active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center"
            >
              Test pos
            </li>
            <li className="mb-2 p-2 active:bg-primary rounded hover:bg-secondary cursor-pointer transition-all flex items-center justify-center">
              Event 2
            </li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 2</li>
            <li>Event 3</li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-white">KURWY</h1>
      </div>
    </>
  )
}

export default CalendarPage
