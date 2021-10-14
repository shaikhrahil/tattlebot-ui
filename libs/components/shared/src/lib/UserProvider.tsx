import React, { createContext, ReactElement, useState } from 'react'
import { IUser } from '@tbot/types'

type IUserContext = Partial<IUser> & { set: (user: IUser) => void; update: (user: Partial<IUser>) => void }
export const UserContext = createContext<IUserContext | null>(null)

export const UserProvider = ({ children, user }: { children: ReactElement; user?: IUser }) => {
  const [state, setState] = useState<IUser | null>(user ? user : null)

  const update = (u: Partial<IUser>) => {
    setState(Object.assign(u, state))
  }

  const set = (u: IUser) => {
    setState(u)
  }

  return <UserContext.Provider value={state ? { ...state, set, update } : { set, update }}>{children}</UserContext.Provider>
}
