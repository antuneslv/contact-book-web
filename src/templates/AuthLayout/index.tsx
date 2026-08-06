import { LogoIcon } from '@/assets/icons/LogoIcon'
import { Outlet } from '@tanstack/react-router'

export function AuthLayout() {
  return (
    <main className="mx-auto flex min-h-screen max-w-405">
      <aside className="bp-desktop:flex hidden w-1/2 flex-col items-center justify-center gap-8">
        <LogoIcon className="h-32 w-auto" />

        <h1 className="typ-display">Contact Book</h1>

        <p className="typ-body text-center">
          Organize seus contatos
          <br />
          de forma simples e prática.
        </p>
      </aside>

      <section className="min-w-0 flex-1">
        <Outlet />
      </section>
    </main>
  )
}
