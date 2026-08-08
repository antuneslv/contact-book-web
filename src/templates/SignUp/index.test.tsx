import type { ReactNode } from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SignUp } from '.'

const { mockCreateUserMutate, mockUseCreateUser } = vi.hoisted(() => ({
  mockCreateUserMutate: vi.fn(),
  mockUseCreateUser: vi.fn(),
}))

vi.mock('@/services/users/createUser/useCreateUser', () => ({
  useCreateUser: mockUseCreateUser,
}))

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

function renderSignUp() {
  mockUseCreateUser.mockReturnValue({
    createUserMutate: mockCreateUserMutate,
    createUserIsPending: false,
  })

  return render(<SignUp />)
}

async function fillValidForm() {
  const user = userEvent.setup()

  await user.type(screen.getByLabelText('Nome completo'), 'John Doe')

  await user.type(screen.getByLabelText('Email'), 'john.doe@example.com')

  await user.type(screen.getByLabelText('Senha'), '123456')

  await user.type(screen.getByLabelText('Confirmar senha'), '123456')

  return user
}

describe('SignUp component', () => {
  it('should render the form', () => {
    renderSignUp()

    expect(
      screen.getByRole('heading', { name: 'Crie sua conta' }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Preencha os dados para se cadastrar'),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmar senha')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Cadastrar' }),
    ).toBeInTheDocument()
  })

  it('should disable submit button when the form is invalid', async () => {
    const user = userEvent.setup()

    renderSignUp()

    const submitButton = screen.getByRole('button', { name: 'Cadastrar' })

    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
  })

  it('should show an error when name is invalid', async () => {
    const user = userEvent.setup()

    renderSignUp()

    const nameInput = screen.getByLabelText('Nome completo')

    await user.click(nameInput)
    await user.tab()

    expect(screen.getByText('O nome é obrigatório.')).toBeInTheDocument()

    await user.click(nameInput)
    await user.type(nameInput, 'John')
    await user.tab()

    expect(screen.getByText('Informe seu nome completo.')).toBeInTheDocument()
  })

  it('should show an error when email is invalid', async () => {
    const user = userEvent.setup()

    renderSignUp()

    const emailInput = screen.getByLabelText('Email')

    await user.click(emailInput)
    await user.tab()

    expect(screen.getByText('O e-mail é obrigatório.')).toBeInTheDocument()

    await user.click(emailInput)
    await user.type(emailInput, 'invalid-email')
    await user.tab()

    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()
  })

  it('should show an error when password is invalid', async () => {
    const user = userEvent.setup()

    renderSignUp()

    const passwordInput = screen.getByLabelText('Senha')

    await user.click(passwordInput)
    await user.tab()

    expect(screen.getByText('A senha é obrigatória.')).toBeInTheDocument()

    await user.click(passwordInput)
    await user.type(passwordInput, '123')
    await user.tab()

    expect(
      screen.getByText('A senha deve ter pelo menos 6 caracteres.'),
    ).toBeInTheDocument()
  })

  it('should show an error when passwords do not match', async () => {
    const user = userEvent.setup()

    renderSignUp()

    await user.type(screen.getByLabelText('Senha'), '123456')

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha')

    await user.type(confirmPasswordInput, '654321')
    await user.tab()

    expect(screen.getByText('As senhas não coincidem.')).toBeInTheDocument()
  })

  it('should revalidate the field while correcting an invalid value', async () => {
    const user = userEvent.setup()

    renderSignUp()

    const emailInput = screen.getByLabelText('Email')

    await user.type(emailInput, 'invalid-email')
    await user.tab()

    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()

    await user.clear(emailInput)
    await user.type(emailInput, 'valid@example.com')

    await waitFor(() => {
      expect(
        screen.queryByText('Informe um e-mail válido.'),
      ).not.toBeInTheDocument()
    })
  })

  it('should enable submit button when the form is valid', async () => {
    renderSignUp()

    await fillValidForm()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeEnabled()
    })
  })

  it('should submit the form with the correct values', async () => {
    renderSignUp()

    const user = await fillValidForm()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeEnabled()
    })

    await user.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(mockCreateUserMutate).toHaveBeenCalledOnce()
    expect(mockCreateUserMutate).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      confirmPassword: '123456',
    })
  })

  it('should show a loading indicator while creating the account', () => {
    mockUseCreateUser.mockReturnValue({
      createUserMutate: mockCreateUserMutate,
      createUserIsPending: true,
    })

    render(<SignUp />)

    expect(
      screen.queryByRole('button', { name: 'Cadastrar' }),
    ).not.toBeInTheDocument()

    expect(screen.getByRole('button', { busy: true })).toBeInTheDocument()
  })

  it('should disable all inputs while creating the account', () => {
    mockUseCreateUser.mockReturnValue({
      createUserMutate: mockCreateUserMutate,
      createUserIsPending: true,
    })

    render(<SignUp />)

    expect(screen.getByLabelText('Nome completo')).toBeDisabled()
    expect(screen.getByLabelText('Email')).toBeDisabled()
    expect(screen.getByLabelText('Senha')).toBeDisabled()
    expect(screen.getByLabelText('Confirmar senha')).toBeDisabled()
  })

  it('should render the link to the sign-in page', () => {
    renderSignUp()

    const link = screen.getByRole('link', {
      name: 'Faça login',
    })

    expect(link).toHaveAttribute('href', '/entrar')
  })
})
