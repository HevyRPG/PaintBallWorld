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

const AllSetsDialog = ({ fieldId }) => {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/Field/Sets/${fieldId}`)
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wszystkie zestawy</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {sets.map((set) => (
              <div key={set.id}>
                <p>{set.description}</p>
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
