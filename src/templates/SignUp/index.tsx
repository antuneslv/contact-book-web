import { Card } from '@/components/Card'
import { PasswordInput } from '@/components/PasswordInput'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCreateUser } from '@/services/users/createUser/useCreateUser'
import { createBlurRevalidateValidator } from '@/utils/createBlurRevalidateValidator'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome é obrigatório.')
    .refine(
      value => value.split(/\s+/).length >= 2,
      'Informe seu nome completo.',
    ),
  email: z
    .email('Informe um e-mail válido.')
    .trim()
    .min(1, 'O e-mail é obrigatório.'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  confirmPassword: z.string().min(1, 'Confirme sua senha.'),
})

const fieldsSchema = formSchema.shape

export function SignUp() {
  const { createUserMutate, createUserIsPending } = useCreateUser()

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      createUserMutate(value)
    },
  })

  return (
    <Card className="bp-desktop:px-8 flex min-h-160 flex-col gap-8 rounded-4xl px-5 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="typ-heading text-text-primary">Crie sua conta</h1>
        <p className="typ-body text-text-secondary">
          Preencha os dados para se cadastrar
        </p>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex flex-col gap-2"
      >
        <Field
          name="name"
          validators={createBlurRevalidateValidator(({ fieldApi }) =>
            fieldApi.parseValueWithSchema(fieldsSchema.name),
          )}
        >
          {field => (
            <Input
              id={field.name}
              name={field.name}
              label="Nome completo"
              placeholder="Digite seu nome completo"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              errorText={field.state.meta.errors[0]?.message}
            />
          )}
        </Field>

        <Field
          name="email"
          validators={createBlurRevalidateValidator(({ fieldApi }) =>
            fieldApi.parseValueWithSchema(fieldsSchema.email),
          )}
        >
          {field => (
            <Input
              id={field.name}
              name={field.name}
              label="Email"
              placeholder="Digite seu email"
              type="email"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              errorText={field.state.meta.errors[0]?.message}
            />
          )}
        </Field>

        <div className="bp-desktop:gap-4 bp-desktop:flex-row flex flex-col justify-between gap-2">
          <Field
            name="password"
            validators={createBlurRevalidateValidator(({ fieldApi }) =>
              fieldApi.parseValueWithSchema(fieldsSchema.password),
            )}
          >
            {field => (
              <PasswordInput
                id={field.name}
                name={field.name}
                label="Senha"
                placeholder="Digite sua senha"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errorText={field.state.meta.errors[0]?.message}
              />
            )}
          </Field>

          <Field
            name="confirmPassword"
            validators={createBlurRevalidateValidator(({ value, fieldApi }) => {
              const validationError = fieldApi.parseValueWithSchema(
                fieldsSchema.confirmPassword,
              )

              if (validationError) return validationError

              const password = fieldApi.form.getFieldValue('password')

              if (value !== password) {
                return [{ message: 'As senhas não coincidem.' }]
              }

              return undefined
            })}
          >
            {field => (
              <PasswordInput
                id={field.name}
                name={field.name}
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errorText={field.state.meta.errors[0]?.message}
              />
            )}
          </Field>
        </div>

        <Subscribe selector={state => state.canSubmit}>
          {canSubmit => (
            <Button
              fullWidth
              type="submit"
              disabled={!canSubmit}
              className="mt-8"
            >
              {createUserIsPending ? (
                <LoaderCircle className="size-6 animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          )}
        </Subscribe>
      </form>

      <p className="typ-body text-text-secondary text-center">
        Já tem uma conta?{' '}
        <Link to="/entrar" className="typ-link">
          Faça login
        </Link>
        .
      </p>
    </Card>
  )
}
