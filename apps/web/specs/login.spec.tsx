import { useLogin } from '@tbot/hooks'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Login } from '../pages/login'
require('@testing-library/jest-dom')
const ACCESS_TOKEN = 'abcedfjnfvkjnvkdjf'
const REFRESH_TOKEN = 'abcedfjnfvkjnsdkcmskclsdcl'
const expectedCreds = { userName: 'rahil', password: 'is awesome' }

jest.mock('next/router')
jest.mock('@tbot/hooks')

describe('Login.tsx', () => {
  let expectedRouterPush

  beforeEach(() => {
    const expectedLoginExec = jest.fn().mockImplementation((creds) => {
      if (creds.userName !== expectedCreds.userName || creds.password !== expectedCreds.password) {
        return null
      }
      return {
        data: {
          access_token: ACCESS_TOKEN,
          refresh_token: REFRESH_TOKEN,
        },
      }
    })
    expectedRouterPush = jest.fn()
    useLogin.mockImplementation(() => ({ exec: expectedLoginExec }))
    useRouter.mockImplementation(() => ({ push: expectedRouterPush }))
    render(<Login />)
  })

  it('should login user', async () => {
    const loginForm = screen.getByTestId('login-form')
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: expectedCreds.userName } })
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: expectedCreds.password } })
      fireEvent.submit(loginForm)
    })
    expect(expectedRouterPush).toHaveBeenCalledWith('/dashboard')
  })

  it('should login error when wrong credentials entered', async () => {
    const loginForm = screen.getByTestId('login-form')
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrongUsername' } })
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'rightUsername' } })
      fireEvent.submit(loginForm)
    })
    expect(expectedRouterPush).toBeCalledTimes(0)
  })

  it('should show error message when all empty fields', async () => {
    const loginForm = screen.getByTestId('login-form')
    await act(async () => {
      fireEvent.submit(loginForm)
    })
    expect(screen.getByText(/password required/i)).toBeInTheDocument()
    expect(screen.getByText('Username Required')).toBeInTheDocument()
  })

  it('should show error message username empty', async () => {
    const loginForm = screen.getByTestId('login-form')
    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'lsdk' } })
      fireEvent.submit(loginForm)
    })
    expect(screen.getByText('Username Required')).toBeInTheDocument()
  })

  it('should show error message when password empty', async () => {
    const loginForm = screen.getByTestId('login-form')
    const usernameField = screen.getByPlaceholderText('Username')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'rahil.shaikh' } })
      fireEvent.submit(loginForm)
    })
    expect(screen.getByText('Password Required')).toBeDefined()
  })
})
