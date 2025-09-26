"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Users, Building2, Crown, Leaf, Loader2, RefreshCw, Shield } from "lucide-react"
import { useMemo, type ComponentType } from "react"

import { usePlans } from "@/hooks/usePlans"
import type { Plan } from "@/types/plan"

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  zap: Zap,
  crown: Crown,
  users: Users,
  building: Building2,
  leaf: Leaf,
  shield: Shield,
}

const safeNumber = (value: number | string | null | undefined): number => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0
  }
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const formatPrice = (plan: Plan) => {
  const amount = safeNumber(plan.price)
  if (amount === 0) {
    return "Custom"
  }
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

export function PlanSettings() {
  const { plans, loading, error, refresh } = usePlans()

  const visiblePlans = useMemo(() => {
    if (!plans.length) return []
    const activePlans = plans.filter((plan) => plan.active)
    return activePlans.length ? activePlans : plans
  }, [plans])

  const currentPlan = useMemo(() => {
    const active = plans.find((plan) => plan.active)
    return active ?? plans[0] ?? null
  }, [plans])

  const renderFeatures = (features: string[]) => {
    if (!features?.length) {
      return (
        <li className="text-sm text-muted-foreground">Este plan aún no tiene características registradas.</li>
      )
    }
    return features.map((feature, index) => (
      <li key={`${feature}-${index}`} className="flex items-start gap-3">
        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <span className="text-sm text-muted-foreground">{feature}</span>
      </li>
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Plan Settings
        </div>
        <h1 className="text-4xl font-bold text-balance mb-4">Manage your IoT Subscription</h1>
        <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
          Upgrade your plan to unlock more devices, advanced features, and better support.
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="mb-8">
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Current Plan</CardTitle>
                <CardDescription>Your active subscription</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {currentPlan ? currentPlan.name : "Sin plan"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando información del plan...</span>
              </div>
            ) : currentPlan ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${safeNumber(currentPlan.price).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">Precio mensual</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{currentPlan.period || "-"}</div>
                  <div className="text-sm text-muted-foreground">Periodo</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{safeNumber(currentPlan.subscribers)}</div>
                  <div className="text-sm text-muted-foreground">Suscriptores</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Aún no hay planes activos. Crea uno desde el panel de administración.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mb-8 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <div className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => void refresh()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reintentar
            </Button>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && !plans.length ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={`skeleton-${index}`} className="bg-card/40 animate-pulse">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-fit" />
                <div className="h-6 w-32 bg-muted rounded mx-auto mb-2" />
                <div className="h-4 w-48 bg-muted rounded mx-auto" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-1/2 bg-muted rounded mb-6" />
                <div className="h-10 w-full bg-muted rounded" />
              </CardContent>
            </Card>
          ))
        ) : visiblePlans.length === 0 ? (
          <Card className="col-span-full bg-card/40">
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>No hay planes disponibles todavía. Crea uno desde el panel de administración.</p>
            </CardContent>
          </Card>
        ) : (
          visiblePlans.map((plan) => {
            const IconComponent = iconMap[plan.icon ?? ""] ?? Zap
            const isCurrent = currentPlan?.id === plan.id
            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-200 hover:shadow-lg ${
                  isCurrent
                    ? "ring-2 ring-primary bg-card/80"
                    : "bg-card/40 hover:bg-card/60"
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Current
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{formatPrice(plan)}</span>
                    {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">{renderFeatures(plan.features)}</ul>

                  <Button className="w-full" variant={isCurrent ? "secondary" : "default"} disabled={isCurrent}>
                    {isCurrent ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Instant Change</h3>
            <p className="text-sm text-muted-foreground">
              Upgrade or downgrade your plan at any time without interruptions.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Expert Support</h3>
            <p className="text-sm text-muted-foreground">
              Our technical team will help you with migration and setup.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Scalability</h3>
            <p className="text-sm text-muted-foreground">
              Grow with your business, from startups to global enterprises.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
