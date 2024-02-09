import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../index.css'

const MapForCallendar = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864] // Initial map position
  const [mapPosition, setMapPosition] = useState(initialPosition)

  const handleListClick = (newPosition) => {
    setMapPosition(newPosition)
  }

  useEffect(() => {
    // Center the map when mapPosition changes
    mapRef.current?.setView(mapPosition, 13)
  }, [mapPosition])

  const mapRef = React.createRef()

  return (
    <>
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
            <Marker position={mapPosition}>
              <Popup>
                Wklej do nawigacji: <br />
                {mapPosition[0]},{mapPosition[1]}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="w-[436px] overflow-y-auto bg-bgs max-h-[500px]">
          {/* Example scrollable list */}
          <ul className="text-white list-none p-0 grid">
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
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MapForCallendar
