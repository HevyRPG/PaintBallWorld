import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import APIKEYS from '../APIKEYS'
import Cookies from 'js-cookie'

const FieldInfoSets = ({ fieldId }) => {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('authToken')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true)
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(
          `${apiUrl}/api/Field/Sets/${fieldId}`,
          config
        )
        setSets(response.data)
      } catch (error) {
        console.error('Error fetching sets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSets()
  }, [fieldId])

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="lg" className="rounded border-primary">
          Wyświetl warianty cenowe
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-96 border-primary">
        <DialogHeader>
          <DialogTitle>Warianty cenowe</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="auto">
            <thead className="border">
              <tr className="border">
                <th className="border">Ilość kulek</th>
                <th className="border">Cena</th>
                <th className="border">Opis</th>
              </tr>
            </thead>
            <tbody className="border">
              {sets.map((set) => (
                <tr key={set.id} className="border">
                  <td className="p-4 border">{set.ammo}</td>
                  <td className="p-4 border">{set.price}</td>
                  <td className="p-4 border">{set.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default FieldInfoSets
