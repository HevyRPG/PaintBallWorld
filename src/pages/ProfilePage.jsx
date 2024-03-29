import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import APIKEYS from '../components/APIKEYS'
import Cookies from 'js-cookie'

const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = Cookies.get('authToken')
  const role = Cookies.get('role')
  const username = Cookies.get('username')
  const isOwner = role === 'Owner'
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('api/User/User/profile', {
          headers: {
            ...APIKEYS.headers,
            Authorization: `Bearer ${token}`, // Append Authorization header
          },
        })
        setUserData(response.data)
        setLoading(false) // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    fetchUserProfile()
  }, [])

  return (
    <div className="container bg-background m-8 rounded-xl mx-auto max-w-screen-2xl">
      <div className="flex-grow text-gray-200">
        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold text-primary mb-2">
                Profil
              </h1>
              <h2 className="text-secondary-foreground ml-0.5">
                Zarządzaj swoim profilem
              </h2>
            </div>
            <div className="flex flex-wrap items-start justify-end -mb-3">
              {isOwner ? (
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    className="inline-flex px-3 py-6  border-primary rounded-md mb-3 mr-4"
                  >
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  className="inline-flex px-3 py-6 border-primary rounded-md mb-3 mr-4"
                  disabled
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Dashboard
                </Button>
              )}

              {role !== 'Owner' && (
                <Button
                  variant="outline"
                  className="inline-flex px-3 py-6 border-primary rounded-md mb-3 mr-4"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Dashboard
                </Button>
              )}
              <Link to="/edit-profile">
                <Button
                  variant="default"
                  className="inline-flex px-3 py-6 rounded-md mt-0.5 ml-6 mb-3 hover:text-secondary-foreground hover:bg-secondary"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-6 w-6 text-primary-foreground -ml-1 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Edytuj profil
                </Button>
              </Link>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="flex items-center text-center justify-center py-4 border bg-secondary text-secondary-foreground shadow rounded-xl md:w-1/4 relative">
              {/* Username displayed above user data */}

              {loading && (
                <div>
                  <Skeleton className="h-8 w-[250px]" />
                </div>
              )}

              {/* Render user profile data */}
              {!loading && userData && (
                <div>
                  <img src="defavatar.png" className="mx-auto" />
                  <span className=" left-0 w-full text-primary text-xl font-bold italic">
                    {username}
                  </span>
                  <span className="block text-secondary-foreground">
                    {userData.firstName} {userData.lastName}
                  </span>
                  <span className="block">
                    Date of Birth:{' '}
                    {new Date(userData.dateOfBirth).toLocaleDateString()}
                  </span>
                  {userData.description && (
                    <span className="block">
                      Description: {userData.description}
                    </span>
                  )}
                  {userData.phoneNo && (
                    <span className="block">
                      Phone Number: {userData.phoneNo}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center text-center font-semibold pt-8 border  bg-secondary shadow rounded-xl md:w-3/4  text-card-foreground">
              <span className="block text-accent-foreground  text-2xl font-bold mb-12  ">
                Statystyki
              </span>
              <div className="grid grid-cols-4  gap-4">
                <div>
                  <span className="block ">Ukończone rozgrywki</span>
                  <span className="block ">100</span>
                </div>
                <div>
                  <span className="block ">Odwiedzone pola</span>
                  <span className="  ">50</span>
                </div>
                <div>
                  <span className="block ">Łączny czas gry</span>
                  <span className="  ">10 godzin</span>
                </div>
                <div>
                  <span className="block ">Wystawione opinie</span>
                  <span className="block  ">5</span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex gap-6">
            <div className="flex flex-col">
              <Calendar mode="single" className="rounded-md border shadow" />
            </div>

            <div className="w-full flex flex-col  text-secondary-foreground ">
              <div className="shadow rounded-xl">
                <div className="flex flex-col rounded-xl items-center bg-secondary justify-between px-6 py-5 font-semibold border">
                  <span className="text-secondary-foreground pb-8">
                    Najblizsze rozgrywki
                  </span>
                  <span>Poznań 06.05.2024</span>
                  <span>Warszawa 04.06.2024</span>
                </div>
              </div>

              <div className=" shadow rounded-xl bg-secondary  mt-6">
                <div className="flex flex-col rounded-xl  items-center justify-between px-6 py-5 font-semibold border">
                  <span className="text-secondary-foreground pb-8">
                    Historia rozgrywek
                  </span>
                  <span>Poznań 06.05.2024</span>
                  <span>Warszawa 04.06.2024</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default ProfilePage
