import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormField as Input } from '../components/atomic/FormField'
import { useLogin } from '../hooks/useLogin'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { mutateAsync } = useLogin()
  const router = useRouter()

  const login = async (data) => {
    const res = await mutateAsync(data)
    router.push('/dashboard')
  }

  return (
    <form data-testid="login-form" onSubmit={handleSubmit(login)}>
      <Input {...register('userName', { required: true })} type="text" placeholder="Username" />
      {errors.userName?.type === 'required' && <span className="tw-text-error">Username Required</span>}
      <Input {...register('password', { required: true })} type="password" placeholder="Password" />
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
