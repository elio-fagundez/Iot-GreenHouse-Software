import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Users, Building2, Crown } from "lucide-react"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect to get started with IoT",
    icon: Zap,
    features: [
      "Up to 5 devices",
      "Basic monitoring",
      "Email alerts",
      "Web dashboard",
      "Email support",
    ],
    buttonText: "Current Plan",
    buttonVariant: "secondary" as const,
    current: true,
  },
  {
    id: "pro",
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For advanced users and small businesses",
    icon: Crown,
    features: [
      "Up to 50 devices",
      "Advanced monitoring",
      "SMS and push alerts",
      "Full API",
      "Automations",
      "Detailed reports",
      "Priority support",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    recommended: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$79",
    period: "/month",
    description: "Collaboration for medium-sized teams",
    icon: Users,
    features: [
      "Up to 200 devices",
      "Multi-user",
      "Roles and permissions",
      "Customizable dashboard",
      "Advanced integrations",
      "Automatic backup",
      "24/7 support",
    ],
    buttonText: "Upgrade to Team",
    buttonVariant: "outline" as const,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large enterprises",
    icon: Building2,
    features: [
      "Unlimited devices",
      "Dedicated infrastructure",
      "Guaranteed SLA",
      "Custom integrations",
      "Technical consulting",
      "Dedicated support",
      "Compliance",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
  },
]

export function PlanSettings() {
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
                Basic
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">3/5</div>
                <div className="text-sm text-muted-foreground">Devices</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">87%</div>
                <div className="text-sm text-muted-foreground">Monthly usage</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Days left</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          return (
            <Card
              key={plan.id}
              className={`relative transition-all duration-200 hover:shadow-lg ${
                plan.current
                  ? "ring-2 ring-primary bg-card/80"
                  : plan.recommended
                    ? "ring-2 ring-primary/50 bg-card/60 hover:ring-primary"
                    : "bg-card/40 hover:bg-card/60"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                </div>
              )}

              {plan.current && (
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
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={plan.buttonVariant} disabled={plan.current}>
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          )
        })}
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
