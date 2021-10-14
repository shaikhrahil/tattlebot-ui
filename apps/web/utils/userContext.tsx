import { IUser } from '@tbot/types'
import { createContext } from 'react'

export const UserContext = createContext<IUser & { set: (user: Partial<IUser>) => void }>(null)
