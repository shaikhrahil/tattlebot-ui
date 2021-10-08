import axios from 'axios'
import { useState } from 'react'
import { useMutation } from 'react-query'

interface Props {
  userName: string
  password: string
}

const responseMap: Record<number, string> = {
  404: 'Unable to reach server',
  401: 'Invalid Username or',
}

export const useLogin = () => {
  const { mutateAsync, isLoading: loading } = useMutation((props: Props) => axios.post(`${process.env.SERVER_URL}/login`, props))

  const [error, setError] = useState('')

  const exec = async (props: Props) => {
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
