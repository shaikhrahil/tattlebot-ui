export interface IUser {
  id: number
  firstName: string
  lastName: string
}
export interface ILoginReq {
  userName: string
  password: string
}

export interface ILoginRes {
  access_token: string
  refresh_token: string
}

export interface IObserver {
  id: number
  name: string
}

export interface IDevice {
  id: number
  name: string
  description: string
  observers: IObserver[]
  status: 'active' | 'inactive' | 'online' | 'offline'
}
