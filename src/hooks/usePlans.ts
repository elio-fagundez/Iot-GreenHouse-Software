import { useCallback, useEffect, useMemo, useState } from "react"

import type { Plan, PlanCreatePayload, PlanUpdatePayload } from "@/types/plan"
import { createPlan, deletePlan, fetchPlans, updatePlan } from "@/lib/api/plans"

interface UsePlansState {
  plans: Plan[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  create: (payload: PlanCreatePayload) => Promise<Plan>
  update: (id: number, payload: PlanUpdatePayload) => Promise<Plan>
  remove: (id: number) => Promise<void>
  setLocalPlans: (updater: (current: Plan[]) => Plan[]) => void
}

export function usePlans(): UsePlansState {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadPlans = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPlans()
      setPlans(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch plans")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPlans()
  }, [loadPlans])

  const create = useCallback(async (payload: PlanCreatePayload) => {
    const plan = await createPlan(payload)
    setPlans((prev) => [...prev, plan])
    return plan
  }, [])

  const update = useCallback(async (id: number, payload: PlanUpdatePayload) => {
    const updated = await updatePlan(id, payload)
    setPlans((prev) => prev.map((plan) => (plan.id === id ? updated : plan)))
    return updated
  }, [])

  const remove = useCallback(async (id: number) => {
    await deletePlan(id)
    setPlans((prev) => prev.filter((plan) => plan.id !== id))
  }, [])

  const setLocalPlans = useCallback((updater: (current: Plan[]) => Plan[]) => {
    setPlans((prev) => updater(prev))
  }, [])

  return useMemo(
    () => ({
      plans,
      loading,
      error,
      refresh: loadPlans,
      create,
      update,
      remove,
      setLocalPlans,
    }),
    [plans, loading, error, loadPlans, create, update, remove, setLocalPlans],
  )
}
