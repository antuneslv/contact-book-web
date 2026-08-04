import { render, screen } from '@testing-library/react'

import { Button } from '.'

describe('Button component', () => {
  it('should render properly', () => {
    render(<Button variant="primary">Click Me</Button>)

    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
  })

  it('should render as primary variant', () => {
    render(<Button variant="primary">Primary</Button>)

    expect(screen.getByRole('button')).toHaveClass(
      'bg-primary',
      'text-text-inverse',
    )
  })

  it('should render as secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)

    expect(screen.getByRole('button')).toHaveClass(
      'border',
      'border-border',
      'bg-surface',
      'text-text',
    )
  })

  it('should render as danger variant', () => {
    render(<Button variant="danger">Danger</Button>)

    expect(screen.getByRole('button')).toHaveClass(
      'bg-error',
      'text-text-inverse',
    )
  })

  it('should render full width', () => {
    render(
      <Button variant="primary" fullWidth>
        Full Width
      </Button>,
    )

    expect(screen.getByRole('button')).toHaveClass('w-full', 'h-11')
  })

  it('should merge custom className', () => {
    render(
      <Button variant="primary" className="custom-class">
        Custom
      </Button>,
    )

    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('should render disabled', () => {
    render(
      <Button variant="primary" disabled>
        Disabled
      </Button>,
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should use button as default type', () => {
    render(<Button variant="primary">Default</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('should allow overriding button type', () => {
    render(
      <Button variant="primary" type="submit">
        Submit
      </Button>,
    )

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
