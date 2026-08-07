import { SignUp } from '@/templates/SignUp'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout/cadastrar')({
  component: SignUp,
})
