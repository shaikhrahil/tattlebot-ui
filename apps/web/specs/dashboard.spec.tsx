import { render, screen } from '@testing-library/react'
import Dashboard from '../pages/dashboard'
import { CustomAppWrapper } from '../pages/_app'

describe('dashboard.tsx', () => {
  describe('starts a successful websocket conection', () => {
    beforeEach(() => {
      jest.mock('@tbot/hooks', () => ({
        ...jest.requireActual('@tbot/hooks'),
        useStats: () => ({
          send: jest.fn(),
          connected: true,
          error: '',
          listen: jest.fn(() => ({
            observers: 10,
            devices: 4,
            rate: 3,
            bandwidth: 102,
            last: 20,
          })),
        }),
      }))
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
      // const u = renderHook(() => useContext(UserContext), { wrapper: CustomAppWrapper })
      screen.getByText('Hi Rahil')
    })
    it.todo('shows stats charts')
    it.todo('updates stats')
    it.todo('shows empty message when no data')
  })

  describe('failed websocket connection', () => {
    it.todo('shows error message')
  })
})
