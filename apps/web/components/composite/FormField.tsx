import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import { Input } from '../atomic/Input'

interface Generic extends UseControllerProps {
  error?: string
}

interface Props extends Generic {
  type?: 'text' | 'password' | 'number'
  placeholder: string
}

export const FormInput = (props: Props) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <>
          <Input {...field} name={props.name} type={props.type || 'text'} placeholder={props.placeholder} />
          {props.error && <span className="tw-text-error tw-text-sm"> {props.error} </span>}
        </>
      )}
    />
  )
}
