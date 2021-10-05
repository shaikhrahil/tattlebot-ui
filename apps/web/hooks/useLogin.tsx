import axios from 'axios'
import { useMutation } from 'react-query'

interface Props {
  userName: string
  password: string
}

export const useLogin = () => {
  return useMutation((props: Props) => axios.post(`${process.env.SERVER_URL}/login`, props))
}
