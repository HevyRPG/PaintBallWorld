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

const AttendanceInfoDialog = ({ eventId, eventType }) => {
  const [attendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAttendanceData()
  }, [eventId])

  const fetchAttendanceData = async () => {
    setLoading(true) // Set loading state to true before making the request
    try {
      // const apiUrl = import.meta.env.VITE_API_URL
      // const token = Cookies.get('authToken')
      // const response = await axios.get(`${apiUrl}/api/attendance/${eventId}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      setAttendanceData(response.data)
      setLoading(false) // Set loading state to false after receiving the response
    } catch (error) {
      console.error('Error fetching attendance data:', error)
      setError('Error fetching attendance data')
      setLoading(false) // Set loading state to false if an error occurs
    }
  }

  const handleDeleteEvent = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const token = Cookies.get('authToken')
      await axios.delete(`${apiUrl}/api/event/${eventId}`, {
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
          <p>Loading attendance data...</p> // Display loading message while loading
        ) : error ? (
          <p>Error: {error}</p> // Display error message if there's an error
        ) : (
          <AttendanceInfoTable
            attendanceData={attendanceData}
            eventType={eventType}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

const AttendanceInfoTable = ({ attendanceData, eventType, onDeleteEvent }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Surname</th>
            {eventType === 'private' && (
              <>
                <th>No. of Participants</th>
                <th>Additional Conditions</th>
                <th>Selected Set</th>
                <th>Estimated Price</th>
              </>
            )}
            <th>Selected Set</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.username}</td>
              <td>{entry.email}</td>
              <td>{entry.name}</td>
              <td>{entry.surname}</td>
              {eventType === 'private' && (
                <>
                  <td>{entry.participants}</td>
                  <td>{entry.conditions}</td>
                  <td>{entry.selectedSet}</td>
                  <td>{entry.price}</td>
                </>
              )}
              <td>{entry.selectedSet}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={onDeleteEvent}>Delete Event</Button>
      </div>
    </div>
  )
}

export default AttendanceInfoDialog
