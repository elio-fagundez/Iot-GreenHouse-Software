import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServicesHeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export default function ServicesHero({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonLink,
}: ServicesHeroProps) {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden rounded-xl shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="flex  items-center justify-center lg:min-h-[600px]">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 ">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center hover:scale-[1.02] transition-all">
              <h1 className="text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                {title}
              </h1>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-8 text-lg text-white/90">{subtitle}</p>
              <div>
                <Link href={buttonLink}>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    {buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
