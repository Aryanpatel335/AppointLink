import React from 'react'

export const Input = ({name, type, placeholder, onChange}) => {
  return (
    <>
        <input name={name} type={type} placeholder={placeholder} onChange={onChange}   required/>
    
    </>
  )
}
