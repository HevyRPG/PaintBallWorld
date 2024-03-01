import React from 'react'

const FormTextarea = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-primary mb-1">
        {label}
        <textarea
          placeholder={placeholder}
          id={name}
          name={name}
          value={value}
          className="w-full p-2 text-secondary border rounded"
          onChange={onChange}
        ></textarea>
      </label>
    </div>
  )
}

export default FormTextarea
