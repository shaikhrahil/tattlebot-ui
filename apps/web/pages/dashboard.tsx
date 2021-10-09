import { useDevices } from '@tbot/hooks'
import { nanoid } from 'nanoid'
import React from 'react'

const DeviceList = () => {
  const deviceReq = useDevices()

  if (deviceReq.loading) return <p>Loading ... </p>
  if (deviceReq.error) return <p> {deviceReq.error} </p>

  return (
    <>
      {deviceReq.data.data.map((d) => (
        <p key={nanoid()}>{d.name}</p>
      ))}
    </>
  )
}

const Dashboard = () => {
  return (
    <section>
      <div>My Devices</div>
      <DeviceList />
    </section>
  )
}

export default Dashboard
