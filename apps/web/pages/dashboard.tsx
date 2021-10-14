import { useUser } from '@tbot/hooks'
import React from 'react'

const Dashboard = () => {
  const user = useUser()
  return (
    <div>
      Dashboard
      <p> Hi {user.firstName}</p>
      <p>Good morning !</p>
    </div>
  )
}

export default Dashboard
