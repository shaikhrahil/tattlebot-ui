import React from 'react'
import { useForm } from 'react-hook-form'
import { FormField as Input } from '../components/atomic/FormField'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const login = (data) => {
    console.log(data)
  }

  console.log({ errors })

  return (
    <form data-testid="login-form" onSubmit={handleSubmit(login)}>
      <Input
        {...register('email', { required: true })}
        type="text"
        placeholder="Username"
      />
      {errors.email?.type === 'required' && (
        <span className="tw-text-error">Username Required</span>
      )}
      <Input
        {...register('password', { required: true })}
        type="password"
        placeholder="Password"
      />
      {errors.password?.type === 'required' && (
        <span data-testid="abc" className="tw-text-error">
          Password Required
        </span>
      )}
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
