import { useDevices } from '@tbot/hooks'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import Controls from '../pages/controls'
jest.mock('@tbot/hooks')
const mockUseDevices = useDevices as jest.Mock

describe('controls.tsx', () => {
  let expectedDevices, expectedObservers

  describe('when render successful', () => {
    beforeEach(() => {
      const queryClient = new QueryClient()
      expectedObservers = [{ name: 'observer #1' }]
      expectedDevices = { data: { data: [{ name: 'Device 1', observers: expectedObservers }] } }
      mockUseDevices.mockImplementation(() => expectedDevices)
      render(
        <QueryClientProvider client={queryClient}>
          <Controls />
        </QueryClientProvider>,
      )
    })

    it('should load devices', () => {
      expect(screen.getByText('My Devices')).toBeInTheDocument()
      expect(screen.getByText('Device 1')).toBeInTheDocument()
      expect(screen.getByText('1 observer(s)')).toBeInTheDocument()
    })

    it('should be able to select device', async () => {
      await act(async () => {
        userEvent.click(screen.getByText('Device 1'))
      })
      expect(screen.getByText('observer #1')).toBeInTheDocument()
    })
  })

  describe('when render failed', () => {
    beforeEach(() => {
      const queryClient = new QueryClient()
      expectedDevices = { error: 'Error occured' }
      mockUseDevices.mockImplementation(() => expectedDevices)
      render(
        <QueryClientProvider client={queryClient}>
          <Controls />
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
