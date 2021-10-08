import { useToggle } from '@tbot/hooks'
import React, { useCallback, useEffect } from 'react'

export function Index() {
  const darkTheme = useToggle(true)

  const switchTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      darkTheme.toggle()
      document.body.classList.toggle('dark')
    },
    [darkTheme],
  )

  useEffect(() => {
    if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkTheme.setActive(false)
      document.body.classList.remove('dark')
    }
  }, [])

  return (
    <div className="">
      <button onClick={switchTheme}>{darkTheme.active ? 'light' : 'dark'}</button>
    </div>
  )
}

export default Index
