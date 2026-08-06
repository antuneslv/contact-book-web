import { AuthLayout } from '@/templates/AuthLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout')({
  component: AuthLayout,
})
