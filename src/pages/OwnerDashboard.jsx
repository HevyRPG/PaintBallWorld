import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import OpenEventsTable from '@/components/CallendarContent/OpenEventsTable.jsx'
import PrivateEventsTable from '@/components/CallendarContent/PrivateEventsTable.jsx'
import PhotoGallery from '@/components/ui/PhotoGallery.jsx'
import AddFieldDialog from '@/components/OwnerDashboard/AddFieldDialog'
import EditFieldDialog from '../components/OwnerDashboard/EditFieldDialog'
import DeleteFieldDialog from '../components/OwnerDashboard/DeleteFieldDialog'
import AddPhotoDialog from '../components/OwnerDashboard/AddPhotoDialog'
import DeletePhotoDialog from '../components/OwnerDashboard/DeletePhotoDialog'
import { pl } from 'date-fns/locale'
import Cookies from 'js-cookie'
import AllSetsDialog from '../components/OwnerDashboard/AllSetsDialog'
import AddSetDialog from '../components/OwnerDashboard/AddSetDialog'

const OwnerDashboard = () => {
  const [date, setDate] = useState(new Date())
  const [formattedDate, setFormattedDate] = useState('')

  const { isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!Cookies.get('role')) {
      logout()
      navigate('/')
    }
  }, [logout, navigate])

  // useEffect hook to log the date whenever it changes
  useEffect(() => {
    if (date) {
      // Format the date to a string in YYYY-MM-DD format
      const newFormattedDate =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') + // Month is 0-based
        '-' +
        String(date.getDate()).padStart(2, '0')

      // Update the formattedDate state with the new value
      setFormattedDate(newFormattedDate)
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
            </div>
          </div>
          <section className="flex flex-col md:flex-row gap-6 min-w-full">
            <div className="relative p-4 border border-secondary text-secondary-foreground shadow rounded-xl flex flex-col items-center justify-center m-auto">
              <h1 className="text-xl font-semibold mb-4">Zarządzaj Polem</h1>
              <div className="flex gap-2">
                <AddFieldDialog />
                <EditFieldDialog fieldId="" />
                <DeleteFieldDialog fieldId="" />
              </div>
            </div>
            <div className="relative p-4 border m-auto border-secondary text-secondary-foreground shadow rounded-xl flex flex-col items-center justify-center">
              <h1 className="text-xl font-semibold mb-4">
                Zarządzaj Zestawami i Zdjęciami
              </h1>
              <div className="flex gap-2">
                <AllSetsDialog fieldId="" />
                <AddSetDialog fieldId="" />
                <AddPhotoDialog fieldId="" />
                <DeletePhotoDialog fieldId="" />
              </div>
            </div>
          </section>
          <section className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div className="bg-background rounded-xl p-6">
                <h1 className="text-xl font-semibold mb-4">
                  Wybierz datę, aby wyświetlić rozgrywki
                </h1>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  fixedWeeks
                  locale={pl}
                  className="border w-[500px] rounded-xl"
                />
              </div>
            </div>
            <div className="w-auto">
              <h1 className="text-xl font-semibold mb-4">Galeria</h1>
              <PhotoGallery fieldID="TESTGAL" width={500} height={300} />
            </div>
          </section>
          <section className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div className="bg-background rounded-xl border p-6">
                <h1 className="text-2xl font-bold mb-4">
                  Rozgrywki otwarte w dniu{' '}
                  <span className="text-primary italic">{formattedDate}</span>
                </h1>
                <Button variant="default" size="lg" className="rounded">
                  Dodaj
                </Button>
                <OpenEventsTable fieldID="123" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-background rounded-xl border p-6">
                <h1 className="text-2xl font-bold mb-4">
                  Rezerwacje pola w dniu{' '}
                  <span className="text-primary italic">{formattedDate}</span>
                </h1>
                <Button variant="default" size="lg" className="rounded">
                  Dodaj
                </Button>
                <PrivateEventsTable fieldID="123" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default OwnerDashboard
