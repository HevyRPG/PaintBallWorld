import React, { useState } from 'react'

const OpenEventsTable = ({ events }) => {
  const [sortedEvents, setSortedEvents] = useState([...events])
  const [sortDirection, setSortDirection] = useState('asc')
  const [sortBy, setSortBy] = useState('date') // Set initial sort key to 'date'

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

  return (
    <div className="max-h-60 min-h-60 overflow-y-auto">
      <table className="table-auto w-full text-white">
        <thead className="sticky bg-bgs top-0">
          <tr>
            <th
              className="px-4 py-2 flex items-center text-center text-lg cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Nazwa wydarzenia
            </th>
            <th
              className="px-4 py-2 text-center text-lg cursor-pointer"
              onClick={() => handleSort('date')}
            >
              Data
              {sortBy === 'date' && (
                <span className="ml-1 text-lg">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 text-center text-lg cursor-pointer"
              onClick={() => handleSort('hour')}
            >
              Godzina
            </th>
            <th
              className="px-4 py-2 text-center text-lg cursor-pointer"
              onClick={() => handleSort('attendees')}
            >
              Ilość osób biorących udział / maksymalna ilość
              {sortBy === 'attendees' && (
                <span className="ml-1 text-lg">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id} className="hover:bg-indigo-900">
              <td className="px-4 py-2 text-center text-lg">{event.name}</td>
              <td className="px-4 py-2 text-center text-lg">{event.date}</td>
              <td className="px-4 py-2 text-center text-lg">{event.hour}</td>
              <td className="px-4 py-2 text-center text-lg">{`${event.attendees}/${event.maxAttendees}`}</td>
              <td className="px-4 py-2 text-center text-lg">
                <button
                  className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                  onClick={() => console.log('Sign up for event:', event.id)}
                >
                  Zapisz się
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OpenEventsTable
