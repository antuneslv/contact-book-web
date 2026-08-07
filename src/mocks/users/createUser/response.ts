import type { CreateUserResponse } from '@/services/users/createUser'

export const CREATE_USER_RESPONSE: CreateUserResponse = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'John Doe',
  email: 'john.doe@example.com',
  createdAt: new Date(),
}
