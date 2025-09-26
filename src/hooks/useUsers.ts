import { useCallback, useEffect, useMemo, useState } from "react"

import type { User, UserCreatePayload, UserUpdatePayload } from "@/types/user"
import { createUser, deleteUser, fetchUsers, updateUser } from "@/lib/api/users"

interface UseUsersState {
  users: User[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  create: (payload: UserCreatePayload) => Promise<User>
  update: (id: number, payload: UserUpdatePayload) => Promise<User>
  remove: (id: number) => Promise<void>
  setLocalUsers: (updater: (current: User[]) => User[]) => void
}

export function useUsers(): UseUsersState {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron obtener los usuarios")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

  const create = useCallback(async (payload: UserCreatePayload) => {
    const user = await createUser(payload)
    setUsers((prev) => [...prev, user])
    return user
  }, [])

  const update = useCallback(async (id: number, payload: UserUpdatePayload) => {
    const updated = await updateUser(id, payload)
    setUsers((prev) => prev.map((user) => (user.id === id ? updated : user)))
    return updated
  }, [])

  const remove = useCallback(async (id: number) => {
    await deleteUser(id)
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }, [])

  const setLocalUsers = useCallback((updater: (current: User[]) => User[]) => {
    setUsers((prev) => updater(prev))
  }, [])

  return useMemo(
    () => ({ users, loading, error, refresh: loadUsers, create, update, remove, setLocalUsers }),
    [users, loading, error, loadUsers, create, update, remove, setLocalUsers],
  )
}
