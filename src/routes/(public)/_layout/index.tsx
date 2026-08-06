import { LogoIcon } from '@/assets/icons/LogoIcon'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout/')({
  component: Index,
})

function Index() {
  return (
    <div className="bg-background p-2">
      <h3>Welcome Home!</h3>

      <div className="flex gap-4">
        <LogoIcon />

        <LogoIcon className="h-32 w-auto" />
      </div>

      <div className="bg-surface flex flex-col gap-2 p-4">
        <Input label="Nome" placeholder="Digite o nome" />

        <Input label="Pesquisar" placeholder="Buscar contatos..." />

        <Input id="password" label="Senha" type="password" />

        <Input label="Nome" errorText="Nome é obrigatório" />

        <Input
          label="Observações"
          placeholder="Deixe aqui as suas obervações"
          helperText="Máximo de 100 caracteres"
        />

        <Input
          label="Observações"
          placeholder="Deixe aqui as suas obervações"
          helperText="Máximo de 100 caracteres"
          disabled
        />
      </div>
      <div className="mt-4">
        <Button>Enviar</Button>
      </div>
    </div>
  )
}
