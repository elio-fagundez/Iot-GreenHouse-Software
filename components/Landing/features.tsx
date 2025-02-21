import Image from "next/image";

export function Features() {
  const features = [
    {
      title: "Build high-quality apps at no-code speed",
      description:
        "GreenHouse App make it easy to configure and deeply customize beautiful, feature-rich apps without a line of code, yet both maintain high performance and an unparalleled app experience with GreenHouse.",
      image: "/service.png",
    },
    {
      title: "Efficiently support and grow your IoT business",
      description:
        "GreenHouse App make it easy to configure and deeply customize beautiful, feature-rich apps without a line of code, yet both maintain high performance and an unparalleled app experience with GreenHouse.",
      image: "/service2.png",
    },
    {
      title: "Flexible Connection and protocol option",
      description:
        "From standar communication protocols (eg.MQTT,HTTP) to packaged firmware solutions, GreenHouse takes care of device connection management for you on WiFi, Ethernet, Cellular, LoRaWAN, or Satellite.",
      image: "/service3.png",
    },
    {
      title: "Flexible Connection and protocol option",
      description:
        "From standar communication protocols (eg.MQTT,HTTP) to packaged firmware solutions, GreenHouse takes care of device connection management for you on WiFi, Ethernet, Cellular, LoRaWAN, or Satellite.",
      image: "/service4.png",
    },
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-4">
        Learn more about our IoT system for <span className="text-[#008D36]"> greenhouses.</span>
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group border relative flex items-end overflow-hidden rounded-2xl bg-gray-100 p-8 transition-all hover:scale-[1.02] h-[400px] md:h-[690px]"
            >
              <div className="relative z-10 pb-24">
                <h3 className="mb-4 lg:text-4xl text-lg font-semibold group-hover:text-black">
                  {feature.title}
                  <span className="block h-1 mt-1 w-0 bg-[#008D36] transition-all duration-500 group-hover:w-full"></span>
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95" />
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}