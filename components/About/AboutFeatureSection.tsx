import { Card, CardContent } from "@/components/ui/card"
import { Maximize2, Settings, Cloud, Wifi } from "lucide-react"
import { FeatureCard } from "./FeatureCard"

export default function AboutFeatureSection() {
  const features = [
    {
      icon: <Maximize2 className="w-6 h-6 text-[#00A651]" />,
      title: "Constant Innovation",
      description:
        "We seek to continuously improve our products and services by adopting the latest trends in IoT and applying them in a practical way in agriculture.",
    },
    {
      icon: <Settings className="w-6 h-6 text-[#00A651]" />,
      title: "Simplicity and Usability",
      description: "We design every detail so that anyone can access a professional control and monitoring system without technical barriers.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-[#00A651]" />,
      title: "Sustainability",
      description: "We prioritize solutions that optimize the use of water, energy and other essential resources for responsible cultivation.",
    },
    {
      icon: <Wifi className="w-6 h-6 text-[#00A651]" />,
      title: "Support and Proximity",
      description:
        "We accompany our clients at every step, offering personalized advice and attention to ensure the success of their projects.",
    },
  ]

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Our <span className="text-[#00A651]">Values</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        We invite you to discover how Bloomiot can revolutionize the way you grow. Our team is ready to guide and help you optimize your greenhouse, giving you full control of your crops, no matter where you are. Welcome to a new era of smart farming!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((feature, index) => (
         <FeatureCard
         key={index}
         title={feature.title}
         description={feature.description}
       />
        ))}
      </div>
    </section>
  )
}

