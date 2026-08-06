import { LogoIcon } from '@/assets/icons/LogoIcon'
import { Outlet } from '@tanstack/react-router'

export function AuthLayout() {
  return (
    <main className="mx-auto flex min-h-screen max-w-405">
      <aside className="bp-desktop:flex hidden flex-1 flex-col items-center justify-center gap-12">
        <LogoIcon className="h-32 w-auto" />

        <h1 className="typ-brand text-text-primary">Contact Book</h1>

        <p className="text-text-secondary font-regular text-center text-xl/10">
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
