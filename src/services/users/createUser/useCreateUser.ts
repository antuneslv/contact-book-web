import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { createUser } from '.'

export function useCreateUser() {
  const navigate = useNavigate()

  const { mutate: createUserMutate, isPending: createUserIsPending } =
    useMutation({
      mutationFn: createUser,

      onSuccess: () => {
        navigate({ to: '/sign-in' })
      },
    })

  return {
    createUserMutate,
    createUserIsPending,
  }
}
