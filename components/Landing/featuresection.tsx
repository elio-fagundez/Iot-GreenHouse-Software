import { Card, CardContent } from "@/components/ui/card"
import { Maximize2, Settings, Cloud, Wifi } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Maximize2 className="w-6 h-6 text-[#00A651]" />,
      title: "Unmatched precision",
      description:
        "Botanik uses state of the art sensors and artificial intelligence algorithms to provide accurate information about the health of your plant.",
    },
    {
      icon: <Settings className="w-6 h-6 text-[#00A651]" />,
      title: "Intuitive user interface",
      description:
        "Experience plant tracking easily with the user-friendly interface that allows gardeners to navigate effortlessly",
    },
    {
      icon: <Cloud className="w-6 h-6 text-[#00A651]" />,
      title: "Complete Plant Database",
      description: "Botanik provides you with the knowledge to care for a wide variety of flora, no matter how unique.",
    },
    {
      icon: <Wifi className="w-6 h-6 text-[#00A651]" />,
      title: "Seamless connectivity",
      description:
        "Botanik syncs seamlessly with all your devices, allowing you to monitor and care for your plants on the go.",
    },
  ]

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Discover the best experience in plant care with our botanical <span className="text-[#00A651]">system</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          With our easy to use system, you can effortlessly monitor the health of your plants, receive valuable
          information about their growth progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="relative border-0 shadow-lg">
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

