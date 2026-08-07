import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ToastProvider } from '.'
import { useToast } from './useToast'

function TestComponent() {
  const { showToast } = useToast()

  return (
    <>
      <button
        type="button"
        onClick={() =>
          showToast({
            title: 'Cadastro realizado',
            description: 'Sua conta foi criada com sucesso.',
            type: 'SUCCESS',
          })
        }
      >
        Mostrar sucesso
      </button>

      <button
        type="button"
        onClick={() =>
          showToast({
            title: 'Erro ao cadastrar',
            description: 'Não foi possível criar sua conta.',
            auxiliaryDescription: 'Tente novamente em alguns instantes.',
            type: 'ERROR',
          })
        }
      >
        Mostrar erro
      </button>

      <button
        type="button"
        onClick={() =>
          showToast({
            title: 'Operação concluída',
            description: '',
            type: 'SUCCESS',
          })
        }
      >
        Mostrar sem descrição
      </button>
    </>
  )
}

function renderToast() {
  return render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>,
  )
}

describe('ToastProvider component', () => {
  it('should render its children', () => {
    render(
      <ToastProvider>
        <div>Application content</div>
      </ToastProvider>,
    )

    expect(screen.getByText('Application content')).toBeInTheDocument()
  })

  it('should render a success toast', async () => {
    const user = userEvent.setup()

    renderToast()

    await user.click(screen.getByRole('button', { name: 'Mostrar sucesso' }))

    await waitFor(() => {
      expect(screen.getByText('Cadastro realizado')).toBeInTheDocument()
    })

    expect(
      screen.getByText('Sua conta foi criada com sucesso.'),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Fechar notificação')).toBeInTheDocument()
  })

  it('should render an error toast with an auxiliary description', async () => {
    const user = userEvent.setup()

    renderToast()

    await user.click(screen.getByRole('button', { name: 'Mostrar erro' }))

    await waitFor(() => {
      expect(screen.getByText('Erro ao cadastrar')).toBeInTheDocument()
    })

    expect(
      screen.getByText('Não foi possível criar sua conta.'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Tente novamente em alguns instantes.'),
    ).toBeInTheDocument()
  })

  it('should render a toast without a description', async () => {
    const user = userEvent.setup()

    renderToast()

    await user.click(
      screen.getByRole('button', { name: 'Mostrar sem descrição' }),
    )

    await waitFor(() => {
      expect(screen.getByText('Operação concluída')).toBeInTheDocument()
    })
  })

  it('should render multiple toasts', async () => {
    const user = userEvent.setup()

    renderToast()

    await user.click(screen.getByRole('button', { name: 'Mostrar sucesso' }))

    await user.click(screen.getByRole('button', { name: 'Mostrar erro' }))

    await waitFor(() => {
      expect(screen.getByText('Cadastro realizado')).toBeInTheDocument()
      expect(screen.getByText('Erro ao cadastrar')).toBeInTheDocument()
    })

    expect(
      screen.getByText('Sua conta foi criada com sucesso.'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Tente novamente em alguns instantes.'),
    ).toBeInTheDocument()
  })
})
