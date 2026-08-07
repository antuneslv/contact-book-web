import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout/entrar')({
  component: SignIn,
})

function SignIn() {
  return <p>Sign In</p>
}
