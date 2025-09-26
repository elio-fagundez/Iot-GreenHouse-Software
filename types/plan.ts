export interface Plan {
  id: number
  name: string
  slug: string
  price: number
  period: string
  description: string
  features: string[]
  icon: string
  active: boolean
  subscribers: number
  revenue: number
  createdAt: string
  updatedAt: string
}

export interface PlanCreatePayload {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  icon?: string
  active?: boolean
  subscribers?: number
  revenue?: number
}

export interface PlanUpdatePayload {
  name?: string
  price?: number
  period?: string
  description?: string
  features?: string[]
  icon?: string
  active?: boolean
  subscribers?: number
  revenue?: number
}
