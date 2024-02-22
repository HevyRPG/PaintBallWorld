import React, { useState } from 'react'
import axios from 'axios'
import APIHeaders from '../components/APIHeaders'

const Autocomplete = () => {
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const apiUrl = '/api' // Hardcoded API URL

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`${apiUrl}/${input}`, APIHeaders)
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
  }

  return (
    <div className="relative">
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
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete
