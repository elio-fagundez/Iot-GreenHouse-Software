import type { Plan, PlanCreatePayload, PlanUpdatePayload } from "@/types/plan"

const BASE_URL = "/api/plans"

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const body = await response.json()
      if (body?.error) {
        message = body.error
      }
    } catch (error) {
      // ignore json parse error
    }
    throw new Error(message)
  }
  return response.json() as Promise<T>
}

export async function fetchPlans(): Promise<Plan[]> {
  const response = await fetch(BASE_URL, {
    method: "GET",
    cache: "no-store",
  })
  return handleResponse<Plan[]>(response)
}

export async function fetchPlan(id: number): Promise<Plan> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    cache: "no-store",
  })
  return handleResponse<Plan>(response)
}

export async function createPlan(payload: PlanCreatePayload): Promise<Plan> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return handleResponse<Plan>(response)
}

export async function updatePlan(id: number, payload: PlanUpdatePayload): Promise<Plan> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return handleResponse<Plan>(response)
}

export async function deletePlan(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok && response.status !== 204) {
    await handleResponse(response)
  }
}
