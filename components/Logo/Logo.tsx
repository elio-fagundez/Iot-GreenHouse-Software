"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const logoSrc =
    resolvedTheme === "dark" ? "/logos/white.png" : "/logos/black.png";

  return (
    <div
      className="min-h-20 h-20 flex items-center px-6  dark:border-none cursor-pointer gap-2"
      onClick={() => router.push("/")}
    >
      <Image src={logoSrc} width={180} height={30} alt="Logo" priority />
    </div>
  );
}
