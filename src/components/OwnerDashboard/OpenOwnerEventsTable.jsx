import React, { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
// Placeholder Skeleton component. Replace or modify according to your actual implementation.

const OpenOwnerEventsTable = ({ fieldID }) => {
  const [events, setEvents] = useState([])
  const [sortedEvents, setSortedEvents] = useState([])
  const [sortDirection, setSortDirection] = useState('asc')
  const [sortBy, setSortBy] = useState('date')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!fieldID) {
      setEvents([])
      setSortedEvents([])
      return // Exit early if no fieldID
    }

    setIsLoading(true) // Set loading state to true before fetching data

    const mockApiResponse = [
      {
        id: 1,
        name: 'Mock Event 1',
        date: '2024-02-14',
        hour: '16:00',
        attendees: 20,
        maxAttendees: 30,
      },
      {
        id: 2,
        name: 'Mock Event 2',
        date: '2024-02-15',
        hour: '18:00',
        attendees: 15,
        maxAttendees: 25,
      },
      {
        id: 3,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      {
        id: 4,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      {
        id: 5,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      {
        id: 6,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      {
        id: 7,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      {
        id: 8,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      {
        id: 9,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      // Add more mock events as needed
    ]

    // Simulate fetching delay
    setTimeout(() => {
      if (fieldID === '123') {
        setEvents(mockApiResponse)
        setSortedEvents(mockApiResponse)
      } else {
        // Handle other fieldID values or set empty data
        setEvents([])
        setSortedEvents([])
      }
      setIsLoading(false) // Set loading state to false after fetching data
    }, 1000)
  }, [fieldID])

  const handleSort = (sortKey) => {
    const direction =
      sortBy === sortKey ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'
    const sorted = [...sortedEvents].sort((a, b) => {
      if (sortKey === 'date') {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return direction === 'asc' ? dateA - dateB : dateB - dateA
      } else if (sortKey === 'attendees') {
        return direction === 'asc'
          ? a.attendees - b.attendees
          : b.attendees - a.attendees
      }
      return 0
    })
    setSortedEvents(sorted)
    setSortDirection(direction)
    setSortBy(sortKey)
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
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
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
            <th
              className="px-4 py-2 cursor-pointer  text"
              onClick={() => handleSort('name')}
            >
              Nazwa wydarzenia
            </th>
            <th
              className="px-4 py-2 cursor-pointer text"
              onClick={() => handleSort('date')}
            >
              Data {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="px-4 py-2 cursor-pointer text"
              onClick={() => handleSort('hour')}
            >
              Godzina
            </th>
            <th
              className="px-4 py-2 cursor-pointer text"
              onClick={() => handleSort('attendees')}
            >
              Ilość osób / maksymalna ilość{' '}
              {sortBy === 'attendees' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 text">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id} className="hover:bg-secondary">
              <td className="px-4 py-2 text-center">{event.name}</td>
              <td className="px-4 py-2 text-center">{event.date}</td>
              <td className="px-4 py-2 text-center">{event.hour}</td>
              <td className="px-4 py-2 text-center">{`${event.attendees}/${event.maxAttendees}`}</td>
              <td className="px-4 py-2 text-center">
                <Button variant="destructive">Usuń</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OpenOwnerEventsTable
