import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PasswordInput } from '.'

describe('PasswordInput component', () => {
  it('should render a password field by default', () => {
    render(<PasswordInput label="Senha" />)

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })

  it('should show the password when the toggle button is clicked', async () => {
    const user = userEvent.setup()

    render(<PasswordInput label="Senha" />)

    const input = screen.getByLabelText('Senha')
    const button = screen.getByRole('button', {
      name: 'Mostrar senha',
    })

    await user.click(button)

    expect(input).toHaveAttribute('type', 'text')
    expect(
      screen.getByRole('button', {
        name: 'Ocultar senha',
      }),
    ).toBeInTheDocument()
  })

  it('should hide the password when the toggle button is clicked twice', async () => {
    const user = userEvent.setup()

    render(<PasswordInput label="Senha" />)

    const input = screen.getByLabelText('Senha')
    const button = screen.getByRole('button', {
      name: 'Mostrar senha',
    })

    await user.click(button)
    await user.click(
      screen.getByRole('button', {
        name: 'Ocultar senha',
      }),
    )

    expect(input).toHaveAttribute('type', 'password')
    expect(
      screen.getByRole('button', {
        name: 'Mostrar senha',
      }),
    ).toBeInTheDocument()
  })

  it('should disable the toggle button when the input is disabled', () => {
    render(<PasswordInput label="Senha" disabled />)

    expect(
      screen.getByRole('button', {
        name: 'Mostrar senha',
      }),
    ).toBeDisabled()
  })
})
