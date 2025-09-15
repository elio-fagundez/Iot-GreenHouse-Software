"use client";

import Link from "next/link";
import { BriefcaseBusiness, Handshake, Mail, Phone, Send } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export function Navbar(HasUser: any) {
  const isAuth = HasUser.HasUser;

  return (
    <header className="absolute top-4 left-0 right-0 z-50 mx-4 rounded-full border border-gray-700 bg-black backdrop-blur-sm md:mx-8">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={"/logos/white.png"}
            width={140}
            height={70}
            alt="bloomiot"
          />
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-200 bg-transparent hover:bg-black hover:text-white">
                Company
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/about"
                    >
                      <div className="flex gap-4">
                        <Handshake />
                        <div className="flex flex-col">
                          <h2 className="text-sm font-medium leading-none">
                            About us
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/contact"
                    >
                      <div className="flex gap-4">
                        <Send />
                        <div className="flex flex-col">
                          <h2 className="text-sm font-medium leading-none">
                            Contact
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/how-works"
                    >
                      <div className="flex gap-4">
                        <BriefcaseBusiness />
                        <div className="flex flex-col">
                          <h2 className="text-sm font-medium leading-none">
                            How Bloomiot works
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-200 bg-transparent hover:bg-black hover:text-white">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 px-6 py-2  w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/services/customized-products"
                    >
                      <div className="flex gap-4">
                        <Image
                          src="/icons/navbar/customized.png"
                          width={30}
                          height={24}
                          alt="fix"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            padding: "1px",
                          }}
                        />
                        <div className="flex flex-col items-center justify-center">
                          <h2 className="text-sm font-medium leading-none">
                            Customized products.
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div className="grid gap-3 px-6 py-2 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/services/development-of-iot-web-platforms-for-greenhouses"
                    >
                      <div className="flex gap-4">
                        <Image
                          src="/icons/navbar/desarrollo.png"
                          width={30}
                          height={24}
                          alt="fix"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            padding: "1px",
                          }}
                        />

                        <div className="flex flex-col items-center justify-center">
                          <h2 className="text-sm font-medium leading-none">
                            Development of IoT web platforms for greenhouses.
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div className="grid gap-3 px-6 py-2 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/services/installation-and-maintenance"
                    >
                      <div className="flex gap-4">
                        <Image
                          src="/icons/navbar/mantenimiento.png"
                          width={30}
                          height={24}
                          alt="fix"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            padding: "1px",
                          }}
                        />
                        <div className="flex flex-col items-center justify-center">
                          <h2 className="text-sm font-medium leading-none">
                            Installation and maintenance.
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>

                <div className="grid gap-3 px-6 py-2 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/services/remote-support-ecosystem"
                    >
                      <div className="flex gap-4">
                        <Image
                          src="/icons/navbar/soporte.png"
                          width={30}
                          height={24}
                          alt="fix"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            padding: "1px",
                          }}
                        />

                        <div className="flex flex-col items-center justify-center">
                          <h2 className="text-sm font-medium leading-none">
                            Remote support ecosystem.
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div className="grid gap-3 px-6 py-2 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/services/advanced-data-analysis-and-optimization-of-agricultural-processes"
                    >
                      <div className="flex gap-4">
                        <Image
                          src="/icons/navbar/analisis.png"
                          width={30}
                          height={24}
                          alt="fix"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            padding: "1px",
                          }}
                        />
                        <div className="flex flex-col items-center justify-center">
                          <h2 className="font-medium leading-none text-[14px]">
                            Advanced data analysis and optimization of
                            agricultural processes.
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                className="text-gray-200 bg-transparent hover:bg-black text-sm hover:text-white"
                href="/#pricing"
              >
                Pricing
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-200 bg-transparent hover:bg-black hover:text-white">
                Support
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="tel:123456789"
                    >
                      <div className="flex gap-4">
                        <Phone />
                        <div className="flex flex-col">
                          <h2 className="text-sm font-medium leading-none">
                            Phone
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008D36] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="mail:email@gmail.com"
                    >
                      <div className="flex gap-4">
                        <Mail />
                        <div className="flex flex-col">
                          <h2 className="text-sm font-medium leading-none">
                            Email
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {isAuth ? (
            <>
              <Link
                href={"/dashboard"}
                className="rounded-full bg-[#008D36] px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-gray-200 hover:text-white">
                <Button
                  variant="ghost"
                  className="text-gray-200 hover:text-white hover:bg-gray-800"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/sign-up" className="text-gray-200 hover:text-white">
                <Button className="bg-[#008D36] text-white hover:bg-emerald-600">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
