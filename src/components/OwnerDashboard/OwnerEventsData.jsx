import React, { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AttendanceInfoDialog from './AttendanceInfoDialog' // Import the AttendanceInfoDialog component
import APIKEYS from '../APIKEYS'
import axios from 'axios'
import Cookies from 'js-cookie'

const OwnerEventsData = ({ fieldId, selectedDate }) => {
  const [privateEvents, setPrivateEvents] = useState([])
  const [openEvents, setOpenEvents] = useState([])
  const [isLoadingPrivate, setIsLoadingPrivate] = useState(true)
  const [isLoadingOpen, setIsLoadingOpen] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL
  const token = Cookies.get('authToken')
  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    // Fetch private events
    const fetchPrivateEvents = async () => {
      try {
        // Simulate fetching delay
        const response = await axios.get(
          `${apiUrl}/api/Schedule/PrivateEvent/${fieldId}`,
          config
        )
        const filteredPrivateEvents = response.data.filter(
          (event) => event.date.split('T')[0] === selectedDate
        )
        setPrivateEvents(filteredPrivateEvents)
        setIsLoadingPrivate(false)
      } catch (error) {
        console.error('Error fetching private events:', error)
        setIsLoadingPrivate(false)
      }
    }

    // Fetch open events
    const fetchOpenEvents = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/Schedule/PublicEvent/${fieldId}`,
          config
        )
        const filteredOpenEvents = response.data.filter(
          (event) => event.date.split('T')[0] === selectedDate
        )
        setOpenEvents(filteredOpenEvents)
        setIsLoadingOpen(false)
      } catch (error) {
        console.error('Error fetching open events:', error)
        setIsLoadingOpen(false)
      }
    }

    // Call fetch functions
    fetchPrivateEvents()
    fetchOpenEvents()
  }, [fieldId, selectedDate])
  console.log(openEvents)
  return (
    <div className="flex min-w-screen-xl justify-between">
      {/* Private Events Table */}
      <div className="max-h-96 min-h-60 m-2 overflow-y-auto w-1/2">
        <Table className="table-auto w-full text-white">
          <TableCaption className="sticky bottom-0 bg-background">
            Rezerwacje
          </TableCaption>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Godzina</TableHead>
              <TableHead className="text-center">
                Maksymalny czas w godz.
              </TableHead>
              <TableHead className="text-center">
                Maksymalna liczba uczestników
              </TableHead>
              <TableHead className="text-center min-w-[58px]"></TableHead>{' '}
              {/* View Attendance */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingPrivate ? (
              <TableRow>
                <TableCell colSpan="5">
                  <Skeleton count={5} />
                </TableCell>
              </TableRow>
            ) : (
              privateEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="text-center">
                    {event.date.split('T')[0]}
                  </TableCell>
                  <TableCell className="text-center">
                    {event.date.split('T')[1]}
                  </TableCell>
                  <TableCell className="text-center">
                    {event.maxPlaytime}
                  </TableCell>
                  <TableCell className="text-center">
                    {event.maxPlayers}
                  </TableCell>
                  <TableCell className="text-center min-w-[58px]">
                    <AttendanceInfoDialog
                      eventId={event.fieldScheduleId}
                      eventType="private"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Open Events Table */}
      <div className="max-h-96 min-h-60 m-2 overflow-y-auto w-1/2">
        <Table className="table-auto w-full text-white">
          <TableCaption className="sticky bottom-0 bg-background">
            Wydarzenia otwarte
          </TableCaption>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="text-center">Nazwa wydarzenia</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Godzina rozpoczęcia</TableHead>
              <TableHead className="text-center">
                Ilość osób / maksymalna ilość
              </TableHead>
              <TableHead className="text-center "></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingOpen ? (
              <TableRow>
                <TableCell colSpan="5">
                  <Skeleton count={5} />
                </TableCell>
              </TableRow>
            ) : (
              openEvents.map((event) => (
                <TableRow key={event.eventId.value}>
                  <TableCell className="text-center">{event.name}</TableCell>
                  <TableCell className="text-center">
                    {event.date.split('T')[0]}
                  </TableCell>
                  <TableCell className="text-center">
                    {event.date.split('T')[1]}
                  </TableCell>
                  <TableCell className="text-center">{`${event.signedPlayers}/${event.maxPlayers}`}</TableCell>
                  <TableCell className="text-center ">
                    <AttendanceInfoDialog
                      eventId={event.eventId.value}
                      eventType="open"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default OwnerEventsData
