import React, { useState, useEffect, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'
import {
  Autocomplete,
  SelectedSuggestionContext,
} from '../components/CallendarContent/Autocomplete'
import OpenEventsTable from '../components/CallendarContent/OpenEventsTable'
import PrivateEventsTable from '../components/CallendarContent/PrivateEventsTable'
import FieldInfo from '../components/CallendarContent/FieldInfo'
import SelectComponent from '../components/CallendarContent/SelectComponent'
import { Button } from '@/components/ui/button'
import APIHeaders from '../components/APIHeaders'

const CallendarPage = () => {
  const initialPosition = [52.405453159532335, 16.92534423921864]
  const [mapCenter, setMapCenter] = useState(initialPosition)
  const [cityPosition, setCityPosition] = useState(initialPosition)
  const [fieldMarkers, setFieldMarkers] = useState([])
  const [events, setEvents] = useState([])
  const initialFieldID = null
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistance, setSelectedDistance] = useState('10')
  const [radius, setRadius] = useState(null)
  const [cityGeo, setCityGeo] = useState(null)
  const [cityID, setCityID] = useState('text')
  const [formattedData, setFormattedData] = useState([])

  const [fieldID, setFieldID] = useState(initialFieldID)
  const [fieldName, setFieldName] = useState('')

  const [fieldInfo, setFieldInfo] = useState({
    name: '',
    owner: '',
    address: '',
    geoTag: '',
    description: '',
    regulations: '',
  })
  const apiUrl = import.meta.env.VITE_API_URL

  const formatAddress = (address) => {
    const { street, houseNo, city } = address
    return `${street} ${houseNo}, ${city}`
  }

  const formatGeoTag = (location) => {
    const { latitude, longitude } = location
    return `${latitude}, ${longitude}`
  }

  const handleAutocompleteSelection = (suggestion) => {
    const { latitude, longitude, id } = suggestion

    console.log('Latitude:', latitude)
    console.log('Longitude:', longitude)
    console.log('ID:', id.value)
    const geoValue = [suggestion.latitude, suggestion.longitude]
    setCityGeo(geoValue)
    setSelectedCity(suggestion.name)
    setCityID(suggestion.id.value)
  }

  const handleSelectChange = (distance) => {
    setSelectedDistance(distance)
    console.log('DISTANCE:', distance)
  }

  const handleSearchClick = async () => {
    if (!selectedCity) {
      alert('Wybierz miasto')
      return
    }
    try {
      const id = cityID.toString()
      const radius = Number(selectedDistance)

      const response = await axios.get(
        `${apiUrl}/api/Field/Fields?id=${cityID}&radius=${radius}`,
        APIHeaders
      )

      const formattedData = response.data.map((item) => ({
        cfieldId: item.fieldId,
        name: item.fieldName,
        city: item.cityName,
        lat: item.geoPoint.coordinates[1],
        lon: item.geoPoint.coordinates[0],
      }))
      setFormattedData(formattedData)
      console.log('DANE Z API: ', formattedData)

      const newFieldMarkers = formattedData.map((item) => [item.lat, item.lon])
      setFieldMarkers(newFieldMarkers)
    } catch (error) {
      console.error('Error searching:', error)
    }

    setCityPosition(cityGeo)
    setMapCenter(cityGeo)
    setRadius(Number(selectedDistance))
    console.log(`Selected city - ${selectedCity}, Geotag - ${cityGeo}`)
    console.log(cityID)
  }
  function MapCenter({ center }) {
    const map = useMap()
    map.setView(center, map.getZoom())
    return null
  }

  const mapRef = useRef()

  const handleListClick = (newPosition, clickedfieldId) => {
    setFieldMarkers((currentMarkers) => [...currentMarkers, newPosition])
    setMapCenter(newPosition)
    setFieldID(clickedfieldId)
  }

  const fetchFieldInfo = async (fieldID) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/Field/Fields/${fieldID}`,
        APIHeaders
      )
      const { name, owner, address, description, regulations } = response.data
      const formattedAddress = formatAddress(address)
      const formattedGeoTag = formatGeoTag(address.location)
      setFieldInfo({
        name,
        owner,
        address: formattedAddress,
        geoTag: formattedGeoTag,
        description,
        regulations,
      })
      console.log(fieldInfo)
    } catch (error) {
      console.error('Error fetching field information:', error)
    }
  }

  useEffect(() => {
    if (fieldID !== '') {
      fetchFieldInfo(fieldID)
    }
  }, [fieldID])

  const svgField = `<svg fill="#3B82F6" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.36 614.36" xml:space="preserve" stroke="#3B82F6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="19.454366"> <g> <g> <path d="M507.691,110.215l-42.667-32c-3.221-2.411-7.552-2.816-11.157-1.003c-3.605,1.813-5.888,5.504-5.888,9.536v95.637 c-36.373-10.987-89.365-16.235-132.117-18.709c-1.088-0.832-2.347-1.493-3.733-1.877c-2.923-0.811-5.888-0.235-8.32,1.237 c-20.373-1.003-37.419-1.387-47.829-1.515V134.77l38.4-28.8c2.688-2.005,4.267-5.184,4.267-8.533c0-3.349-1.579-6.528-4.267-8.533 l-42.667-32c-3.2-2.432-7.552-2.795-11.157-1.003c-3.627,1.813-5.909,5.504-5.909,9.536v96.085 c-10.411,0.149-27.456,0.533-47.829,1.515c-2.432-1.472-5.397-2.027-8.32-1.237c-1.408,0.384-2.667,1.045-3.733,1.877 c-52.16,3.029-119.616,10.155-153.451,26.816v-34.411l38.4-28.8c2.709-2.005,4.267-5.184,4.267-8.533 c0-3.349-1.579-6.528-4.267-8.533l-42.667-32c-3.221-2.411-7.509-2.816-11.157-1.003C2.283,79.026,0,82.717,0,86.749v128 c0,0.256,0.021,0.683,0.064,1.173l21.205,190.827c0,33.003,84.117,45.568,149.333,50.368v-71.701c0-17.643,14.357-32,32-32h85.333 c17.643,0,32,14.357,32,32v71.765c65.216-4.693,149.312-17.003,149.269-49.259l21.141-190.229c0-0.085,0.021-0.192,0.021-0.277 c0.043-0.491,0.107-1.003,0.149-1.472c0.043-0.491,0.064-0.917,0.064-1.173c0-9.771-8.107-17.749-21.333-24.256v-34.411 l38.443-28.821c2.688-2.005,4.267-5.184,4.267-8.533C511.957,115.399,510.379,112.221,507.691,110.215z M21.76,214.834 c3.499-4.779,18.347-10.859,43.648-16.469c0.299,0.576,0.469,1.195,0.875,1.707l29.333,36.672 C51.627,229.959,26.24,221.127,21.76,214.834z M125.675,240.647c-0.277-0.448-0.384-1.003-0.747-1.451l-36.245-45.312 c22.933-3.84,51.285-7.147,85.013-9.131l16.576,60.757C166.336,244.466,144.789,242.759,125.675,240.647z M277.995,246.301 c-2.539,0.064-4.949,0.171-7.531,0.213c-8.171,0.149-16.555,0.235-25.173,0.235c-8.64,0-17.045-0.085-25.237-0.235 c-2.56-0.043-4.949-0.149-7.467-0.213l-17.067-62.592c15.637-0.619,32.213-0.96,49.771-0.96c17.557,0,34.133,0.341,49.771,0.96 L277.995,246.301z M364.907,240.669c-2.624,0.299-5.141,0.597-7.872,0.875c-2.901,0.299-6.037,0.555-9.045,0.811 c-3.456,0.32-6.827,0.64-10.432,0.939c-3.605,0.277-7.445,0.512-11.179,0.768c-3.243,0.213-6.357,0.469-9.707,0.661 c-4.352,0.256-8.96,0.448-13.504,0.661c-0.96,0.043-1.877,0.085-2.837,0.128l16.576-60.779c33.771,2.005,62.165,5.269,85.12,9.003 l-36.373,45.483C365.291,239.666,365.184,240.199,364.907,240.669z M469.376,213.789l-0.064,0.277 c-0.192,0.341-0.597,0.725-0.917,1.088c-0.363,0.405-0.619,0.789-1.131,1.216c-0.448,0.363-1.088,0.747-1.643,1.109 c-0.683,0.448-1.28,0.896-2.133,1.365c-0.661,0.363-1.536,0.747-2.283,1.109c-1.003,0.491-1.941,0.981-3.136,1.493 c-0.875,0.384-1.963,0.747-2.944,1.131c-1.344,0.512-2.624,1.045-4.139,1.557c-1.088,0.384-2.389,0.747-3.584,1.131 c-1.664,0.533-3.264,1.067-5.12,1.6c-1.323,0.384-2.837,0.747-4.245,1.131c-2.005,0.533-3.925,1.067-6.101,1.6 c-1.451,0.341-3.093,0.683-4.608,1.045c-2.389,0.555-4.736,1.088-7.317,1.621c-1.664,0.341-3.52,0.661-5.248,1.003 c-2.688,0.512-5.291,1.045-8.171,1.557c-2.069,0.363-4.331,0.704-6.485,1.067c-1.685,0.277-3.349,0.555-5.099,0.832l29.312-36.629 c0.491-0.619,0.704-1.344,1.045-2.027C451.648,203.655,466.773,209.629,469.376,213.789z"></path> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M507.691,110.215l-42.667-32c-3.221-2.411-7.552-2.816-11.157-1.003c-3.605,1.813-5.888,5.504-5.888,9.536v95.637 c-36.373-10.987-89.365-16.235-132.117-18.709c-1.088-0.832-2.347-1.493-3.733-1.877c-2.923-0.811-5.888-0.235-8.32,1.237 c-20.373-1.003-37.419-1.387-47.829-1.515V134.77l38.4-28.8c2.688-2.005,4.267-5.184,4.267-8.533c0-3.349-1.579-6.528-4.267-8.533 l-42.667-32c-3.2-2.432-7.552-2.795-11.157-1.003c-3.627,1.813-5.909,5.504-5.909,9.536v96.085 c-10.411,0.149-27.456,0.533-47.829,1.515c-2.432-1.472-5.397-2.027-8.32-1.237c-1.408,0.384-2.667,1.045-3.733,1.877 c-52.16,3.029-119.616,10.155-153.451,26.816v-34.411l38.4-28.8c2.709-2.005,4.267-5.184,4.267-8.533 c0-3.349-1.579-6.528-4.267-8.533l-42.667-32c-3.221-2.411-7.509-2.816-11.157-1.003C2.283,79.026,0,82.717,0,86.749v128 c0,0.256,0.021,0.683,0.064,1.173l21.205,190.827c0,33.003,84.117,45.568,149.333,50.368v-71.701c0-17.643,14.357-32,32-32h85.333 c17.643,0,32,14.357,32,32v71.765c65.216-4.693,149.312-17.003,149.269-49.259l21.141-190.229c0-0.085,0.021-0.192,0.021-0.277 c0.043-0.491,0.107-1.003,0.149-1.472c0.043-0.491,0.064-0.917,0.064-1.173c0-9.771-8.107-17.749-21.333-24.256v-34.411 l38.443-28.821c2.688-2.005,4.267-5.184,4.267-8.533C511.957,115.399,510.379,112.221,507.691,110.215z M21.76,214.834 c3.499-4.779,18.347-10.859,43.648-16.469c0.299,0.576,0.469,1.195,0.875,1.707l29.333,36.672 C51.627,229.959,26.24,221.127,21.76,214.834z M125.675,240.647c-0.277-0.448-0.384-1.003-0.747-1.451l-36.245-45.312 c22.933-3.84,51.285-7.147,85.013-9.131l16.576,60.757C166.336,244.466,144.789,242.759,125.675,240.647z M277.995,246.301 c-2.539,0.064-4.949,0.171-7.531,0.213c-8.171,0.149-16.555,0.235-25.173,0.235c-8.64,0-17.045-0.085-25.237-0.235 c-2.56-0.043-4.949-0.149-7.467-0.213l-17.067-62.592c15.637-0.619,32.213-0.96,49.771-0.96c17.557,0,34.133,0.341,49.771,0.96 L277.995,246.301z M364.907,240.669c-2.624,0.299-5.141,0.597-7.872,0.875c-2.901,0.299-6.037,0.555-9.045,0.811 c-3.456,0.32-6.827,0.64-10.432,0.939c-3.605,0.277-7.445,0.512-11.179,0.768c-3.243,0.213-6.357,0.469-9.707,0.661 c-4.352,0.256-8.96,0.448-13.504,0.661c-0.96,0.043-1.877,0.085-2.837,0.128l16.576-60.779c33.771,2.005,62.165,5.269,85.12,9.003 l-36.373,45.483C365.291,239.666,365.184,240.199,364.907,240.669z M469.376,213.789l-0.064,0.277 c-0.192,0.341-0.597,0.725-0.917,1.088c-0.363,0.405-0.619,0.789-1.131,1.216c-0.448,0.363-1.088,0.747-1.643,1.109 c-0.683,0.448-1.28,0.896-2.133,1.365c-0.661,0.363-1.536,0.747-2.283,1.109c-1.003,0.491-1.941,0.981-3.136,1.493 c-0.875,0.384-1.963,0.747-2.944,1.131c-1.344,0.512-2.624,1.045-4.139,1.557c-1.088,0.384-2.389,0.747-3.584,1.131 c-1.664,0.533-3.264,1.067-5.12,1.6c-1.323,0.384-2.837,0.747-4.245,1.131c-2.005,0.533-3.925,1.067-6.101,1.6 c-1.451,0.341-3.093,0.683-4.608,1.045c-2.389,0.555-4.736,1.088-7.317,1.621c-1.664,0.341-3.52,0.661-5.248,1.003 c-2.688,0.512-5.291,1.045-8.171,1.557c-2.069,0.363-4.331,0.704-6.485,1.067c-1.685,0.277-3.349,0.555-5.099,0.832l29.312-36.629 c0.491-0.619,0.704-1.344,1.045-2.027C451.648,203.655,466.773,209.629,469.376,213.789z"></path> </g> </g> </g></svg>`
  const customIcon = new L.divIcon({
    className: 'custom-icon',
    html: svgField,
    iconSize: [50, 50],
    iconAnchor: [12, 12],
    popupAnchor: [10, -10],
  })
  console.log(formattedData)
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

            <Marker position={cityPosition}>
              <Popup>City Details</Popup>
            </Marker>
            {fieldMarkers.map((position, idx) => (
              <Marker key={idx} position={position} icon={customIcon}>
                <Popup>Pole</Popup>
              </Marker>
            ))}
            <Circle
              center={cityPosition}
              radius={Number(radius * 1000)}
              fillColor="green"
              color="blue"
              weight={4}
              opacity={0.2}
              fillOpacity={0.2}
            />
            <MapCenter center={mapCenter} />
          </MapContainer>
        </div>

        <div>
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
            {formattedData && formattedData.length > 0 ? (
              formattedData.map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleListClick([item.lat, item.lon], item.cfieldId)
                  }
                  className="mb-2 p-2 active:bg-primary rounded
        hover:bg-secondary bg-primary cursor-pointer
        text-primary-foreground hover:text-secondary-foreground
        transition-all flex flex-col items-center justify-center h-16"
                >
                  <span className="text-center font-bold">{item.name}</span>
                  <span className="text-center italic">{item.city}</span>
                </li>
              ))
            ) : (
              <li className="mb-2 p-2 text-center text-pink-500">
                Brak pól :(
              </li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <FieldInfo
          name={fieldInfo.name}
          owner={fieldInfo.owner}
          address={fieldInfo.address}
          geoTag={fieldInfo.geoTag}
          description={fieldInfo.description}
          fieldID={fieldID}
          regulations={fieldInfo.regulations}
        />
      </div>
      {fieldID !== null && (
        <>
          <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center border justify-center  ">
            <div className="w-full ">
              <h1 className="text-white text-xl font-bold italic mb-4 ">
                Najbliższe rozgrywki otwarte na{' '}
                <span className="text-primary">{fieldInfo.name}</span>
              </h1>
              <OpenEventsTable fieldID={fieldID} />
            </div>
          </div>
          <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs flex flex-wrap items-center border justify-center ">
            <div className="w-full">
              <h1 className="text-white text-xl font-bold italic mb-4">
                Najbliższe wolne terminy na zamówienie pola na{' '}
                <span className="text-primary">{fieldInfo.name}</span>
              </h1>
              <PrivateEventsTable fieldID={fieldID} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CallendarPage
