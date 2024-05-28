import React, { useState, useRef, useEffect, createContext } from 'react'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import APIHeaders from '../APIHeaders'
import { Input } from '@/components/ui/input'

const SelectedSuggestionContext = createContext()

const Autocomplete = ({ onSelection }) => {
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL
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
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${apiUrl}/api/Default/Localization/${input}`,
        APIHeaders
      )
      if (response.data && response.data.isSuccess) {
        setSuggestions(response.data.data)
      } else {
        console.error('Error fetching suggestions:', response.data.message)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setIsLoading(false)
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
    setSearchInput(suggestion.name)
    setSuggestions([])
    setSelectedSuggestion(suggestion)
    onSelection(suggestion)
  }

  return (
    <SelectedSuggestionContext.Provider value={selectedSuggestion}>
      <div className="relative" ref={inputRef}>
        <Input
          type="text"
          placeholder="Podaj swoje miasto..."
          value={searchInput}
          onChange={handleInputChange}
          className="w-[240px] m-1 p-6 rounded"
        />
        {isLoading ? (
          <div className="absolute bg-background w-1/2 rounded-lg shadow-md mt-1 z-10">
            {[...Array(2)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-10 w-full my-2 mx-2 rounded-md"
              />
            ))}
          </div>
        ) : (
          suggestions.length > 0 && (
            <ul className="absolute bg-background w-3/4 border shadow-md mt-1 z-10">
              {suggestions.map((suggestion, index) => {
                const provinceWithoutPrefix = suggestion.province.replace(
                  /^województwo\s+/i,
                  ''
                )

                const location = suggestion.county || suggestion.municipality

                const locationString = [
                  suggestion.name,
                  provinceWithoutPrefix,
                  location,
                ]
                  .filter(Boolean)
                  .join(', ')

                return (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="cursor-pointer p-2 text-secondary-foreground italic hover:bg-secondary"
                  >
                    {locationString}
                  </li>
                )
              })}
            </ul>
          )
        )}
      </div>
    </SelectedSuggestionContext.Provider>
  )
}

export { Autocomplete, SelectedSuggestionContext }
