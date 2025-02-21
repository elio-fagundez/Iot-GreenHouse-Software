"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const particles = document.querySelectorAll(".particle");
      particles.forEach((particle) => {
        const size = Math.random() * 20 + 1;
        const duration = Math.random() * 4 + 2;
        const moveX = Math.random() * 100 - 50;
        const moveY = Math.random() * 100 - 50;
        (particle as HTMLElement).style.width = `${size}px`;
        (particle as HTMLElement).style.height = `${size}px`;
        (particle as HTMLElement).style.left = `${Math.random() * 100}%`;
        (particle as HTMLElement).style.top = `${Math.random() * 100}%`;
        (particle as HTMLElement).style.setProperty("--move-x", `${moveX}px`);
        (particle as HTMLElement).style.setProperty("--move-y", `${moveY}px`);
        (particle as HTMLElement).style.animation = `moveParticle ${duration}s infinite alternate`;
   
      });
    }
  }, [isLoaded]);

  return (
    <section className="py-44 mt-20">
  
      <div className="container flex flex-col items-center text-center">
        <h1 className="max-w-5xl text-4xl font-bold tracking-tight sm:text-6xl">
          Embrace the future: green tomorrow starts{" "}
          <span className="text-[#008D36]">today with a click!</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Discover a smart, integrated and cost-effective cultivation system,
          with online monitoring and control to take your business to the next
          level.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <Link
            href={"/about"}
            className="rounded-full bg-zinc-100 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-200"
          >
            About us
          </Link>

          <Link
            href={"/sign-up"}
            className="rounded-full bg-[#008D36] px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;