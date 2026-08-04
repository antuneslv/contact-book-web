import { BASE_API_URL, DELAY } from '@/mocks/constants'
import { delay, http, HttpResponse } from 'msw'

export const getTest = http.get(`${BASE_API_URL}/test`, async () => {
  await delay(DELAY)

  return HttpResponse.json({ test: 'ok' })
})
