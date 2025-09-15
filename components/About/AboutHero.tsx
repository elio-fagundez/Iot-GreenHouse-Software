import { Button } from "@/components/ui/button";

export default function AboutHero() {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden rounded-xl shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/about.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 ">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center  hover:scale-[1.02] transition-all ">
            <h1 className="text-4xl  text-white sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              From Seed to <span className="text-green-500">Success</span>,
              <br />
              We Empower the World&apos;s
              <br />
              Top Growers
            </h1>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-8 text-lg text-white/90">
              Growlink is your trusted partner, providing cutting-edge
              technology to optimize every aspect of cultivation. We&apos;re
              revolutionizing the industry with smart solutions that drive
              growth, improve efficiency, and deliver measurable results.
            </p>
            <div>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
