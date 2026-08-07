import { useToast } from '@/components/ui/Toast/useToast'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { createUser } from '.'

export function useCreateUser() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const { mutate: createUserMutate, isPending: createUserIsPending } =
    useMutation({
      mutationFn: createUser,

      onSuccess: () => {
        navigate({ to: '/entrar' })
      },
      onError: () => {
        showToast({
          title: 'Erro ao criar a conta',
          description: 'Não foi possível concluir o cadastro.',
          auxiliaryDescription: 'Tente novamente em alguns instantes.',
          type: 'ERROR',
        })
      },
    })

  return {
    createUserMutate,
    createUserIsPending,
  }
}
