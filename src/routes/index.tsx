import { Button } from '@/components/ui/Button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <div className="flex flex-col items-start gap-2">
        <Button>Default Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="primary" fullWidth>
          Primary Full
        </Button>
        <Button variant="secondary" fullWidth>
          Secondary Full
        </Button>
        <Button variant="danger" fullWidth>
          Danger Full
        </Button>
      </div>
    </div>
  )
}
