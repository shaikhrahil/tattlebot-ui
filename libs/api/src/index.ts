import { IDevice, ILoginReq } from '@tbot/types'
import axios from 'axios'

export const login = (props: ILoginReq) => axios.post(`${process.env.SERVER_URL}/login`, props)

export const getDevices = () => axios.get<IDevice[]>(`http://localhossknskdjksc/devices`)
