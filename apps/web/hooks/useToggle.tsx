import { useState } from 'react'

export default (initial = false) => {
  const [active, setActive] = useState(initial)
  const toggle = () => {
    setActive((prev) => !prev)
  }
  return { toggle, active, setActive }
}
