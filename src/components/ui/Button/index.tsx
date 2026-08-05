import type { ComponentProps } from 'react'

import { mergeClasses } from '@/utils/mergeClasses'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'typ-label focus-visible:ring-primary inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md px-4 whitespace-nowrap transition-colors select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-default disabled:opacity-50',

  variants: {
    variant: {
      primary: 'bg-primary text-text-inverse enabled:hover:bg-primary-hover',
      secondary:
        'border-border bg-surface text-text enabled:hover:bg-background border',
      danger: 'bg-error text-text-inverse enabled:hover:bg-error-hover',
    },

    fullWidth: {
      true: 'h-11 w-full',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({
  variant,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={mergeClasses(
        buttonVariants({ variant, fullWidth }),
        className,
      )}
    />
  )
}
