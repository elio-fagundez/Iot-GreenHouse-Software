export interface User {
  id: number
  firstName: string
  lastName: string
  name: string
  email: string
  role: string
  plan: string
  status: string
  devices: number
  lastLogin: string | null
  createdAt: string
  updatedAt: string
  avatar: string | null
}

export interface UserCreatePayload {
  firstName: string
  lastName: string
  email: string
  password?: string
  role?: string
  plan?: string
  status?: string
  devices?: number
  lastLogin?: string | null
  avatar?: string | null
}

export interface UserUpdatePayload {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  role?: string
  plan?: string
  status?: string
  devices?: number
  lastLogin?: string | null
  avatar?: string | null
}
