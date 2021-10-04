import { useState } from 'react'

const useToggle = (initial = false) => {
  const [active, setActive] = useState(initial)
  const toggle = () => {
    setActive((prev) => !prev)
  }
  return { toggle, active, setActive }
}

export default useToggle
