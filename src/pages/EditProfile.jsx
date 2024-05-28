import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@radix-ui/themes'
import { AuthContext } from '../context/AuthContext'
import ProfileSettings from '../components/UserSettings/ProfileSettings'
import AccountSettings from '../components/UserSettings/AccountSettings'
import BecomeOwner from '../components/UserSettings/BecomeOwner'
import Cookies from 'js-cookie'

const EditProfile = () => {
  const role = Cookies.get('role')
  const isOwner = role === 'Owner'
  const { isLoggedIn, logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout() // Use logout function from context
    navigate('/')
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!Cookies.get('role')) {
      logout()
      navigate('/')
    }
  }, [logout, navigate])

  const [currentSection, setCurrentSection] = useState('profile')

  const handleSectionChange = (section) => {
    setCurrentSection(section)
  }

  return (
    <>
      <div className="container mx-auto max-w-screen-2xl bg-background w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row ">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-secondary top-12 p-8 space-y-6">
            <button
              className="flex hover:text-primary"
              onClick={() => navigate(-1)}
            >
              &larr; Powrót
            </button>

            <h1 className="text-4xl font-semibold text-primary mb-8">
              Edytuj profil
            </h1>

            <Button
              onClick={() => handleSectionChange('profile')}
              className={`flex items-center px-3 py-2.5 font-bold    hover:border hover:bg-secondary  rounded-full ${
                currentSection === 'profile' ? 'active' : ''
              }`}
            >
              Profil
            </Button>
            <Button
              onClick={() => handleSectionChange('accountSettings')}
              className={`flex items-center px-3 py-2.5 font-bold   hover:border hover:bg-secondary rounded-full ${
                currentSection === 'accountSettings' ? 'active' : ''
              }`}
            >
              Ustawienia Konta
            </Button>
            {!isOwner && (
              <Button
                onClick={() => handleSectionChange('becomeOwner')}
                className={`flex items-center px-3 py-2.5 font-bold   hover:border hover:bg-secondary rounded-full ${
                  currentSection === 'becomeOwner' ? 'active' : ''
                }`}
              >
                Zostań właścicielem
              </Button>
            )}
            <Button
              className="flex items-center text-red-foreground px-3 py-2.5 font-semibold  hover:border hover:rounded-full  "
              onClick={handleLogout}
            >
              Wyloguj się
            </Button>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 ">
          {currentSection === 'profile' && <ProfileSettings />}
          {currentSection === 'accountSettings' && <AccountSettings />}
          {currentSection === 'becomeOwner' && <BecomeOwner />}
        </main>
      </div>
    </>
  )
}

export default EditProfile
