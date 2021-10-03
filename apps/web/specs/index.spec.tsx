import '../utils/matchMedia'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Index from '../pages/index'

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />)
    expect(baseElement).toBeTruthy()
  })

  it('should toggle theme', () => {
    const { getByRole } = render(<Index />)
    const themeBtn = getByRole('button')
    const isLightMode = () => {
      expect(themeBtn.innerHTML).toContain('dark')
      expect(document.body.classList).not.toContain('dark')
    }
    const isDarkMode = () => {
      expect(themeBtn.innerHTML).not.toContain('dark')
      expect(document.body.classList).toContain('dark')
    }
    if (document.body.classList.contains('dark')) {
      isDarkMode()
      fireEvent.click(themeBtn)
      isLightMode()
    } else {
      isLightMode()
      fireEvent.click(themeBtn)
      isDarkMode()
    }
  })
})
