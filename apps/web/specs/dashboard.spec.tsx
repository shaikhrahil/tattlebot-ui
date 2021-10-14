import { useStats } from '@tbot/hooks'
import { render, screen } from '@testing-library/react'
import Dashboard from '../pages/dashboard'
import { CustomAppWrapper } from '../pages/_app'

jest.mock('@tbot/hooks', () => ({
  ...jest.requireActual('@tbot/hooks'),
  useStats: jest.fn(),
}))

describe('dashboard.tsx', () => {
  let mockRender
  beforeEach(() => {
    mockRender = () =>
      render(
        <CustomAppWrapper
          init={{
            firstName: 'Rahil',
            lastName: 'Shaikh',
            id: 123,
          }}
        >
          <Dashboard />
        </CustomAppWrapper>,
      )
  })

  it('shows welcome message and stats', () => {
    useStats.mockImplementation(() => ({
      connected: true,
      listen: jest.fn((callback) => {
        callback({
          observers: 10,
          devices: 4,
          rate: 3,
          bandwidth: 102,
          last: 20,
        })
      }),
    }))
    mockRender()
    screen.getByText('Hi Rahil')
    screen.getByText('10')
    screen.getByText('4')
    screen.getByText('3 / min')
    screen.getByText('102 hours')
    screen.getByText('20 min ago')
  })

  it('shows loader', () => {
    useStats.mockImplementation(() => ({ connecting: true, listen: jest.fn() }))
    mockRender()
    screen.getByText('Loading ...')
  })

  it('shows error message', () => {
    const error = 'Unable to load'
    useStats.mockImplementation(() => ({ error, listen: jest.fn() }))
    mockRender()
    screen.getByText(error)
  })
})
