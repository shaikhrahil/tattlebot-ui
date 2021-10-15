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
    expect(screen.getByText('Hi Rahil')).toBeDefined()
    expect(screen.getByTitle('No. of Observers')).toContainHTML('<p>10</p>')
    expect(screen.getByTitle('Number of devices')).toContainHTML('<p>4</p>')
    expect(screen.getByTitle('Rate of events')).toContainHTML('<p>3 / min</p>')
    expect(screen.getByTitle('No. of device online hours')).toContainHTML('<p>102 hours</p>')
    expect(screen.getByTitle('Last event reception')).toContainHTML('<p>20 min ago</p>')
  })

  it('shows loader', () => {
    useStats.mockImplementation(() => ({ connecting: true, listen: jest.fn() }))
    mockRender()
    expect(screen.getByText('Loading ...')).toBeDefined()
  })

  it('shows error message', () => {
    const error = 'Unable to load'
    useStats.mockImplementation(() => ({ error, listen: jest.fn() }))
    mockRender()
    expect(screen.getByText(error)).toBeDefined()
  })
})
