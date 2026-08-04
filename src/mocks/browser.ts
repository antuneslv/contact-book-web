import { setupWorker } from 'msw/browser'

import * as handlers from '.'

const worker = setupWorker(...Object.values(handlers))

export async function enableMocking() {
  if (import.meta.env.MODE !== 'mock') return

  return worker.start({ onUnhandledRequest: 'bypass' })
}
