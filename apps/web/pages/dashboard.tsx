import { useDevices } from '@tbot/hooks'
import React from 'react'

const Dashboard = () => {
  const deviceReq = useDevices()

  if (deviceReq.loading) return <p>Loading ... </p>
  if (deviceReq.error) return <p> {deviceReq.error} </p>

  return (
    <section>
      <div>My Devices</div>
      {deviceReq.data.map((d) => (
        <p>{JSON.stringify(d)}</p>
      ))}
    </section>
  )
}

export default Dashboard
