import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import AddFieldDialog from '../components/ui/AddFieldDialog.jsx'
import PrivateOwnerEventsTable from '@/components/OwnerDashboard/PrivateOwnerEventsTable.jsx'
import OpenOwnerEventsTable from '@/components/OwnerDashboard/OpenOwnerEventsTable.jsx'

const OwnerDashboard = () => {
  const [date, setDate] = useState(new Date())

  // useEffect hook to log the date whenever it changes
  useEffect(() => {
    // Assuming 'date' is a Date object
    if (date) {
      const formattedDate =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') + // Month is 0-based
        '-' +
        String(date.getDate()).padStart(2, '0')
      console.log(formattedDate) // Log the formatted date
    }
  }, [date])

  return (
    <div className="container bg-background m-8 rounded-xl mx-auto max-w-screen-2xl">
      <div className="flex-grow text-gray-200">
        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold text-primary mb-2">
                Dashboard
              </h1>
              <h2 className="text-secondary-foreground ml-0.5">
                Zarządzaj polem
              </h2>
            </div>
            <div className="flex flex-wrap items-start justify-end -mb-3">
              <AddFieldDialog />
              <Button
                variant="secondary"
                size="lg"
                className="rounded border-primary ml-2"
              >
                Edytuj pole
              </Button>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="flex items-center text-center justify-center py-4 border border border-secondary  text-secondary-foreground shadow rounded-xl w-2/3">
              <div>
                <span className="block text-primary">@username</span>
                <span className="block ">Imie i nazwisko</span>
                <span className="block ">email</span>
                <span className="block ">socialki</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center font-semibold pt-3 border border-secondary  shadow rounded-xl md:w-1/3  text-card-foreground">
              <span className="block text-accent-foreground  text-xl font-bold mb-3  ">
                Twoje pola:
              </span>

              <div className="grid grid-cols-1 gap-2 mb-2">
                <Button variant="default" className="rounded">
                  Paintball Wielkopolska
                </Button>
                <Button variant="default" className="rounded">
                  Paintball Wielkopolska
                </Button>
                <Button variant="default" className="rounded">
                  Paintball Wielkopolska
                </Button>
                <Button variant="default" className="rounded">
                  Paintball Wielkopolska
                </Button>
                <Button variant="default" className="rounded">
                  Paintball Wielkopolska
                </Button>
              </div>
            </div>
          </section>
          <section className="flex gap-5">
            <div className=" mx-auto flex flex-wrap items-center justify-center border border-secondary rounded w-1/2">
              <h1 className="text-white text-xl font-bold italic mb-4 mt-4">
                Najbliższe rozgrywki otwarte
              </h1>
              <OpenOwnerEventsTable fieldID="123" />
            </div>
            <div className=" mx-auto flex flex-wrap items-center justify-center border border-secondary  rounded w-1/2">
              <h1 className="text-white text-xl font-bold italic mb-4 mt-4">
                Najbliższe prywatne wydarzenia
              </h1>
              <PrivateOwnerEventsTable fieldID="123" />
            </div>
          </section>
          <section className="flex gap-5">
            <div className="bg-secondary w-1/3 h-10 rounded"></div>
            <div className="bg-secondary w-1/3 h-10 rounded"></div>
            <div className="bg-secondary w-1/3 h-10 rounded"></div>
          </section>
          <section className="flex gap-5">
            <div className="mx-auto flex flex-wrap items-center justify-center bg-background rounded w-1/2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                numberOfMonths={2}
                fixedWeeks
                classNames="size-13"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default OwnerDashboard
