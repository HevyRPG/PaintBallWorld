import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Calendar } from '@/components/ui/calendar'
import PhotoGallery from '@/components/ui/PhotoGallery'
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
import OwnerEventsData from '../components/OwnerDashboard/OwnerEventsData'

const OwnerDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [fieldId, setFieldId] = useState('')
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
    const fetchFieldId = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/api/Owner/Profile`, config)
        setFieldId(response.data.fieldId)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchFieldId()
  }, [])

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
            {/* Manage Field Section */}
            <div className="relative p-4 border border-secondary text-secondary-foreground shadow rounded-xl flex flex-col items-center justify-center m-auto">
              <h1 className="text-xl font-semibold mb-4">Zarządzaj Polem</h1>
              <div className="flex gap-2">
                {fieldId == null && <AddFieldDialog />}
                {fieldId !== null && <EditFieldDialog fieldId={fieldId} />}
                {fieldId !== null && <DeleteFieldDialog fieldId={fieldId} />}
              </div>
            </div>
            {/* Manage Sets and Photos Section */}
            {fieldId !== null && (
              <div className="relative p-4 border m-auto border-secondary text-secondary-foreground shadow rounded-xl flex flex-col items-center justify-center">
                <h1 className="text-xl font-semibold mb-4">
                  Zarządzaj Zestawami i Zdjęciami
                </h1>
                <div className="flex gap-2">
                  <AllSetsDialog fieldId={fieldId} />
                  <AddSetDialog fieldId={fieldId} />
                  <AddPhotoDialog fieldId={fieldId} />
                  <DeletePhotoDialog fieldId={fieldId} />
                </div>
              </div>
            )}
          </section>
          {/* Calendar and Photo Gallery Section */}
          {fieldId !== null && (
            <section className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <div className="bg-background rounded-xl p-6">
                  <h1 className="text-xl font-semibold mb-4">
                    Wybierz datę, aby wyświetlić rozgrywki
                  </h1>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    numberOfMonths={2}
                    fixedWeeks
                    locale={pl}
                    className="border w-[500px] rounded-xl"
                  />
                </div>
              </div>
              <div className="w-auto">
                <h1 className="text-xl font-semibold mb-4">Galeria</h1>
                <PhotoGallery fieldID={fieldId} width={500} height={300} />
              </div>
            </section>
          )}
          {/* Event Planning Section */}
          {fieldId !== null && (
            <>
              <div className="relative p-4 border m-auto border-secondary text-secondary-foreground shadow rounded-xl flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-4 justify-center">
                  Planowanie wydarzeń
                </h1>
                <Scheduler fieldId={fieldId} />
              </div>
              <section className="w-full min-h-96 border rounded-xl flex justify-center">
                <div className="w-full min-w-screen-xl">
                  <OwnerEventsData
                    fieldId={fieldId}
                    selectedDate={selectedDate}
                  />
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
