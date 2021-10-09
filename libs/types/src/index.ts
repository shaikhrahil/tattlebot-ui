export interface ILoginReq {
  userName: string
  password: string
}

export interface ILoginRes {
  access_token: string
  refresh_token: string
}

export interface IObserver {
  name: string
}

export interface IDevice {
  name: string
  description: string
  observers: IObserver[]
  status: 'active' | 'inactive' | 'online' | 'offline'
}
