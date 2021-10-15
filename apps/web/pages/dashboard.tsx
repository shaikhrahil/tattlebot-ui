import { useStats, useUser } from '@tbot/hooks'
import React, { ReactElement, useEffect, useState } from 'react'

const Dashboard = () => {
  const user = useUser()
  const stats = useStats()

  const [state, setState] = useState(null)

  useEffect(() => {
    stats.listen((props: any) => {
      setState(props)
    })
  }, [])

  const Wrapper = ({ children }: { children: ReactElement }) => (
    <div>
      <div>
        Dashboard
        <p> Hi {user.firstName}</p>
        <p>Good morning !</p>
        {children}
      </div>
    </div>
  )

  if (stats.connecting) {
    return (
      <Wrapper>
        <p>Loading ...</p>
      </Wrapper>
    )
  }

  if (stats.error) {
    return (
      <Wrapper>
        <p>{stats.error}</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {state && (
        <div>
          <div title="No. of Observers">
            <p>Observers</p>
            <p>{state.observers}</p>
          </div>

          <div title="Number of devices">
            <p>Devices</p>
            <p>{state.devices}</p>
          </div>

          <div title="Rate of events">
            <p>Rate</p>
            <p>{state.rate} / min</p>
          </div>

          <div title="No. of device online hours">
            <p>Bandwidth</p>
            <p>{state.bandwidth} hours</p>
          </div>

          <div title="Last event reception">
            <p>Last Event</p>
            <p>{state.last} min ago</p>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default Dashboard
