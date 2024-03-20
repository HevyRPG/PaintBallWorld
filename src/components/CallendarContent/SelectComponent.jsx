import React from 'react'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'

const SelectComponent = ({ onChange }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="m-1 p-6 w-[120px] rounded">
        <SelectValue placeholder="+10 KM" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">+10 KM</SelectItem>
        <SelectItem value="20">+20 KM</SelectItem>
        <SelectItem value="50">+50 KM</SelectItem>
        <SelectItem value="100">+100 KM</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectComponent
