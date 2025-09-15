import Image from "next/image";

export default function ApproachSections() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-1">
        {/* Left Section */}
        <div className="space-y-6 flex gap-8 items-center">
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/section1.jpg"
              alt="Growers analyzing data on tablet"
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-600">Mission</h2>
            <p className="text-gray-400">
              Transforming the greenhouse growing experience by offering
              easy-to-use, reliable and environmentally friendly technological
              solutions.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6 flex gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-600">Vision</h2>
            <p className="text-gray-400">
              To become the global benchmark for smart agricultural innovation,
              driving the evolution of the sector with tools that combine
              simplicity, profitability and protection of natural resources.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/section1.jpg"
              alt="Growers analyzing data on tablet"
              width={900}
              height={400}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
