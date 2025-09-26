"use client"

import type React from "react"
import { useState } from "react"
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

// Mock data - en una app real vendría de una API/base de datos
const initialUsers = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@email.com",
    role: "admin",
    plan: "Profesional",
    status: "active",
    devices: 12,
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-06-15T08:00:00Z",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    role: "user",
    plan: "Equipo",
    status: "active",
    devices: 45,
    lastLogin: "2024-01-14T16:45:00Z",
    createdAt: "2023-08-22T14:20:00Z",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "María López",
    email: "maria.lopez@startup.io",
    role: "user",
    plan: "Básico",
    status: "inactive",
    devices: 3,
    lastLogin: "2024-01-10T09:15:00Z",
    createdAt: "2023-11-05T11:30:00Z",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "David Chen",
    email: "david.chen@techcorp.com",
    role: "user",
    plan: "Empresarial",
    status: "active",
    devices: 156,
    lastLogin: "2024-01-15T14:20:00Z",
    createdAt: "2023-04-12T16:45:00Z",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Laura Martín",
    email: "laura.martin@innovate.es",
    role: "moderator",
    plan: "Profesional",
    status: "active",
    devices: 28,
    lastLogin: "2024-01-15T12:10:00Z",
    createdAt: "2023-09-18T10:15:00Z",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const roleColors = {
  admin: "bg-red-500/20 text-red-300 border-red-500/30",
  moderator: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  user: "bg-blue-500/20 text-blue-300 border-blue-500/30",
}

const statusColors = {
  active: "bg-green-500/20 text-green-300 border-green-500/30",
  inactive: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  suspended: "bg-red-500/20 text-red-300 border-red-500/30",
}

function AdminUserManager() {
  const [users, setUsers] = useState(initialUsers)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const activeUsers = users.filter((user) => user.status === "active").length
  const totalDevices = users.reduce((sum, user) => sum + user.devices, 0)
  const adminUsers = users.filter((user) => user.role === "admin").length

  const handleCreateUser = (userData: any) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      devices: 0,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      avatar: "/placeholder.svg?height=32&width=32",
    }
    setUsers([...users, newUser])
    setIsCreateDialogOpen(false)
  }

  const handleEditUser = (userData: any) => {
    setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...userData } : user)))
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">


      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-400">Administra los usuarios registrados en tu plataforma IoT</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Usuarios Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-gray-500 mt-1">+5 nuevos esta semana</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Usuarios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{activeUsers}</div>
              <p className="text-xs text-gray-500 mt-1">{Math.round((activeUsers / users.length) * 100)}% del total</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Dispositivos Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{totalDevices}</div>
              <p className="text-xs text-gray-500 mt-1">
                Promedio: {Math.round(totalDevices / users.length)} por usuario
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Administradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{adminUsers}</div>
              <p className="text-xs text-gray-500 mt-1">Con permisos completos</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 w-64"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32 bg-gray-900/50 border-gray-800 text-white">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderador</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-gray-900/50 border-gray-800 text-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="suspended">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-gray-200">
                <span className="mr-2">➕</span>
                Crear Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Registra un nuevo usuario en la plataforma
                </DialogDescription>
              </DialogHeader>
              <UserForm onSubmit={handleCreateUser} onCancel={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Usuarios Registrados</CardTitle>
            <CardDescription className="text-gray-400">
              Gestiona todos los usuarios de tu plataforma IoT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">Usuario</TableHead>
                  <TableHead className="text-gray-300">Rol</TableHead>
                  <TableHead className="text-gray-300">Plan</TableHead>
                  <TableHead className="text-gray-300">Dispositivos</TableHead>
                  <TableHead className="text-gray-300">Estado</TableHead>
                  <TableHead className="text-gray-300">Último Acceso</TableHead>
                  <TableHead className="text-gray-300 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-gray-700 text-white text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={roleColors[user.role as keyof typeof roleColors]}>
                        {user.role === "admin" ? "Admin" : user.role === "moderator" ? "Moderador" : "Usuario"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-white">{user.plan}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-white">{user.devices}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.status === "active"}
                          onCheckedChange={() => handleToggleStatus(user.id)}
                          className="data-[state=checked]:bg-green-600"
                        />
                        <Badge variant="secondary" className={statusColors[user.status as keyof typeof statusColors]}>
                          {user.status === "active" ? "Activo" : user.status === "inactive" ? "Inactivo" : "Suspendido"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-400">{formatDate(user.lastLogin)}</div>
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
                          className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-gray-400 hover:text-red-400 hover:bg-gray-800"
                        >
                          🗑️
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription className="text-gray-400">
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
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AdminUserManager;

function UserForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "user",
    plan: initialData?.plan || "Básico",
    status: initialData?.status || "active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Nombre Completo
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role" className="text-gray-300">
            Rol
          </Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="user">Usuario</SelectItem>
              <SelectItem value="moderator">Moderador</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="plan" className="text-gray-300">
            Plan
          </Label>
          <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="Básico">Básico</SelectItem>
              <SelectItem value="Profesional">Profesional</SelectItem>
              <SelectItem value="Equipo">Equipo</SelectItem>
              <SelectItem value="Empresarial">Empresarial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-gray-300">
            Estado
          </Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="suspended">Suspendido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          Cancelar
        </Button>
        <Button type="submit" className="bg-white text-black hover:bg-gray-200">
          {initialData ? "Actualizar Usuario" : "Crear Usuario"}
        </Button>
      </div>
    </form>
  )
}
