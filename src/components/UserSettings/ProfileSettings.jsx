import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import APIKEYS from '../APIKEYS'
import FormInput from '../FormInput'
import FormTextarea from '../FormTextarea'
import { Button } from '@/components/ui/button'
import { fetchUserProfile } from './components/AccountSettingsMethods'
import { format, parseISO } from 'date-fns'
import { formatPhone, handlePhoneChange } from './utils/phoneUtils' // Import nowego pliku
import { ProfilePicture } from './components/ProfilePicture'

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNo, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModified, setIsModified] = useState(false)
  const [phoneError, setPhoneError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [validationError, setValidationError] = useState('') // Stan do komunikatów o błędach

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile()
        setProfile(data)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setPhone(data.phoneNo)
        setDescription(data.description)
        if (data.dateOfBirth) {
          setDateOfBirth(format(parseISO(data.dateOfBirth), 'yyyy-MM-dd'))
        }
        setLoading(false)
      } catch (error) {
        console.error('Błąd podczas pobierania profilu:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (
      profile &&
      (firstName !== profile.firstName ||
        lastName !== profile.lastName ||
        phoneNo !== profile.phoneNo ||
        description !== profile.description ||
        dateOfBirth.slice(0, 10) !== profile.dateOfBirth.slice(0, 10))
    ) {
      setIsModified(true)
    } else {
      setIsModified(false)
    }
  }, [firstName, lastName, phoneNo, description, dateOfBirth, profile])

  const onPhoneChange = (e) => {
    handlePhoneChange(e, setPhone, setPhoneError)
  }

  const handleSave = async () => {
    if (!isModified || phoneError) {
      return
    }

    if (firstName.trim() === '' || lastName.trim() === '') {
      setValidationError('Imię i nazwisko nie mogą być puste')
      return
    }

    setValidationError('')

    const updatedData = {
      firstName,
      lastName,
      phoneNo,
      description,
      dateOfBirth,
    }

    const token = Cookies.get('authToken')

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      await axios.put(`${apiUrl}/api/User/User/profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...APIKEYS.headers,
        },
      })
      setUpdateSuccess(true)

      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Błąd podczas zapisywania danych:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const truncatedDateOfBirth = profile.dateOfBirth
    ? profile.dateOfBirth.slice(0, 10)
    : ''

  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg p-12">
        <h2 className="text-3xl font-bold sm:text-xl">Profil</h2>

        <div className="grid max-w-2xl mx-auto mt-8">
          <ProfilePicture />

          <div className="flex flex-row w-full sm:space-x-12 sm:space-y-0 sm:mb-4">
            <FormInput
              label="Imię"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                setValidationError('')
              }}
            />
            <FormInput
              label="Nazwisko"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                setValidationError('')
              }}
            />
          </div>
          {validationError && (
            <div className="text-red-500">{validationError}</div>
          )}

          <div className="mb-2 sm:mb-4">
            <FormInput
              label="Data urodzenia"
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value)
              }}
            />

            <span className="text-sm bg-secondary p-2 rounded">
              Aktualna data urodzenia: {truncatedDateOfBirth}
            </span>
          </div>

          <div className="mb-2 sm:mb-6">
            <FormInput
              label="Telefon"
              type="tel"
              placeholder="Wprowadź numer telefonu"
              value={phoneNo}
              onChange={onPhoneChange}
            />
            {phoneError && <div className="text-red-500">{phoneError}</div>}
          </div>

          <div className="mb-6 sm:mb-6 text-secondary">
            <FormTextarea
              label="Opis"
              placeholder="Opisz siebie"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="default"
              className="p-2 rounded bg-primary text-white"
              onClick={handleSave}
              disabled={!isModified || phoneError}
            >
              Zapisz
            </Button>
          </div>
          {updateSuccess && (
            <div className="flex justify-end text-green-500 mt-4">
              Profil został zaktualizowany pomyślnie.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
