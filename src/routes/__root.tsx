import { ToastProvider } from '@/components/ui/Toast'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({ component: RootComponent })

function RootComponent() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  )
}
