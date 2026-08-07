import type { ComponentProps } from 'react'

import { mergeClasses } from '@/utils/mergeClasses'

type CardProps = ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={mergeClasses(
        'bg-surface border-border-secondary shadow-card rounded-2xl border',
        className,
      )}
      {...props}
    />
  )
}
