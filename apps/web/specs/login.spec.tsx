import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Login } from '../pages/login'

describe('Login', () => {
  let LoginEl: RenderResult

  beforeEach(() => {
    LoginEl = render(<Login />)
  })

  // afterEach(() => {})

  it('should render', () => {
    const { baseElement } = LoginEl
    expect(baseElement).toBeTruthy()
  })
  it.todo('should login user')
  it.todo('should show loader when logging in')

  it('should show error message when all empty fields', async () => {
    const loginForm = LoginEl.getByTestId('login-form')
    await act(async () => {
      fireEvent.submit(loginForm)
    })
    expect(LoginEl.getByText('Username Required')).toBeTruthy()
    expect(LoginEl.getByText('Password Required')).toBeTruthy()
  })

  it('should show error message username empty', async () => {
    const loginForm = LoginEl.getByTestId('login-form')
    const passwordField = LoginEl.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'lsdk' } })
      fireEvent.submit(loginForm)
    })
    expect(LoginEl.getByText('Username Required')).toBeTruthy()
  })

  it('should show error message when password empty', async () => {
    const loginForm = LoginEl.getByTestId('login-form')
    const usernameField = LoginEl.getByPlaceholderText('Username')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'rahil.shaikh' } })
      fireEvent.submit(loginForm)
    })
    expect(LoginEl.getByText('Password Required')).toBeTruthy()
  })
})
