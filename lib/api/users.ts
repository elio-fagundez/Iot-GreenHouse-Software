import type { User, UserCreatePayload, UserUpdatePayload } from "@/types/user"

const BASE_URL = "/api/users"

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const body = await response.json()
      if (body?.error) {
        message = body.error
      }
    } catch (error) {
      // ignore parse error
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  if (!text) {
    return undefined as T
  }

  try {
    return JSON.parse(text) as T
  } catch (error) {
    throw new Error("La respuesta del servidor no es JSON válido")
  }
}

export async function fetchUsers(params?: { search?: string; role?: string; status?: string }): Promise<User[]> {
  const searchParams = new URLSearchParams()
  if (params?.search) searchParams.set("search", params.search)
  if (params?.role) searchParams.set("role", params.role)
  if (params?.status) searchParams.set("status", params.status)

  const queryString = searchParams.toString()
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  })

  return handleResponse<User[]>(response)
}

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    cache: "no-store",
  })
  return handleResponse<User>(response)
}

export async function createUser(payload: UserCreatePayload): Promise<User> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return handleResponse<User>(response)
}

export async function updateUser(id: number, payload: UserUpdatePayload): Promise<User> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return handleResponse<User>(response)
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
  await handleResponse<void>(response)
}
