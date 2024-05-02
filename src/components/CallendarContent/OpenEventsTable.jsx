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
import OpenModalComponent from './modals/OpenModalComponent'
import axios from 'axios' // Import Axios
import APIKEYS from '../APIKEYS'
import Cookies from 'js-cookie'

const OpenEventsTable = ({ fieldID }) => {
  const [events, setEvents] = useState([])
  const [sortedEvents, setSortedEvents] = useState([])
  const [sortDirection, setSortDirection] = useState('asc')
  const [sortBy, setSortBy] = useState('date')
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const token = Cookies.get('authToken')

  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!fieldID) {
      setEvents([])
      setSortedEvents([])
      return // Exit early if no fieldID
    }

    setIsLoading(true) // Set loading state to true before fetching data
    const apiUrl = import.meta.env.VITE_API_URL
    axios
      .get(`${apiUrl}/api/Event/PublicEvent/${fieldID}`, config) // Use Axios to make GET request
      .then((response) => {
        setEvents(response.data)
        setSortedEvents(response.data)
        setIsLoading(false) // Set loading state to false after fetching data
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setIsLoading(false) // Set loading state to false on error
      })
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
        <TableCaption>Lista wydarzeń otwartych</TableCaption>
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
            <TableRow key={event.eventId.value} className="hover:bg-secondary">
              <TableCell className="text-center">{event.name}</TableCell>
              <TableCell className="text-center">
                {event.date.split('T')[0]}
              </TableCell>
              <TableCell className="text-center">
                {event.date.split('T')[1]}
              </TableCell>
              <TableCell className="text-center">{`${event.signedPlayers}/${event.maxPlayers}`}</TableCell>
              <TableCell className="text-center">
                {event.signedPlayers >= event.maxPlayers ? (
                  <p className="p-2">Brak miejsc</p>
                ) : (
                  <Button variant="default" size="lg" onClick={openModal}>
                    Zapisz się
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <OpenModalComponent isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  )
}

export default OpenEventsTable
