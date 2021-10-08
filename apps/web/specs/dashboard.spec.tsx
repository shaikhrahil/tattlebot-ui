import { render, screen } from '@testing-library/react'
import Dashboard from '../pages/dashboard'
// import { useDevices } from '@tbot/hooks'

describe('dashboard.tsx', () => {
  let expectedDeviceLoad, expectedDeviceObserver
  beforeEach(() => {
    render(<Dashboard />)
    expectedDeviceLoad = { data: [{ name: 'Device 1' }], error: false, loading: false, retrying: false }
    jest.resetModules()
  })
  it('should load devices', async () => {
    expect(screen.findByText('Loading ...')).toBeInTheDocument()
    jest.doMock('@tbot/hooks', () => ({
      useDevices: jest.fn().mockResolvedValue(expectedDeviceLoad),
    }))
    expect(expectedDeviceLoad).toHaveBeenCalledTimes(1)
    expect(screen.getByText('My Devices')).toBeInTheDocument()
    expect(await screen.findByText('Device 1')).toBeInTheDocument()
  })
  it.todo('should load observers')
  it.todo('should load show error message when unable to load devices')
  it.todo('should load show error message when unable to load observers')
  it.todo('should load show be able to select device')
  it.todo('should load show be able to start device')
  it.todo('should load show be able to stop device')
  it.todo('should load show be able to select observer')
  it.todo('should load show be able to start observer')
  it.todo('should load show be able to stop observer')
  it.todo('should be able to logout')
  it.todo('should be open observer in browser')
})
