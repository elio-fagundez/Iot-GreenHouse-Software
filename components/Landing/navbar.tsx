"use client"

import Link from "next/link"
import { Leaf } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="absolute top-4 left-0 right-0 z-50 mx-4 rounded-full border border-gray-700 bg-black backdrop-blur-sm md:mx-8">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-emerald-500" />
          <span className="text-lg font-semibold text-emerald-400">GreenHouse IoT</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-200 bg-transparent hover:bg-black hover:text-white">Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/about"
                    >
                      <div className="text-sm font-medium leading-none">About</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn more about our mission and team
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-200 bg-transparent hover:bg-black hover:text-white">Service</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/services"
                    >
                      <div className="text-sm font-medium leading-none">Our Services</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Explore our IoT solutions for gardening
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-200 bg-transparent hover:bg-black hover:text-white">Pricing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/pricing"
                    >
                      <div className="text-sm font-medium leading-none">Plans & Pricing</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Choose the perfect plan for your needs
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-gray-800">
            Log in
          </Button>
          <Button className="bg-emerald-500 text-white hover:bg-emerald-600">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}

