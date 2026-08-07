import { BASE_API_URL, DELAY } from '@/mocks/constants'
import { setResponses } from '@/mocks/utils'
import { delay, http, HttpResponse } from 'msw'

import { CREATE_USER_RESPONSE } from './response'

type ResponseStatus = 'successCreated' | 'serverError'

const responseStatus: ResponseStatus = 'successCreated'

const response = setResponses(CREATE_USER_RESPONSE)[responseStatus]

export const createUser = http.post(`${BASE_API_URL}/users`, async () => {
  await delay(DELAY)

  return HttpResponse.json(response.data, {
    status: response.status,
  })
})
