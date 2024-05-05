import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import APIKEYS from '../APIKEYS'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const AttendanceInfoDialog = ({ eventId, eventType }) => {
  const [attendanceData, setAttendanceData] = useState([])
  const [additionalInfo, setAdditionalInfo] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = Cookies.get('authToken')

  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    fetchAttendanceData()
  }, [eventId])

  const fetchAttendanceData = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(
        `${apiUrl}/api/Owner/MyEvents/${eventId}`,
        config
      )
      setAttendanceData(response.data.participants)
      setAdditionalInfo(response.data)
      setLoading(false)
    } catch (error) {
      console.error('No sign-ups', error)
      setError('Brak zapisu')
      setLoading(false)
    }
  }

  const handleDeleteEvent = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const token = Cookies.get('authToken')
      await axios.delete(`${apiUrl}/api/Owner/MyEvents/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Event deleted successfully')
    } catch (error) {
      console.error('Error deleting event:', error)
      setError('Error deleting event')
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-lg" variant="link">
          Info
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informacje o zapisach</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading attendance data...</p>
        ) : error ? (
          <p>Błąd: {error}</p>
        ) : (
          <AttendanceInfoTable
            attendanceData={attendanceData}
            additionalInfo={additionalInfo}
            eventType={eventType}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

const AttendanceInfoTable = ({
  attendanceData,
  additionalInfo,
  onDeleteEvent,
}) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imię i nazwisko</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Wybrany zestaw</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>{entry.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4">
        <p>
          {' '}
          Łączna ilość uczestników:{' '}
          <span className="text-primary">
            {additionalInfo.participantsCount}
          </span>
        </p>
        <p>
          Szacunkowe przychody:{' '}
          <span className="text-green-500">
            {additionalInfo.estimatedPrice}
          </span>{' '}
          zł
        </p>
      </div>
      <div>
        <Button onClick={onDeleteEvent}>Delete Event</Button>
      </div>
    </div>
  )
}

export default AttendanceInfoDialog
