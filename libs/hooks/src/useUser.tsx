import { UserContext } from '@tbot/shared'
import { useContext } from 'react'

export const useUser = () => {
  const ctx = useContext(UserContext)
  return ctx
}
