"use client"

import SidebarItem from "../SidebarItem/SidebarItem"
import { Separator } from "@/components/ui/separator"
import { dataGeneralSidebar, dataSupportSidebar, dataToolsSidebar, dataActuatorSidebar } from "./SidebarRoutes.data"
import { useState } from "react"

export function SidebarRoutes() {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenActuator, setIsOpenActuator] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    const toggleOpenActuator = () => {
        setIsOpenActuator(!isOpenActuator);
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="overflow-y-auto">
                <div className="p-2 md:p-6">
                    <p>GENERAL</p>
                    {dataGeneralSidebar.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>
                <Separator />

                <div className="p-2 md:p-6">
                    <button onClick={toggleOpen} className="flex justify-between items-center w-full text-left">
                        <p>SENSORS</p>
                        <span>{isOpen ? '-' : '+'}</span>
                    </button>
                        <div>
                            {dataToolsSidebar.map((item, index) => (
                                <SidebarItem key={index} item={item} />
                            ))}
                        </div>
                 
                </div>
                <Separator />

                <div className="p-2 md:p-6">
                    <button onClick={toggleOpenActuator} className="flex justify-between items-center w-full text-left">
                        <p>ACTUATORS</p>
                        <span>{isOpenActuator ? '-' : '+'}</span>
                    </button>
                    {isOpenActuator && (
                        <div>
                            {dataActuatorSidebar.map((item, index) => (
                                <SidebarItem key={index} item={item} />
                            ))}
                        </div>
                    )}
                </div>
                <Separator />

                <div className="p-2 md:p-6">
                    <p>SUPPORT</p>
                    {dataSupportSidebar.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>
            </div>
          
        </div>
    )
}

