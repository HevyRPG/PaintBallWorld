import React from 'react'

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-primary mb-1">
        {label}
        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            className="w-full p-2 text-secondary border rounded"
            onChange={onChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'file' ? (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            className="w-full p-2 text-white border rounded"
            onChange={onChange}
          />
        ) : (
          <input
            placeholder={placeholder}
            type={type}
            id={name}
            name={name}
            value={value}
            className="w-full p-2 text-secondary border rounded"
            onChange={onChange}
          />
        )}
      </label>
    </div>
  )
}

export default FormInput
