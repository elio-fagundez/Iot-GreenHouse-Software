"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(false)

  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        { name: "Complete Documentation", included: true },
        { name: "Working Materials in Figma", included: true },
        { name: "100GB Cloud Storage", included: true },
        { name: "Email Automation", included: false },
        { name: "Premium Support", included: false },
      ],
    },
    {
      name: "Pro",
      price: "49",
      features: [
        { name: "Complete Documentation", included: true },
        { name: "Working Materials in Figma", included: true },
        { name: "100GB Cloud Storage", included: true },
        { name: "Email Automation", included: true },
        { name: "Premium Support", included: false },
      ],
    },
    {
      name: "Exclusive",
      price: "99",
      features: [
        { name: "Complete Documentation", included: true },
        { name: "Working Materials in Figma", included: true },
        { name: "100GB Cloud Storage", included: true },
        { name: "Email Automation", included: true },
        { name: "Premium Support", included: true },
      ],
    },
  ]

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-[#00A651] font-medium mb-4">Pricing & Plan</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Choose a plan that
          <br />
          suits for your business
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Label htmlFor="billing-toggle" className="text-gray-600">
            Annually
          </Label>
          <Switch
            id="billing-toggle"
            checked={isMonthly}
            onCheckedChange={setIsMonthly}
            className="data-[state=checked]:bg-[#00A651]"
          />
          <Label htmlFor="billing-toggle" className="text-gray-600">
            Monthly
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="border shadow-lg">
            <CardHeader>
              <CardTitle>
                <span className="text-[#00A651]">{plan.name}</span>
              </CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600 ml-1">Per month, billed {isMonthly ? "monthly" : "annually"}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button className="w-full bg-[#B4E4D1] hover:bg-[#A3D3C0] text-black" variant="secondary">
                Try It For Free
              </Button>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    <Check className={`w-5 h-5 ${feature.included ? "text-[#00A651]" : "text-gray-300"}`} />
                    <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

