"use client"

import type { FormEvent } from "react"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Edit, Trash2, Users, Search, Filter, Zap, Crown, Building2, AlertTriangle } from "lucide-react"

import type { Plan, PlanCreatePayload } from "@/types/plan"
import { usePlans } from "@/hooks/usePlans"

type PlanFormValues = PlanCreatePayload

const safeNumber = (value: number | string | null | undefined): number => {
  if (typeof value === "number") {
    return value
  }
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

export function AdminPlanManager() {
  const { plans, loading, error, create, update, remove, setLocalPlans, refresh } = usePlans()
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSavingCreate, setIsSavingCreate] = useState(false)
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const filteredPlans = useMemo<Plan[]>(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return plans
    }
    return plans.filter((plan: Plan) =>
      [plan.name, plan.description].some((field) => field.toLowerCase().includes(term)),
    )
  }, [plans, searchTerm])

  const totalRevenue = plans.reduce((sum: number, plan: Plan) => sum + safeNumber(plan.revenue), 0)
  const totalSubscribers = plans.reduce((sum: number, plan: Plan) => sum + safeNumber(plan.subscribers), 0)
  const activePlans = plans.filter((plan: Plan) => plan.active).length

  const handleCreatePlan = async (values: PlanFormValues) => {
    setIsSavingCreate(true)
    try {
      await create({
        name: values.name,
        price: values.price,
        period: values.period,
        description: values.description,
        features: values.features,
        icon: values.icon,
        active: values.active,
        subscribers: values.subscribers ?? 0,
        revenue: values.revenue ?? 0,
      })
      await refresh()
      setSearchTerm("")
      setActionError(null)
      setIsCreateDialogOpen(false)
    } catch (err) {
      throw err instanceof Error ? err : new Error("No se pudo crear el plan")
    } finally {
      setIsSavingCreate(false)
    }
  }

  const handleEditPlan = async (values: PlanFormValues) => {
    if (!selectedPlan) return
    setIsSavingEdit(true)
    try {
      await update(selectedPlan.id, {
        name: values.name,
        price: values.price,
        period: values.period,
        description: values.description,
        features: values.features,
        icon: values.icon,
        active: values.active,
        subscribers: values.subscribers,
        revenue: values.revenue,
      })
      setIsEditDialogOpen(false)
      setSelectedPlan(null)
    } catch (err) {
      throw err instanceof Error ? err : new Error("No se pudo actualizar el plan")
    } finally {
      setIsSavingEdit(false)
    }
  }

  const handleDeletePlan = async (planId: number) => {
    setActionError(null)
    try {
      await remove(planId)
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo eliminar el plan"
      setActionError(message)
    }
  }

  const handleToggleActive = async (plan: Plan) => {
    setActionError(null)
    const nextActive = !plan.active
    setLocalPlans((current: Plan[]) => current.map((p: Plan) => (p.id === plan.id ? { ...p, active: nextActive } : p)))
    try {
      await update(plan.id, { active: nextActive })
    } catch (err) {
      setLocalPlans((current: Plan[]) => current.map((p: Plan) => (p.id === plan.id ? { ...p, active: plan.active } : p)))
      const message = err instanceof Error ? err.message : "No se pudo actualizar el estado del plan"
      setActionError(message)
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-100">
      <div className=" mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Plans Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your IoT platform&apos;s subscription plans and pricing</p>
        </div>

        {(error || actionError) && (
          <div className="mb-6 rounded-lg border border-red-500/50 bg-red-50 p-4 text-red-700 shadow-sm dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{error || actionError}</p>
                {error && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void refresh()}
                    className="mt-3 border-red-400 text-red-700 hover:bg-red-100 dark:border-red-400 dark:text-red-200 dark:hover:bg-red-500/20"
                  >
                    Reintentar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-200 dark:bg-[#0a0a0a] dark:border-[#1a1a1a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500 dark:text-green-400">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+12% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 dark:bg-[#0a0a0a] dark:border-[#1a1a1a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalSubscribers.toLocaleString()}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+8% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 dark:bg-[#0a0a0a] dark:border-[#1a1a1a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{activePlans}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">of {plans.length} total plans</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 dark:bg-[#0a0a0a] dark:border-[#1a1a1a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">24.5%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+3.2% vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 dark:bg-[#0a0a0a] dark:border-[#1f1f1f] dark:text-gray-100 dark:placeholder:text-gray-500 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent dark:border-[#1f1f1f] dark:text-gray-200 dark:hover:bg-[#141414]"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-gray-200 dark:bg-[#0a0a0a] dark:text-white dark:hover:bg-[#141414]">
                <Plus className="w-4 h-4 mr-2" />
                Create Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-2xl dark:bg-[#0a0a0a] dark:border-[#1f1f1f] dark:text-gray-100">
              <DialogHeader>
                <DialogTitle>Create New Plan</DialogTitle>
                <DialogDescription className="text-gray-400 dark:text-gray-500">
                  Set up a new subscription plan for your platform
                </DialogDescription>
              </DialogHeader>
              <PlanForm
                onSubmit={handleCreatePlan}
                onCancel={() => setIsCreateDialogOpen(false)}
                isSubmitting={isSavingCreate}
              />
            </DialogContent>
          </Dialog>
        </div>

    {/* Plans Table */}
    <Card className="bg-white border-gray-200 dark:bg-[#0a0a0a] dark:border-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Subscription Plans</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Manage all available plans on your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-gray-50 dark:border-[#1a1a1a] dark:hover:bg-[#141414]">
                  <TableHead className="text-gray-600 dark:text-gray-300">Plan</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Subscribers</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Revenue</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      Cargando planes...
                    </TableCell>
                  </TableRow>
                ) : filteredPlans.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No se encontraron planes.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlans.map((plan: Plan) => {
                    const price = safeNumber(plan.price)
                    const subscribers = safeNumber(plan.subscribers)
                    const revenue = safeNumber(plan.revenue)

                    const renderIcon = () => {
                      switch (plan.icon) {
                        case "zap":
                          return <Zap className="w-4 h-4 text-yellow-400" />
                        case "crown":
                          return <Crown className="w-4 h-4 text-purple-400" />
                        case "users":
                          return <Users className="w-4 h-4 text-blue-400" />
                        case "building":
                          return <Building2 className="w-4 h-4 text-green-400" />
                        default:
                          return <Zap className="w-4 h-4 text-yellow-400" />
                      }
                    }

                    return (
                      <TableRow
                        key={plan.id}
                        className="border-gray-200 hover:bg-gray-50 dark:border-[#1a1a1a] dark:hover:bg-[#141414]"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-[#141414]">
                              {renderIcon()}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{plan.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900 dark:text-white">
                            ${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                            <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900 dark:text-white">{subscribers.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-green-600 dark:text-green-400">
                            ${revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={plan.active}
                              onCheckedChange={() => void handleToggleActive(plan)}
                              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-[#1f1f1f]"
                            />
                            <Badge
                              variant={plan.active ? "default" : "secondary"}
                              className={
                                plan.active
                                  ? "bg-green-600 text-white dark:bg-green-500 dark:text-white"
                                  : "bg-gray-100 text-gray-700 dark:bg-[#141414] dark:text-gray-200"
                              }
                            >
                              {plan.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedPlan(plan)
                                setIsEditDialogOpen(true)
                              }}
                              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#141414] dark:hover:text-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => void handleDeletePlan(plan.id)}
                              className="text-gray-600 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-[#141414] dark:hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-2xl dark:bg-[#0a0a0a] dark:border-[#1f1f1f] dark:text-gray-100">
            <DialogHeader>
              <DialogTitle>Edit Plan</DialogTitle>
              <DialogDescription className="text-gray-400 dark:text-gray-500">
                Modify the selected plan&apos;s settings
              </DialogDescription>
            </DialogHeader>
            {selectedPlan && (
              <PlanForm
                initialData={selectedPlan}
                onSubmit={handleEditPlan}
                onCancel={() => {
                  setIsEditDialogOpen(false)
                  setSelectedPlan(null)
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

export default AdminPlanManager

interface PlanFormProps {
  initialData?: Plan
  onSubmit: (data: PlanFormValues) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

function PlanForm({ initialData, onSubmit, onCancel, isSubmitting = false }: PlanFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    price: initialData ? String(initialData.price) : "",
    period: initialData?.period ?? "month",
    description: initialData?.description ?? "",
    features: (initialData?.features ?? []).join("\n"),
    icon: initialData?.icon ?? "zap",
    active: initialData?.active ?? true,
  })
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    setFormData({
      name: initialData?.name ?? "",
      price: initialData ? String(initialData.price) : "",
      period: initialData?.period ?? "month",
      description: initialData?.description ?? "",
      features: (initialData?.features ?? []).join("\n"),
      icon: initialData?.icon ?? "zap",
      active: initialData?.active ?? true,
    })
    setSubmitError(null)
  }, [initialData])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)

    const trimmedName = formData.name.trim()
    if (!trimmedName) {
      setSubmitError("El nombre del plan es obligatorio.")
      return
    }

    const parsedPrice = Number.parseFloat(formData.price)
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setSubmitError("Introduce un precio válido.")
      return
    }

    const features = formData.features
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean)

    if (features.length === 0) {
      setSubmitError("Agrega al menos una característica.")
      return
    }

    try {
      await onSubmit({
        name: trimmedName,
        price: parsedPrice,
        period: formData.period,
        description: formData.description.trim(),
        features,
        icon: formData.icon,
        active: formData.active,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo guardar el plan"
      setSubmitError(message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-600 dark:text-gray-200">
            Plan Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            disabled={isSubmitting}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#1f1f1f] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-70"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon" className="text-gray-600 dark:text-gray-200">
            Icon
          </Label>
          <Select
            value={formData.icon}
            disabled={isSubmitting}
            onValueChange={(value) => setFormData({ ...formData, icon: value })}
          >
            <SelectTrigger className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#1f1f1f] text-black dark:text-white disabled:cursor-not-allowed disabled:opacity-70">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#1f1f1f] text-black dark:text-white">
              <SelectItem value="zap">⚡ Zap</SelectItem>
              <SelectItem value="crown">👑 Crown</SelectItem>
              <SelectItem value="users">👥 Users</SelectItem>
              <SelectItem value="building">🏢 Building</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-gray-600 dark:text-gray-200">
            Price
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            disabled={isSubmitting}
            onChange={(event) => setFormData({ ...formData, price: event.target.value })}
            className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#1f1f1f] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-70"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="period" className="text-gray-600 dark:text-gray-200">
            Period
          </Label>
          <Select
            value={formData.period}
            disabled={isSubmitting}
            onValueChange={(value) => setFormData({ ...formData, period: value })}
          >
            <SelectTrigger className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#1f1f1f] text-black dark:text-white disabled:cursor-not-allowed disabled:opacity-70">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#1f1f1f] text-black dark:text-white">
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-600 dark:text-gray-200">
          Description
        </Label>
        <Input
          id="description"
          value={formData.description}
          disabled={isSubmitting}
          onChange={(event) => setFormData({ ...formData, description: event.target.value })}
          className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#1f1f1f] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-70"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features" className="text-gray-600 dark:text-gray-200">
          Features (one per line)
        </Label>
        <Textarea
          id="features"
          value={formData.features}
          disabled={isSubmitting}
          onChange={(event) => setFormData({ ...formData, features: event.target.value })}
          className="min-h-32 bg-white text-black placeholder:text-gray-400 dark:bg-[#0a0a0a] dark:text-white dark:placeholder:text-gray-500 border-gray-300 dark:border-[#1f1f1f] disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Up to 5 devices&#10;Basic monitoring&#10;Email alerts"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          disabled={isSubmitting}
          onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-[#1f1f1f]"
        />
        <Label htmlFor="active" className="text-gray-600 dark:text-gray-200">
          Active plan
        </Label>
      </div>

      {submitError && <p className="text-sm text-red-500 dark:text-red-400">{submitError}</p>}

      <Separator className="bg-gray-200 dark:bg-[#1f1f1f]" />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border-gray-300 bg-transparent text-gray-600 hover:bg-gray-100 dark:border-[#1f1f1f] dark:text-gray-200 dark:hover:bg-[#141414] disabled:cursor-not-allowed disabled:opacity-70"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black hover:bg-gray-200 dark:bg-[#0a0a0a] dark:text-white dark:hover:bg-[#141414] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Guardando..." : initialData ? "Update Plan" : "Create Plan"}
        </Button>
      </div>
    </form>
  )
}
