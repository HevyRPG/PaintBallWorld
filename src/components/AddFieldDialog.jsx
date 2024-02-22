import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import FormInput from '../components/FormInput'

const MultiPageDialog = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 nextPage={nextPage} />
      case 2:
        return <Page2 nextPage={nextPage} prevPage={prevPage} />
      case 3:
        return <Page3 prevPage={prevPage} />
      default:
        return null
    }
  }

  return <div>{renderPage()}</div>
}

const Page1 = ({ nextPage }) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput
          label="Numer telefonu"
          type="text"
          name="companyPostalNumber"
        />
        <FormInput label="Ulica" type="text" name="companyPostalNumber" />
        <FormInput label="Numer domu" type="text" name="companyPostalNumber" />
        <FormInput label="Miasto" type="text" name="companyPostalNumber" />
        <FormInput
          label="Kod pocztowy"
          type="text"
          name="companyPostalNumber"
          placeholder="00-000"
        />
        <FormInput
          label="Geotag (współrzędne)"
          type="text"
          name="companyPostalNumber"
          placeholder="52.23198970, 21.005957745"
        />
      </div>
      <Button variant="outline" onClick={nextPage}>
        Dalej
      </Button>
    </div>
  )
}

const Page2 = ({ prevPage, nextPage }) => {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput label="Nazwa pola" type="text" name="companyPostalNumber" />
        <FormInput
          label="Powierzchnia w m²"
          type="text"
          name="companyPostalNumber"
        />
        <FormInput label="Regulamin" type="file" name="companyPostalNumber" />
      </div>
      <label className="text-primary">Opis</label>
      <textarea
        placeholder="Opis"
        rows="9"
        cols="40"
        className="text-black"
      ></textarea>
      <div className="grid grid-cols-2 items-center gap-4">
        <FormInput
          label="Minimalna liczba graczy"
          type="text"
          name="companyPostalNumber"
        />
        <FormInput
          label="Maksymalna liczba graczy"
          type="text"
          name="companyPostalNumber"
        />
        <FormInput
          label="Ilość wydarzeń które mogą odbywać się jednocześnie"
          type="text"
          name="companyPostalNumber"
        />
      </div>
      <div className="grid gap-2">
        <Button variant="outline" onClick={prevPage}>
          Cofnij
        </Button>
        <Button variant="outline" onClick={nextPage}>
          Dalej
        </Button>
      </div>
    </div>
  )
}

const Page3 = ({ prevPage }) => {
  const [numTimesClicked, setNumTimesClicked] = useState(1)

  const handleAddFields = () => {
    setNumTimesClicked((prevCount) => prevCount + 1)
  }

  const renderFields = () => {
    const fields = []
    for (let i = 1; i < numTimesClicked; i++) {
      fields.push(
        <div key={i} className="grid grid-cols-4 items-center gap-4">
          <h2>Wariant {i + 1}</h2>
          <FormInput
            label="Ilość kulek"
            type="text"
            name={`companyPostalNumber_${i}`}
          />
          <FormInput label="Cena" type="text" name={`companyPrice_${i}`} />
          <FormInput
            label="Opis"
            type="text"
            name={`companyDescription_${i}`}
          />
        </div>
      )
    }
    return fields
  }
  return (
    <div className="grid gap-2">
      <h1>Uzupełnij conajmniej jeden wariant</h1>
      <div className="grid grid-cols-4 items-center gap-4">
        <h2>Wariant 1</h2>
        <FormInput label="Ilość kulek" type="text" name="companyPostalNumber" />
        <FormInput label="Cena" type="text" name="companyPostalNumber" />
        <FormInput label="Opis" type="text" name="companyPostalNumber" />
      </div>
      {renderFields()}
      <Button variant="ghost" onClick={handleAddFields}>
        Dodaj wariant
      </Button>
      <div className="grid gap-2">
        <Button variant="outline" onClick={prevPage}>
          Cofnij
        </Button>
        <Button variant="default">Wyślij</Button>
      </div>
    </div>
  )
}

const AddFieldDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="lg" className="rounded">
          Dodaj Pole
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj pole</DialogTitle>
        </DialogHeader>
        <MultiPageDialog></MultiPageDialog>
      </DialogContent>
    </Dialog>
  )
}

export default AddFieldDialog
