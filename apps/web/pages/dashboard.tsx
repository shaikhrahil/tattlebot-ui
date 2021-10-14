import * as hooks from '@tbot/hooks'
import React, { ReactElement, useEffect, useState } from 'react'

const Dashboard = () => {
  const user = hooks.useUser()
  const stats = hooks.useStats()

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
          <div>
            <p>Observers</p>
            <p>{state.observers}</p>
          </div>

          <div>
            <p>Devices</p>
            <p>{state.devices}</p>
          </div>

          <div>
            <p>Rate</p>
            <p>{state.rate} / min</p>
          </div>

          <div>
            <p>Bandwidth</p>
            <p>{state.bandwidth} hours</p>
          </div>
          <div>
            <p>Last Event</p>
            <p>{state.last} min ago </p>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default Dashboard
