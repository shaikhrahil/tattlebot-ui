import { useLogin } from '@tbot/hooks'
import { FormInput } from '@tbot/web'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const loginReq = useLogin()
  const router = useRouter()

  const login = async (data) => {
    const res = await loginReq.exec(data)
    if (!res) {
      return
    }
    router.push('/dashboard')
  }

  return (
    <>
      {loginReq.error && <p>{loginReq.error}</p>}
      <form data-testid="login-form" onSubmit={handleSubmit(login)}>
        <FormInput
          name="userName"
          control={control}
          type="text"
          defaultValue=""
          placeholder="Username"
          rules={{ required: true }}
          error={errors.userName && 'Username Required'}
        />
        <FormInput
          name="password"
          control={control}
          type="password"
          defaultValue=""
          placeholder="Password"
          rules={{ required: true }}
          error={errors.password && 'Password Required'}
        />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login
