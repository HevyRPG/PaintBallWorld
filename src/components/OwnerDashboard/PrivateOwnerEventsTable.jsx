import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const PrivateOwnerEventsTable = ({ fieldID }) => {
  const [events, setEvents] = useState([])
  const [sortedEvents, setSortedEvents] = useState([])
  const [sortDirection, setSortDirection] = useState('desc') // Initialize to 'desc'
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!fieldID) {
      setEvents([])
      setSortedEvents([])
      return // Exit early if no fieldID
    }

    setIsLoading(true) // Set loading state to true before fetching data

    // Mock data specific to private events, showing up when fieldID is '123'
    const mockApiResponse =
      fieldID === '123'
        ? [
            {
              id: '1',
              date: '2024-03-01',
              hour: '14:00',
              uptime: '2 hours',
              attendees: 10,
            },
            {
              id: '2',
              date: '2024-03-02',
              hour: '16:00',
              uptime: '3 hours',
              attendees: 12,
            },
            {
              id: '3',
              date: '2024-03-05',
              hour: '11:00',
              uptime: '1.5 hours',
              attendees: 8,
            },
            {
              id: '4',
              date: '2024-03-05',
              hour: '11:00',
              uptime: '1.5 hours',
              attendees: 8,
            },
            {
              id: '5',
              date: '2024-03-05',
              hour: '11:00',
              uptime: '1.5 hours',
              attendees: 8,
            },
            {
              id: '6',
              date: '2024-03-05',
              hour: '11:00',
              uptime: '1.5 hours',
              attendees: 8,
            },
          ]
        : []

    setTimeout(() => {
      // Simulate fetching delay
      setEvents(mockApiResponse)
      setSortedEvents(mockApiResponse)
      setIsLoading(false) // Set loading state to false after fetching data
    }, 1000)
  }, [fieldID])

  const handleSort = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc'
    const sorted = [...sortedEvents].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return direction === 'asc' ? dateA - dateB : dateB - dateA
    })
    setSortedEvents(sorted)
    setSortDirection(direction)
  }

  if (!fieldID) {
    return (
      <div className="text-primary">Wybierz pole aby wyświetlić rozgrywki</div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-3 ">
        <table className="space-x-3">
          <thead>
            <tr>
              <th>
                <Skeleton className="h-8 w-[500px]" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Skeleton className="h-7 w-[250px] mb-5" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="max-h-60 min-h-60 overflow-y-auto">
      <table className="table-auto w-full text-white">
        <thead className="sticky bg-background top-0">
          <tr>
            <th className="px-4 py-2  cursor-pointer" onClick={handleSort}>
              Data{' '}
              {sortDirection === 'asc' ? (
                <span className="ml-1 ">&uarr;</span>
              ) : (
                <span className="ml-1 ">&darr;</span>
              )}
            </th>
            <th className="px-4 py-2 text-center ">Godzina</th>
            <th className="px-4 py-2 text-center ">Maksymalny czas gry</th>
            <th className="px-4 py-2 text-center ">
              Maksymalna liczba uczestników
            </th>
            <th className="px-4 py-2">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id} className="hover:bg-secondary">
              <td className="px-4 py-2 text-center ">{event.date}</td>
              <td className="px-4 py-2 text-center ">{event.hour}</td>
              <td className="px-4 py-2 text-center ">{event.uptime}</td>
              <td className="px-4 py-2 text-center ">{event.attendees}</td>
              <td className="px-4 py-2 text-center ">
                <Button variant="destructive">Usuń</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrivateOwnerEventsTable
