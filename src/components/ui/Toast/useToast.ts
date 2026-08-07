import { Toast } from '@base-ui/react/toast'

import type { ToastData } from '.'

type ShowToastProps = {
  title: string
  description?: string
  auxiliaryDescription?: string
  type: ToastData['type']
}

export function useToast() {
  const toastManager = Toast.useToastManager<ToastData>()

  function showToast({
    title,
    description,
    type,
    auxiliaryDescription,
  }: ShowToastProps) {
    toastManager.add({
      title,
      description,
      data: { type, auxiliaryDescription },
    })
  }

  return { showToast }
}
