import type { AnyFieldApi, StandardSchemaV1Issue } from '@tanstack/react-form'

type BlurRevalidateContext = {
  value: string
  fieldApi: AnyFieldApi
}

type BlurRevalidateResult = StandardSchemaV1Issue[] | undefined

function clearErrors(fieldApi: AnyFieldApi) {
  fieldApi.setErrorMap({
    onBlur: undefined,
    onChange: undefined,
  })
}

/**
 * Creates field validators that validate on blur and automatically
 * revalidate on subsequent changes while the field is invalid.
 *
 * Once the value becomes valid, any validation errors are cleared and
 * validation on change stops until the field loses focus again.
 *
 * This provides a common UX pattern where validation errors are shown
 * only after the user leaves the field, but update immediately while
 * the user is correcting the value.
 *
 * @param validate Validation function responsible for returning the field errors.
 * @returns TanStack Form validators for the `onBlur` and `onChange` events.
 *
 * @example
 * ```ts
 * validators={createBlurRevalidateValidator(({ fieldApi }) =>
 *   fieldApi.parseValueWithSchema(fieldsSchema.email),
 * )}
 * ```
 */
export function createBlurRevalidateValidator(
  validate: ({
    value,
    fieldApi,
  }: BlurRevalidateContext) => BlurRevalidateResult,
) {
  return {
    onBlur: ({ value, fieldApi }: BlurRevalidateContext) => {
      const error = validate({ value, fieldApi })

      if (!error) clearErrors(fieldApi)

      return error
    },

    onChange: ({ value, fieldApi }: BlurRevalidateContext) => {
      if (!fieldApi.state.meta.errors.length) return undefined

      const error = validate({ value, fieldApi })

      if (!error) clearErrors(fieldApi)

      return error
    },
  }
}
