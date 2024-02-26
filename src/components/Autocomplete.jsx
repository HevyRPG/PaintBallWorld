// Autocomplete.js
import React, { useState, useRef, useEffect, createContext } from 'react'
import axios from 'axios'
import APIHeaders from '../components/APIHeaders'

// Create a context for the selected city name
const SelectedCityNameContext = createContext()

const Autocomplete = ({ onSelection }) => {
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)
  const [selectedCityName, setSelectedCityName] = useState('') // Rename selectedValue to selectedCityName

  const apiUrl = '/api/Default/Localization' // Hardcoded API URL

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSuggestions([])
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`${apiUrl}/${input}`, APIHeaders)
      setSuggestions(response.data) // Assuming the response data is an array of suggestions
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const handleInputChange = (event) => {
    const input = event.target.value
    setSearchInput(input)
    fetchSuggestions(input)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion)
    setSuggestions([])
    setSelectedCityName(suggestion) // Rename selectedValue to selectedCityName
    // Call the callback function with the selected value
    onSelection(suggestion)
  }

  return (
    <SelectedCityNameContext.Provider value={selectedCityName}>
      <div className="relative" ref={inputRef}>
        <input
          type="text"
          placeholder="Podaj swoje miasto..."
          value={searchInput}
          onChange={handleInputChange}
          className="w-[380px] p-3 rounded text-primary-foreground"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white w-1/2 rounded-lg shadow-md mt-1 z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-2 text-primary-foreground italic rounded hover:bg-gray-100"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SelectedCityNameContext.Provider>
  )
}

export default Autocomplete
