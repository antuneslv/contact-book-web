import { render, screen } from '@testing-library/react'

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-router')>(
    '@tanstack/react-router',
  )

  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
  }
})

import { AuthLayout } from '.'

describe('AuthLayout component', () => {
  it('should render properly', () => {
    render(<AuthLayout />)

    expect(screen.getByText('Contact Book')).toBeInTheDocument()
  })

  it('should render Outlet', () => {
    render(<AuthLayout />)

    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })
})
