"use client"

import SidebarItem from "../SidebarItem/SidebarItem"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { dataGeneralSidebar, dataSupportSidebar, dataToolsSidebar } from "./SidebarRoutes.data"

export function SidebarRoutes() {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p>GENERAL</p>
                    {dataGeneralSidebar.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>
                <Separator />



                <div className="p-2 md:p-6">
                    <p>TOOLS</p>
                    {dataToolsSidebar.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>
                <Separator />

                <div className="p-2 md:p-6">
                    <p>SUPPORT</p>
                    {dataSupportSidebar.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>

            </div>
            <div>
                <div className="text-center p-6">
                    <Button variant="outline" className="w-full">Upgrade Plan</Button>
                </div>

                <Separator />

                <footer className="mt-3 p-3 text-center">
                    2024. GreenHouse IoT All rights reserved
                </footer>

            </div>
        </div>
    )
}

