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
import DeleteSetDialog from './DeleteSetDialog'
import APIKEYS from '../APIKEYS'
import Cookies from 'js-cookie'

const AllSetsDialog = ({ fieldId }) => {
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
        const response = await axios.get(`/api/Field/Sets/${fieldId}`, config)
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
          Wyświetl wszystkie zestawy
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-96 border-primary">
        <DialogHeader>
          <DialogTitle>Wszystkie zestawy</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-row items-start">
            {sets.map((set) => (
              <div key={set.id} className="border m-2 p-2 flex-shrink-1 w-auto">
                <p>Ilość kulek: {set.ammo}</p>
                <p>Cena: {set.price}</p>
                <p className="">Opis: {set.description}</p>
                <DeleteSetDialog fieldId={fieldId} set={set} />
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AllSetsDialog
