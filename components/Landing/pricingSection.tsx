"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        {
          name: "Monitoring of up to 3 variables (temperature, humidity, lighting)",
          included: true,
        },
        { name: "Email alerts and notifications for 1 month.", included: true },
        { name: "Reports up to 1 week", included: true },
        {
          name: "Email and chat support during business hours.",
          included: true,
        },
      ],
    },
    {
      name: "Pro",
      price: "49",
      features: [
        { name: "Includes everything in the Free plan", included: true },
        { name: "Monitoring of 2 additional variables", included: true },
        {
          name: "Remote control of devices (irrigation, ventilation, lighting)",
          included: true,
        },
        { name: "Real-time reports and graphs", included: true },
        { name: "Priority support via chat and phone", included: true },
        {
          name: "Integration with some third-party services (e.g., basic agricultural management software)",
          included: true,
        },
      ],
    },
    {
      name: "Enterprise",
      price: "99",
      features: [
        { name: "Includes everything in the Pro plan", included: true },
        {
          name: "Custom integrations (ERP, CRM, specific agricultural management systems)",
          included: true,
        },
        { name: "Unlimited historical data storage", included: true },
        { name: "Custom dashboards and predictive analytics", included: true },
        { name: "AI tools on the platform", included: true },
        {
          name: "24/7 support and a dedicated account manager",
          included: true,
        },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 px-4 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-8">
        <p className="text-4xl md:text-5xl  text-[#00A651] font-medium mb-4 font-bold">
          Pricing & Plan
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-gray-800">
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
                <span className="text-gray-600 ml-1">
                  Per month, billed {isMonthly ? "monthly" : "annually"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                className="w-full bg-[#008D36] text-white font-bold hover:bg-emerald-800"
                variant="secondary"
              >
                Try It For Free
              </Button>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    <Check
                      className={`w-5 h-5 ${
                        feature.included ? "text-[#00A651]" : "text-gray-800"
                      }`}
                    />
                    <span
                      className={
                        feature.included ? "text-gray-800" : "text-gray-800"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
