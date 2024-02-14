import React, { useState } from 'react'

const PrivateEventsTable = ({ events }) => {
  const [sortedEvents, setSortedEvents] = useState([...events])
  const [sortDirection, setSortDirection] = useState('desc') // Initialize to 'desc' for descending order initially

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

  return (
    <div className="max-h-60 min-h-60 overflow-y-auto">
      <table className="table-auto w-full text-white">
        <thead className="sticky bg-bgs top-0">
          <tr>
            <th
              className="px-4 py-2 flex items-center cursor-pointer text-lg"
              onClick={handleSort}
            >
              Data
              {sortDirection === 'asc' && (
                <span className="ml-1 text-lg">&uarr;</span>
              )}
              {sortDirection === 'desc' && (
                <span className="ml-1 text-lg">&darr;</span>
              )}
            </th>
            <th className="px-4 py-2 text-center text-lg">Godzina</th>
            <th className="px-4 py-2 text-center text-lg">
              Maksymalny czas w godz.
            </th>
            <th className="px-4 py-2 text-center text-lg">
              Maksymalna liczba uczestników
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id} className="hover:bg-indigo-900">
              <td className="px-4 py-2 text-center text-lg">{event.date}</td>
              <td className="px-4 py-2 text-center text-lg">{event.hour}</td>
              <td className="px-4 py-2 text-center text-lg">{event.uptime}</td>
              <td className="px-4 py-2 text-center text-xl">
                {event.attendees}
              </td>
              <td className="px-4 py-2 text-center text-lg">
                <button
                  className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                  onClick={() => console.log('Sign up for event:', event.id)}
                >
                  Umów grę
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrivateEventsTable
