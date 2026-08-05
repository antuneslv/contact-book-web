import { render, screen } from '@testing-library/react'

import { Input } from '.'

describe('Input component', () => {
  it('should render the label and associate it with the input', () => {
    render(<Input label="Name" />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('should render the helper text when no error is provided', () => {
    render(<Input helperText="Enter your full name" />)

    expect(screen.getByText('Enter your full name')).toBeInTheDocument()
  })

  it('should render the error text instead of the helper text', () => {
    render(
      <Input
        helperText="Enter your full name"
        errorText="This field is required"
      />,
    )

    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.queryByText('Enter your full name')).not.toBeInTheDocument()
  })

  it('should render a disabled input', () => {
    render(<Input disabled />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('should use the provided id', () => {
    render(<Input id="email" label="Email" />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email')
  })

  it('should generate an id when none is provided', () => {
    render(<Input label="Username" />)

    const input = screen.getByLabelText('Username')

    expect(input).toHaveAttribute('id')
    expect(input.getAttribute('id')).not.toBe('')
  })

  it('should merge custom className', () => {
    render(<Input className="custom-class" />)

    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('should render the left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">L</span>} />)

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('should render the right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">R</span>} />)

    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('should apply error styles when errorText is provided', () => {
    render(<Input errorText="Invalid value" />)

    expect(screen.getByRole('textbox')).toHaveClass('border-error')
  })

  it('should apply disabled styles to the label and helper text', () => {
    render(<Input disabled label="Name" helperText="Enter your full name" />)

    expect(screen.getByText('Name')).toHaveClass('text-text-disabled')
    expect(screen.getByText('Enter your full name')).toHaveClass(
      'text-text-disabled',
    )
  })
})
