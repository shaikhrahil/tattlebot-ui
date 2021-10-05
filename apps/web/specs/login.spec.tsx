import { fireEvent, render, RenderResult } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { useLogin } from '../hooks/useLogin'
import { Login } from '../pages/login'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../hooks/useLogin', () => ({
  useLogin: jest.fn(),
}))

describe('Login.tsx', () => {
  let LoginEl: RenderResult
  const creds = { userName: 'rahil', password: 'is awesome' }
  const mutateAsync = jest.fn()
  const push = jest.fn()

  beforeEach(() => {
    useLogin.mockImplementation(() => ({ mutateAsync }))
    useRouter.mockImplementation(() => ({ push }))
    LoginEl = render(<Login />)
  })

  afterEach(() => {
    LoginEl.unmount()
  })

  it('should render', () => {
    const { baseElement } = LoginEl
    expect(baseElement).toBeTruthy()
  })

  it('should login user', async () => {
    const loginForm = LoginEl.getByTestId('login-form')
    await act(async () => {
      fireEvent.change(LoginEl.getByPlaceholderText('Username'), { target: { value: creds.userName } })
      fireEvent.change(LoginEl.getByPlaceholderText('Password'), { target: { value: creds.password } })
      fireEvent.submit(loginForm)
    })
    expect(mutateAsync).toHaveBeenCalledWith(creds)
    expect(push).toHaveBeenCalledWith('/dashboard')
  })

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
