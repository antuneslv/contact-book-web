import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout/sign-in')({
  component: SignIn,
})

function SignIn() {
  return <p>Sign In</p>
}
