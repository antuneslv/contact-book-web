import type { ReactNode } from 'react'

import { mergeClasses } from '@/utils/mergeClasses'
import { Toast as BaseToast } from '@base-ui/react/toast'
import { CircleCheckIcon, CircleXIcon, XIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'

type ToastType = 'SUCCESS' | 'ERROR'

export type ToastData = {
  type: ToastType
  auxiliaryDescription?: string
}

const toastVariants = tv({
  slots: {
    root: mergeClasses(
      'shadow-toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-2xl border will-change-transform outline-none select-none',
      '[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
      'h-(--height) transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]',
      "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
      'data-expanded:h-(--toast-height) data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
      'data-limited:opacity-0 data-starting-style:transform-[translateY(150%)]',
      '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]',
      'data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
      'data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
      'data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
      'data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
      'data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
      'data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
      'data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
      'data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
    ),

    icon: 'size-4',

    title: 'typ-body text-text-primary font-semibold',

    description: 'typ-body text-text-secondary',
  },

  variants: {
    intent: {
      success: {
        root: 'border-success bg-success-soft',
        icon: 'text-success',
        title: 'text-success',
      },

      error: {
        root: 'border-error bg-error-soft',
        icon: 'text-error',
        title: 'text-error',
      },
    },
  },
})

const TOAST_VARIANTS = {
  SUCCESS: {
    icon: CircleCheckIcon,
    intent: 'success',
  },
  ERROR: {
    icon: CircleXIcon,
    intent: 'error',
  },
} as const

function ToastList() {
  const { toasts } = BaseToast.useToastManager<ToastData>()

  return toasts.map(toast => {
    const variant = TOAST_VARIANTS[toast.data?.type ?? 'SUCCESS']
    const Icon = variant.icon

    const { root, icon, title, description } = toastVariants({
      intent: variant.intent,
    })

    return (
      <BaseToast.Root key={toast.id} toast={toast} className={root()}>
        <BaseToast.Content className="flex flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon className={icon()} />
              <BaseToast.Title className={title()} />
            </div>

            <BaseToast.Close
              aria-label="Fechar notificação"
              className='text-text-tertiary hover:text-text-primary relative shrink-0 cursor-pointer transition-colors after:absolute after:-inset-2 after:content-[""]'
            >
              <XIcon className="size-5" />
            </BaseToast.Close>
          </div>

          {(toast.description || toast.data?.auxiliaryDescription) && (
            <div className="min-w-0">
              {toast.description && (
                <BaseToast.Description className={description()} />
              )}

              {toast.data?.auxiliaryDescription && (
                <p className={description()}>
                  {toast.data.auxiliaryDescription}
                </p>
              )}
            </div>
          )}
        </BaseToast.Content>
      </BaseToast.Root>
    )
  })
}

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <BaseToast.Provider>
      {children}

      <BaseToast.Portal>
        <BaseToast.Viewport className="bp-desktop:right-6 bp-desktop:left-auto pointer-events-none fixed right-0 bottom-6 left-0 z-100 mx-auto flex w-82">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}
