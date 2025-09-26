"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle } from "lucide-react"

import { useUsers } from "@/hooks/useUsers"
import type { User } from "@/types/user"

const safeNumber = (value: number | string | null | undefined): number => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const roleColors = {
  admin: "border-red-200 bg-red-100 text-red-700 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-200",
  moderator:
    "border-yellow-200 bg-yellow-100 text-yellow-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
  user: "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-200",
}

const statusColors = {
  active: "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
  inactive: "border-border bg-muted text-muted-foreground",
  suspended: "border-red-200 bg-red-100 text-red-700 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-200",
}

type UserFormValues = {
  name: string
  email: string
  role: string
  plan: string
  status: string
  password?: string
}

const splitFullName = (fullName: string) => {
  const trimmed = fullName.trim()
  if (!trimmed) {
    throw new Error("El nombre completo es obligatorio")
  }
  const parts = trimmed.split(/\s+/)
  const firstName = parts.shift() ?? trimmed
  const lastName = parts.length ? parts.join(" ") : firstName
  return { firstName, lastName }
}

export function AdminUserManager() {
  const { users, loading, error, create, update, remove, refresh, setLocalUsers } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isSavingCreate, setIsSavingCreate] = useState(false)
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const { totalCount, activeCount, devicesTotal, adminCount, activePercentage, averageDevices } = useMemo(() => {
    const totalCount = users.length
    const activeCount = users.filter((user) => user.status === "active").length
    const devicesTotal = users.reduce((sum, user) => sum + safeNumber(user.devices), 0)
    const adminCount = users.filter((user) => user.role === "admin").length
    const activePercentage = totalCount ? Math.round((activeCount / totalCount) * 100) : 0
    const averageDevices = totalCount ? Math.round(devicesTotal / totalCount) : 0
    return { totalCount, activeCount, devicesTotal, adminCount, activePercentage, averageDevices }
  }, [users])

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return users.filter((user) => {
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "Sin registro"
    }
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) {
      return "Fecha inválida"
    }
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleCreateUser = async (values: UserFormValues) => {
    setIsSavingCreate(true)
    setActionError(null)
    try {
      const { firstName, lastName } = splitFullName(values.name)
      await create({
        firstName,
        lastName,
        email: values.email,
        role: values.role,
        plan: values.plan,
        status: values.status,
      })
      await refresh()
      setSearchTerm("")
      setIsCreateDialogOpen(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo crear el usuario"
      setActionError(message)
      throw err instanceof Error ? err : new Error(message)
    } finally {
      setIsSavingCreate(false)
    }
  }

  const handleEditUser = async (values: UserFormValues) => {
    if (!selectedUser) return
    setIsSavingEdit(true)
    setActionError(null)
    try {
      const { firstName, lastName } = splitFullName(values.name)
      await update(selectedUser.id, {
        firstName,
        lastName,
        email: values.email,
        role: values.role,
        plan: values.plan,
        status: values.status,
      })
      setIsEditDialogOpen(false)
      setSelectedUser(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo actualizar el usuario"
      setActionError(message)
      throw err instanceof Error ? err : new Error(message)
    } finally {
      setIsSavingEdit(false)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    setActionError(null)
    try {
      await remove(userId)
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo eliminar el usuario"
      setActionError(message)
    }
  }

  const handleToggleStatus = async (user: User) => {
    setActionError(null)
    const nextStatus = user.status === "active" ? "inactive" : "active"
    setLocalUsers((current) => current.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u)))
    try {
      await update(user.id, { status: nextStatus })
    } catch (err) {
      setLocalUsers((current) => current.map((u) => (u.id === user.id ? { ...u, status: user.status } : u)))
      const message = err instanceof Error ? err.message : "No se pudo actualizar el estado del usuario"
      setActionError(message)
    }
  }

  return (
    <div className="min-h-screen text-foreground">
      <div className="mx-auto  px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">Administra los usuarios registrados en tu plataforma IoT</p>
        </div>

        {(error || actionError) && (
          <div className="mb-8 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{error || actionError}</p>
                {error && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void refresh()}
                    className="mt-3 border-destructive/40 text-destructive hover:bg-destructive/10"
                  >
                    Reintentar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalCount}</div>
              <p className="mt-1 text-xs text-muted-foreground">+5 nuevos esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeCount}</div>
              <p className="mt-1 text-xs text-muted-foreground">{activePercentage}% del total</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dispositivos Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{devicesTotal}</div>
              <p className="mt-1 text-xs text-muted-foreground">Promedio: {averageDevices} por usuario</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Administradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{adminCount}</div>
              <p className="mt-1 text-xs text-muted-foreground">Con permisos completos</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderador</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="suspended">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <span className="text-lg">➕</span>
                Crear Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-background text-foreground">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Registra un nuevo usuario en la plataforma
                </DialogDescription>
              </DialogHeader>
                <UserForm
                  onSubmit={handleCreateUser}
                  onCancel={() => setIsCreateDialogOpen(false)}
                  isSubmitting={isSavingCreate}
                />
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Usuarios Registrados</CardTitle>
            <CardDescription className="text-muted-foreground">
              Gestiona todos los usuarios de tu plataforma IoT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Usuario</TableHead>
                  <TableHead className="text-muted-foreground">Rol</TableHead>
                  <TableHead className="text-muted-foreground">Plan</TableHead>
                  <TableHead className="text-muted-foreground">Dispositivos</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                  <TableHead className="text-muted-foreground">Último Acceso</TableHead>
                  <TableHead className="text-right text-muted-foreground">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                      Cargando usuarios...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                      No se encontraron usuarios.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-border hover:bg-muted/40">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          roleColors[user.role as keyof typeof roleColors] ??
                          "border-border bg-muted text-muted-foreground"
                        }
                      >
                        {user.role === "admin" ? "Admin" : user.role === "moderator" ? "Moderador" : "Usuario"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{user.plan}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{safeNumber(user.devices)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.status === "active"}
                          onCheckedChange={() => void handleToggleStatus(user)}
                          className="data-[state=checked]:bg-green-600"
                        />
                        <Badge
                          variant="secondary"
                          className={
                            statusColors[user.status as keyof typeof statusColors] ??
                            "border-border bg-muted text-muted-foreground"
                          }
                        >
                          {user.status === "active" ? "Activo" : user.status === "inactive" ? "Inactivo" : "Suspendido"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">{formatDate(user.lastLogin)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsEditDialogOpen(true)
                          }}
                          className="text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => void handleDeleteUser(user.id)}
                          className="text-muted-foreground hover:bg-muted/60 hover:text-destructive"
                        >
                          🗑️
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl bg-background text-foreground">
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Modifica la información del usuario seleccionado
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <UserForm
                initialData={selectedUser}
                onSubmit={handleEditUser}
                onCancel={() => {
                  setIsEditDialogOpen(false)
                  setSelectedUser(null)
                }}
                isSubmitting={isSavingEdit}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AdminUserManager

interface UserFormProps {
  initialData?: User | null
  onSubmit: (data: UserFormValues) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

function UserForm({ initialData, onSubmit, onCancel, isSubmitting = false }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormValues>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "user",
    plan: initialData?.plan || "Básico",
    status: initialData?.status || "active",
  })
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      email: initialData?.email || "",
      role: initialData?.role || "user",
      plan: initialData?.plan || "Básico",
      status: initialData?.status || "active",
    })
    setSubmitError(null)
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const trimmedName = formData.name.trim()
    if (!trimmedName) {
      setSubmitError("El nombre completo es obligatorio.")
      return
    }

    const trimmedEmail = formData.email.trim()
    if (!trimmedEmail) {
      setSubmitError("El email es obligatorio.")
      return
    }

    try {
      await onSubmit({ ...formData, name: trimmedName, email: trimmedEmail })
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo guardar el usuario"
      setSubmitError(message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Nombre Completo
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role" className="text-foreground">
            Rol
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Usuario</SelectItem>
              <SelectItem value="moderator">Moderador</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="plan" className="text-foreground">
            Plan
          </Label>
          <Select
            value={formData.plan}
            onValueChange={(value) => setFormData({ ...formData, plan: value })}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Básico">Básico</SelectItem>
              <SelectItem value="Profesional">Profesional</SelectItem>
              <SelectItem value="Equipo">Equipo</SelectItem>
              <SelectItem value="Empresarial">Empresarial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-foreground">
            Estado
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="suspended">Suspendido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="bg-border" />

      {submitError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {submitError}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-border hover:bg-muted"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (initialData ? "Actualizando..." : "Creando...") : initialData ? "Actualizar Usuario" : "Crear Usuario"}
        </Button>
      </div>
    </form>
  )
}
