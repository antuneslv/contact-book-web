import type { AnyFieldApi } from '@tanstack/react-form'
import { describe, expect, it, vi } from 'vitest'

import { createBlurRevalidateValidator } from '.'

function createFieldApiMock(errors: unknown[] = []) {
  return {
    setErrorMap: vi.fn(),
    state: {
      meta: {
        errors,
      },
    },
  } as unknown as AnyFieldApi
}

describe('createBlurRevalidateValidator function', () => {
  it('should return validators for blur and change events', () => {
    const validators = createBlurRevalidateValidator(() => undefined)

    expect(validators).toHaveProperty('onBlur')
    expect(validators).toHaveProperty('onChange')
  })

  it('should clear validation errors when blur validation succeeds', () => {
    const fieldApi = createFieldApiMock()

    const validators = createBlurRevalidateValidator(() => undefined)

    const result = validators.onBlur({
      value: '',
      fieldApi,
    })

    expect(result).toBeUndefined()

    expect(fieldApi.setErrorMap).toHaveBeenCalledWith({
      onBlur: undefined,
      onChange: undefined,
    })
  })

  it('should not validate on change when there are no errors', () => {
    const validate = vi.fn()

    const validators = createBlurRevalidateValidator(validate)

    const fieldApi = createFieldApiMock()

    const result = validators.onChange({
      value: '',
      fieldApi,
    })

    expect(result).toBeUndefined()
    expect(validate).not.toHaveBeenCalled()
  })

  it('should validate on change when the field has errors', () => {
    const validate = vi.fn(() => [{ message: 'Required' }])

    const validators = createBlurRevalidateValidator(validate)

    const fieldApi = createFieldApiMock([{ message: 'Required' }])

    const result = validators.onChange({
      value: '',
      fieldApi,
    })

    expect(validate).toHaveBeenCalledOnce()
    expect(result).toEqual([{ message: 'Required' }])
  })

  it('should clear validation errors when change validation succeeds', () => {
    const validators = createBlurRevalidateValidator(() => undefined)

    const fieldApi = createFieldApiMock([{ message: 'Required' }])

    validators.onChange({
      value: '',
      fieldApi,
    })

    expect(fieldApi.setErrorMap).toHaveBeenCalledWith({
      onBlur: undefined,
      onChange: undefined,
    })
  })
})
