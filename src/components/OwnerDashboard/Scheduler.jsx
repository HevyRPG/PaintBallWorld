import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import FormInput from '../FormInput'
import APIKEYS from '../APIKEYS'
import Cookies from 'js-cookie'

const Scheduler = ({ fieldId }) => {
  const [formData, setFormData] = useState({
    eventType: 'open',
    selectedDays: [],
    finalDate: '',
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    timeValue: '',
    maxPlayers: '',
    isMultiple: false,
    isWeekly: false,
    isAutomatic: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = Cookies.get('authToken')

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleEventTypeChange = (e) => {
    setFormData({ ...formData, eventType: e.target.value })
  }

  const handleDaySelection = (day) => {
    const isSelected = formData.selectedDays.includes(day)
    if (isSelected) {
      setFormData({
        ...formData,
        selectedDays: formData.selectedDays.filter(
          (selectedDay) => selectedDay !== day
        ),
      })
    } else {
      setFormData({
        ...formData,
        selectedDays: [...formData.selectedDays, day],
      })
    }
  }
  const calculateEventCount = () => {
    const startTime = new Date(`2024-01-01T${formData.startTime}`)
    const endTime = new Date(`2024-01-01T${formData.endTime}`)

    const timeDiff = endTime - startTime

    const timeDiffInHours = timeDiff / (1000 * 60 * 60)

    const eventCount = timeDiffInHours / formData.timeValue

    Math.ceil(eventCount)
    let displayCount

    if (isNaN(eventCount) || !isFinite(eventCount)) {
      displayCount = 0
    } else {
      displayCount = eventCount
    }
    return Math.floor(displayCount)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    console.log(formData)
    if (formData.maxPlayers < 1) {
      setError('Błędna liczba graczy')
      setLoading(false)
      return
    }
    if (formData.timeValue < 0) {
      setError('Błędna wartość czasu')
      setLoading(false)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(
        `${apiUrl}/api/Schedule/Schedule/${fieldId}`,
        formData,
        config
      )
      console.log('Event created successfully:', response.data)
      if (response.status === 200) {
        setError('Dodano pomyślnie!')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      setError('An error occurred while creating the event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="lg" className="rounded border-primary">
          Dodaj wydarzenie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj wydarzenie</DialogTitle>
        </DialogHeader>
        <div>
          <FormInput
            label="Rodzaj wydarzenia"
            type="select"
            name="eventType"
            value={formData.eventType}
            onChange={handleEventTypeChange}
            options={[
              { value: 'open', label: 'Wydarzenie otwarte' },
              { value: 'private', label: 'Wolny termin' },
            ]}
          />
          {formData.eventType === 'open' && (
            <>
              {' '}
              <div>
                <p className="m-2">
                  Dodanie wielu wydarzeń na podstawie dni tworzy wydarzenia od
                  najbliższego wybranego dnia tygodnia.
                </p>

                <div>
                  <div>
                    <input
                      type="checkbox"
                      id="isMultiple"
                      checked={formData.isMultiple}
                      onChange={(e) =>
                        handleInputChange('isMultiple', e.target.checked)
                      }
                    />
                    <label htmlFor="isMultiple">Wiele dni</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="isWeekly"
                      checked={formData.isWeekly}
                      onChange={(e) =>
                        handleInputChange('isWeekly', e.target.checked)
                      }
                    />
                    <label htmlFor="isWeekly">Powtarza się co tydzień</label>
                  </div>
                </div>
              </div>
              {formData.isMultiple && (
                <div>
                  <label>Wybierz dni:</label>
                  <div>
                    {[
                      { eng: 'Monday', pl: 'Poniedziałek' },
                      { eng: 'Tuesday', pl: 'Wtorek' },
                      { eng: 'Wednesday', pl: 'Środa' },
                      { eng: 'Thursday', pl: 'Czwartek' },
                      { eng: 'Friday', pl: 'Piątek' },
                      { eng: 'Saturday', pl: 'Sobota' },
                      { eng: 'Sunday', pl: 'Niedziela' },
                    ].map((day) => (
                      <Button
                        key={day.eng}
                        variant={
                          formData.selectedDays.includes(day.eng)
                            ? 'default'
                            : 'ghost'
                        }
                        onClick={() => handleDaySelection(day.eng)}
                        className="m-1 w-32 border"
                      >
                        {day.pl}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {!formData.isMultiple && (
                <FormInput
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              )}
              {formData.isWeekly && (
                <FormInput
                  label="Do kiedy ma się powtarzać?"
                  type="date"
                  value={formData.finalDate}
                  onChange={(e) =>
                    handleInputChange('finalDate', e.target.value)
                  }
                />
              )}
              <FormInput
                label="Godzina rozpoczęcia"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
              <FormInput
                label="Godzina zakończenia"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
              />
              <FormInput
                label="Nazwa wydarzenia"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              <FormInput
                label="Opis"
                type="text"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
              />
              <FormInput
                label="Maksymalna liczba uczestników"
                type="number"
                value={formData.maxPlayers}
                onChange={(e) =>
                  handleInputChange('maxPlayers', e.target.value)
                }
              />
            </>
          )}
          {formData.eventType === 'private' && (
            <>
              <div>
                <p className="m-2">
                  Dodanie wielu wydarzeń na podstawie dni tworzy wydarzenia od
                  najbliższego wybranego dnia tygodnia.
                </p>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id="isMultiple"
                      checked={formData.isMultiple}
                      onChange={(e) =>
                        handleInputChange('isMultiple', e.target.checked)
                      }
                    />
                    <label htmlFor="isMultiple">Wiele dni</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="isWeekly"
                      checked={formData.isWeekly}
                      onChange={(e) =>
                        handleInputChange('isWeekly', e.target.checked)
                      }
                    />
                    <label htmlFor="isWeekly">Powtarza się co tydzień</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="isAutomatic"
                      checked={formData.isAutomatic}
                      onChange={(e) =>
                        handleInputChange('isAutomatic', e.target.checked)
                      }
                    />
                    <label htmlFor="isAutomatic">
                      Automatyczne tworzenie na wydarzeń (Godziny otwarcia /
                      Czas rozgrywki).
                    </label>
                  </div>
                </div>
              </div>
              {formData.isMultiple && (
                <div>
                  <label>Wybierz dni:</label>
                  <div>
                    {[
                      { eng: 'Monday', pl: 'Poniedziałek' },
                      { eng: 'Tuesday', pl: 'Wtorek' },
                      { eng: 'Wednesday', pl: 'Środa' },
                      { eng: 'Thursday', pl: 'Czwartek' },
                      { eng: 'Friday', pl: 'Piątek' },
                      { eng: 'Saturday', pl: 'Sobota' },
                      { eng: 'Sunday', pl: 'Niedziela' },
                    ].map((day) => (
                      <Button
                        key={day.eng}
                        variant={
                          formData.selectedDays.includes(day.eng)
                            ? 'default'
                            : 'ghost'
                        }
                        onClick={() => handleDaySelection(day.eng)}
                        className="m-1 w-32 border"
                      >
                        {day.pl}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {!formData.isMultiple && (
                <FormInput
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              )}
              {formData.isWeekly && (
                <FormInput
                  label="Do kiedy ma się powtarzać?"
                  type="date"
                  value={formData.finalDate}
                  onChange={(e) =>
                    handleInputChange('finalDate', e.target.value)
                  }
                />
              )}
              <FormInput
                label={
                  formData.isAutomatic
                    ? 'Godzina otwarcia pola'
                    : 'Godzina rozpoczęcia'
                }
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
              <FormInput
                label={
                  formData.isAutomatic
                    ? 'Godzina zamknięcia pola'
                    : 'Godzina zakończenia'
                }
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
              />
              <FormInput
                label="Opis"
                type="text"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
              />
              <FormInput
                label="Maksymalna liczba uczestników"
                type="number"
                value={formData.maxPlayers}
                onChange={(e) =>
                  handleInputChange('maxPlayers', e.target.value)
                }
              />
              {formData.isAutomatic && (
                <>
                  <FormInput
                    label="Czas rozgrywki (w godzinach)"
                    type="number"
                    value={formData.timeValue}
                    onChange={(e) =>
                      handleInputChange('timeValue', e.target.value)
                    }
                  />
                  <p>
                    Liczba wydarzeń w ciągu dnia, które zostaną utworzone:{' '}
                    {calculateEventCount()}.
                  </p>
                </>
              )}
            </>
          )}

          <Button variant="default" onClick={handleSubmit} disabled={loading}>
            Dodaj
          </Button>
          {error && (
            <p
              className={`mt-2 text-sm ${
                error === 'Dodano pomyślnie!'
                  ? 'text-green-500'
                  : 'text-destructive'
              }`}
            >
              {error}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Scheduler
