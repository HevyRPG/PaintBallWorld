import React, { useState, useRef, useEffect, createContext } from 'react'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import APIHeaders from '../APIHeaders'
import { Input } from "@/components/ui/input"


const SelectedCityNameContext = createContext()

const Autocomplete = ({ onSelection }) => {
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)
  const [selectedCityName, setSelectedCityName] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Track loading state

  const apiUrl = '/api/Default/Localization'

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
    setIsLoading(true) // Start loading
    try {
      const response = await axios.get(`${apiUrl}/${input}`, APIHeaders)
      setSuggestions(response.data) // Assuming response.data is the suggestions array
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setIsLoading(false) // End loading
    }
  }

  const handleInputChange = (event) => {
    const input = event.target.value
    setSearchInput(input)
    if (input) {
      fetchSuggestions(input)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion)
    setSuggestions([])
    setSelectedCityName(suggestion)
    onSelection(suggestion)
  }

  return (
    <SelectedCityNameContext.Provider value={selectedCityName}>
      <div className="relative" ref={inputRef}>
        <Input
          type="text"
          placeholder="Podaj swoje miasto..."
          value={searchInput}
          onChange={handleInputChange}
          className="w-[280px] m-1 rounded" 
        />
        {isLoading ? (
          // Skeleton loader styled similar to suggestions for visual consistency
          <div className="absolute bg-white w-1/2 rounded-lg shadow-md mt-1 z-10">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} className="h-10 my-2 mx-2 rounded-md" />
            ))}
          </div>
        ) : (
          suggestions.length > 0 && (
            <ul className="absolute bg-white w-1/2 rounded-lg shadow-md mt-1 z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer p-2 text-primary-foreground italic rounded hover:bg-gray-100" // Original className preserved
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </SelectedCityNameContext.Provider>
  )
}

export default Autocomplete
