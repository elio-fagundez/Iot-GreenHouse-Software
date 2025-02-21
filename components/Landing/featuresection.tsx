import { Card, CardContent } from "@/components/ui/card"
import { Maximize2, Settings, Cloud, Wifi } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Maximize2 className="w-6 h-6 text-[#00A651]" />,
      title: "Hardware “Plug & Play",
      description:
        "Our sensors and control devices are easy to connect and install, without the need for complicated configurations. Just plug in the equipment, sync it with the platform and start monitoring your greenhouse in minutes.",
    },
    {
      icon: <Settings className="w-6 h-6 text-[#00A651]" />,
      title: "Customizable Firmware",
      description: "The internal software that controls the devices can be adapted to different growing needs. Whether your greenhouse is small or needs more advanced automations, our firmware adjusts to give you the best performance.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-[#00A651]" />,
      title: "Intuitive Graphical Interface",
      description: "Our web platform and mobile app are designed so that anyone, regardless of technical experience, can review and adjust key variables (temperature, humidity, irrigation, etc.) through clear graphics and simple menus.",
    },
    {
      icon: <Wifi className="w-6 h-6 text-[#00A651]" />,
      title: "Real-Time Remote Control",
      description:
        "Monitor and modify your greenhouse parameters from anywhere in the world. With the notifications and alerts feature, you will receive immediate notice of any important changes, allowing you to act instantly and protect your crops.",
    },
  ]

  return (
    <section id="services" className="py-16 px-4 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Discover the best experience in sustainable crops based on our IOT systems for <span className="text-[#00A651]">greenhouses</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Our sensors and control devices are easy to connect and install, without the need for complicated configurations. Just plug in the equipment, sync it with the platform and start monitoring your greenhouse in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="relative border-0 shadow-lg hover:scale-[1.02] transition-all">
            <div className="absolute top-0 right-0 w-3/4 h-12 bg-[#00A651]/10 rounded-bl-[3rem]" />
            <CardContent className="pt-8 pb-6 px-6">
              <div className="p-2 bg-white rounded-lg w-fit">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

