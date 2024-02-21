import React from 'react'

const FormInput = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-primary mb-1">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        value={value}
        className="w-full p-2 text-secondary border rounded"
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput
