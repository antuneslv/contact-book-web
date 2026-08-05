import { useId, type ComponentProps, type ReactNode } from 'react'

import { mergeClasses } from '@/utils/mergeClasses'
import { tv } from 'tailwind-variants'

const inputVariants = tv({
  slots: {
    root: 'flex flex-col gap-1.5',

    label: 'typ-label text-text',

    input:
      'border-border bg-surface typ-body text-text placeholder:text-text-tertiary focus:border-primary focus:ring-primary/20 disabled:bg-background disabled:text-text-disabled disabled:placeholder:text-text-disabled h-10 w-full rounded-md border px-3 transition-colors focus:ring-2 focus:outline-none disabled:cursor-default',

    helperText: 'typ-caption text-text-secondary',

    errorText: 'typ-caption text-error',
  },

  variants: {
    invalid: {
      true: {
        label: 'text-error',

        input: 'border-error focus:border-error focus:ring-error/20',
      },
    },

    hasLeftIcon: {
      true: {
        input: 'pl-10',
      },
    },

    hasRightIcon: {
      true: {
        input: 'pr-10',
      },
    },

    disabled: {
      true: {
        label: 'text-text-disabled',
        helperText: 'text-text-disabled',
      },
    },
  },
})

type InputProps = ComponentProps<'input'> & {
  label?: string
  helperText?: string
  errorText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Input({
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  disabled,
  className,
  id,
  ...props
}: InputProps) {
  const {
    root,
    label: labelStyle,
    input,
    helperText: helperStyle,
    errorText: errorStyle,
  } = inputVariants({
    invalid: !!errorText,
    hasLeftIcon: !!leftIcon,
    hasRightIcon: !!rightIcon,
    disabled: !!disabled,
  })
  const uniqueId = useId()
  const inputId = id ?? uniqueId

  return (
    <div className={root()}>
      {label && (
        <label htmlFor={inputId} className={labelStyle()}>
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="text-text-tertiary absolute top-1/2 left-3 -translate-y-1/2">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={mergeClasses(input(), className)}
          {...props}
        />

        {rightIcon && (
          <span className="text-text-tertiary absolute top-1/2 right-3 -translate-y-1/2">
            {rightIcon}
          </span>
        )}
      </div>

      <div className="flex h-4">
        {errorText ? (
          <span className={errorStyle()}>{errorText}</span>
        ) : (
          helperText && <span className={helperStyle()}>{helperText}</span>
        )}
      </div>
    </div>
  )
}
