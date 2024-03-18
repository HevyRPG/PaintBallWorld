import React, { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// Placeholder Skeleton component. Replace or modify according to your actual implementation.

const OpenEventsTable = ({ fieldID }) => {
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
        id: 3,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
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
        id: 3,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
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
        id: 3,
        name: 'Mock Event 3',
        date: '2024-02-16',
        hour: '20:00',
        attendees: 25,
        maxAttendees: 35,
      },
      {
        id: 3,
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
      <Table>
        <TableCaption>Lista wydarzeń</TableCaption>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => handleSort('name')}
            >
              Nazwa wydarzenia
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => handleSort('date')}
            >
              Data {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => handleSort('hour')}
            >
              Godzina
            </TableHead>
            <TableHead
              className="cursor-pointer text-center"
              onClick={() => handleSort('attendees')}
            >
              Ilość osób / maksymalna ilość{' '}
              {sortBy === 'attendees' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvents.map((event) => (
            <TableRow key={event.id} className="hover:bg-secondary">
              <TableCell className="text-center">{event.name}</TableCell>
              <TableCell className="text-center">{event.date}</TableCell>
              <TableCell className="text-center">{event.hour}</TableCell>
              <TableCell className="text-center">{`${event.attendees}/${event.maxAttendees}`}</TableCell>
              <TableCell className="text-center">
                <Button variant="default" size="lg">
                  Zapisz się
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OpenEventsTable
