import { useDevices } from '@tbot/hooks'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Dashboard from '../pages/dashboard'
require('@testing-library/jest-dom')
jest.mock('@tbot/hooks')

describe('dashboard.tsx', () => {
  let expected

  describe('when render successful', () => {
    beforeEach(() => {
      const queryClient = new QueryClient()
      expected = { data: { data: [{ name: 'Device 1' }] } }
      useDevices.mockImplementation(() => expected)
      render(
        <QueryClientProvider client={queryClient}>
          <Dashboard />
        </QueryClientProvider>,
      )
    })

    it('should load devices', async () => {
      expect(screen.getByText('My Devices')).toBeInTheDocument()
      expect(screen.getByText('Device 1')).toBeInTheDocument()
    })

    it.todo('should load observers')
    it.todo('should load show be able to select device')
  })

  describe('when render failed', () => {
    beforeEach(() => {
      const queryClient = new QueryClient()
      expected = { error: 'Error occured' }
      useDevices.mockImplementation(() => expected)
      render(
        <QueryClientProvider client={queryClient}>
          <Dashboard />
        </QueryClientProvider>,
      )
    })

    it('should show error message', async () => {
      expect(screen.getByText('My Devices')).toBeInTheDocument()
      expect(screen.getByText('Error occured')).toBeInTheDocument()
    })
    it.todo('should load show error message when unable to load devices')
    it.todo('should load show error message when unable to load observers')
  })

  it.todo('should load show be able to start device')
  it.todo('should load show be able to stop device')
  it.todo('should load show be able to select observer')
  it.todo('should load show be able to start observer')
  it.todo('should load show be able to stop observer')
  it.todo('should be able to logout')
  it.todo('should be able to open observer in browser')
})
