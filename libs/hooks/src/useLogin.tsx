import { login } from '@tbot/api'
import { ILoginReq } from '@tbot/types'
import { useState } from 'react'
import { useMutation } from 'react-query'

const responseMap: Record<number, string> = {
  404: 'Unable to reach server',
  401: 'Invalid Username or',
}

export const useLogin = () => {
  const { mutateAsync, isLoading: loading } = useMutation((props: ILoginReq) => login(props))

  const [error, setError] = useState('')

  const exec = async (props: ILoginReq) => {
    try {
      const res = await mutateAsync(props)
      return res
    } catch (e: any) {
      setError(responseMap[e.response?.status] || 'Unable to login')
      return null
    }
  }

  return { exec, error, loading }
}

export default useLogin
