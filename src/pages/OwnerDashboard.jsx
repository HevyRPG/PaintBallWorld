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
import axios from 'axios'
import APIKEYS from '../components/APIKEYS'
import Scheduler from '@/components/OwnerDashboard/Scheduler'

const OwnerDashboard = () => {
  const [date, setDate] = useState(new Date())
  const [formattedDate, setFormattedDate] = useState('')
  const [fieldid, setFieldId] = useState('')
  const { isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const token = Cookies.get('authToken')
  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    if (!Cookies.get('role')) {
      logout()
      navigate('/')
    }
  }, [logout, navigate])

  useEffect(() => {
    if (date) {
      const newFormattedDate =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0')

      setFormattedDate(newFormattedDate)
    }
  }, [date])

  useEffect(() => {
    const fetchID = async () => {
      try {
        const response = await axios.get('/api/Owner/Profile', config)
        setFieldId(response.data.fieldId)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchID()
  }, [])
  console.log(fieldid)
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
                {fieldid == null && <AddFieldDialog />}
                {fieldid !== null && <EditFieldDialog fieldId={fieldid} />}
                {fieldid !== null && <DeleteFieldDialog fieldId={fieldid} />}
              </div>
            </div>
            {fieldid !== null && (
              <div className="relative p-4 border m-auto border-secondary text-secondary-foreground shadow rounded-xl flex flex-col items-center justify-center">
                <h1 className="text-xl font-semibold mb-4">
                  Zarządzaj Zestawami i Zdjęciami
                </h1>
                <div className="flex gap-2">
                  <AllSetsDialog fieldId={fieldid} />
                  <AddSetDialog fieldId={fieldid} />
                  <AddPhotoDialog fieldId={fieldid} />
                  <DeletePhotoDialog fieldId={fieldid} />
                </div>
              </div>
            )}
          </section>
          {fieldid !== null && (
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
                <PhotoGallery fieldID={fieldid} width={500} height={300} />
              </div>
            </section>
          )}
          {fieldid !== null && (
            <>
              <div className="relative p-4 border m-auto border-secondary text-secondary-foreground shadow rounded-xl flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-4 justify-center">
                  Planowanie wydarzeń
                </h1>
                <Scheduler fieldId={fieldid} />
              </div>
              <section className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <div className="bg-background rounded-xl border p-6">
                    <h1 className="text-2xl font-bold mb-4">
                      Rozgrywki otwarte w dniu{' '}
                      <span className="text-primary italic">
                        {formattedDate}
                      </span>
                    </h1>

                    <OpenEventsTable fieldID="123" />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="bg-background rounded-xl border p-6">
                    <h1 className="text-2xl font-bold mb-4">
                      Rezerwacje pola w dniu{' '}
                      <span className="text-primary italic">
                        {formattedDate}
                      </span>
                    </h1>

                    <PrivateEventsTable fieldID="123" />
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default OwnerDashboard
