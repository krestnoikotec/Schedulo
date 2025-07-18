import React from 'react'

type InputProps = {
  type: string
  placeholder?: string
  children?: React.ReactNode
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  name: string
  max?: string
  min?: string
}

const Input = ({
  type,
  placeholder,
  value,
  children,
  onChange,
  name,
  min,
  max,
}: InputProps) => {
  return (
    <div>
      <label>
        {children}
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          max={max}
          min={min}
        />
      </label>
    </div>
  )
}

export default Input
