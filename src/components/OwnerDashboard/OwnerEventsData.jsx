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
import { Button } from '@/components/ui/button'

const OwnerEventsData = ({ fieldId, selectedDate }) => {
  const [privateEvents, setPrivateEvents] = useState([])
  const [openEvents, setOpenEvents] = useState([])
  const [selectedPrivateEventId, setSelectedPrivateEventId] = useState(null)
  const [selectedOpenEventId, setSelectedOpenEventId] = useState(null)
  const [isLoadingPrivate, setIsLoadingPrivate] = useState(true)
  const [isLoadingOpen, setIsLoadingOpen] = useState(true)

  useEffect(() => {
    // Simulate fetching private events
    const fetchPrivateEvents = async () => {
      try {
        // Simulate fetching delay
        const privateEventsData = [
          {
            id: 'p1',
            date: '2024-05-01',
            hour: '14:00',
            uptime: '2 hours',
            attendees: 10,
          },
          {
            id: 'p2',
            date: '2024-05-03',
            hour: '16:00',
            uptime: '3 hours',
            attendees: 12,
          },
        ]
        // Filter private events based on selected date
        const filteredPrivateEvents = privateEventsData.filter(
          (event) => event.date === selectedDate
        )
        setPrivateEvents(filteredPrivateEvents)
        setIsLoadingPrivate(false)
      } catch (error) {
        console.error('Error fetching private events:', error)
        setIsLoadingPrivate(false)
      }
    }

    // Simulate fetching open events
    const fetchOpenEvents = async () => {
      try {
        // Simulate fetching delay
        const openEventsData = [
          {
            id: 'o1',
            name: 'Mock Event 1',
            date: '2024-05-01',
            hour: '16:00',
            attendees: 20,
            maxAttendees: 30,
          },
          {
            id: 'o2',
            name: 'Mock Event 2',
            date: '2024-05-03',
            hour: '18:00',
            attendees: 15,
            maxAttendees: 25,
          },
        ]
        // Filter open events based on selected date
        const filteredOpenEvents = openEventsData.filter(
          (event) => event.date === selectedDate
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
  }, [selectedDate])

  const handlePrivateEventClick = (eventId) => {
    setSelectedPrivateEventId(eventId)
  }

  const handleOpenEventClick = (eventId) => {
    setSelectedOpenEventId(eventId)
  }

  return (
    <div className="flex min-w-screen-xl justify-between">
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
              <TableHead></TableHead> {/* View Attendance */}
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
                  <TableCell className="text-center">{event.date}</TableCell>
                  <TableCell className="text-center">{event.hour}</TableCell>
                  <TableCell className="text-center">{event.uptime}</TableCell>
                  <TableCell className="text-center">
                    {event.attendees}
                  </TableCell>
                  <TableCell className="text-center">
                    <AttendanceInfoDialog
                      eventId={selectedPrivateEventId}
                      eventType="private"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="max-h-96 min-h-60 m-2 overflow-y-auto w-1/2">
        <Table className="table-auto w-full text-white">
          <TableCaption className="sticky bottom-0 bg-background">
            Wydarzenia otwarte
          </TableCaption>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="text-center">Nazwa wydarzenia</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center"> Godzina</TableHead>
              <TableHead className="text-center">
                Ilość osób / maksymalna ilość
              </TableHead>
              <TableHead className="text-center"></TableHead>
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
                <TableRow key={event.id}>
                  <TableCell className="text-center">{event.name}</TableCell>
                  <TableCell className="text-center">{event.date}</TableCell>
                  <TableCell className="text-center">{event.hour}</TableCell>
                  <TableCell className="text-center">
                    {event.attendees}
                  </TableCell>
                  <TableCell className="text-center">
                    <AttendanceInfoDialog
                      eventId={selectedOpenEventId}
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
