import { api } from '@/services/api'

export type CreateUserPayload = {
  name: string
  email: string
  password: string
}

export type CreateUserResponse = {
  id: string
  name: string
  email: string
  createdAt: Date
}

export async function createUser(body: CreateUserPayload) {
  const response = await api.post<CreateUserResponse>('/users', body)

  return response.data
}
