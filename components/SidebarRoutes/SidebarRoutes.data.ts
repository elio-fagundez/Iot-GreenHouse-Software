import {
    BarChart4,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    HousePlus,
    Droplets
} from 'lucide-react'
import { Zap, Fuel, Thermometer, Droplet, SunDim, Sprout, Heater, Lightbulb, Fan } from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        icon: HousePlus,
        label: 'Green Houses',
        href: '/dashboard/greenhouses'
    }
]


export const dataToolsSidebar = [ 
    {
        icon: Thermometer,
        label: 'Temperatures',
        href: '/dashboard/temperatures'
    },
    {
        icon: Droplet,
        label: 'Humidities',
        href: '/dashboard/humidities'
    },
    {
        icon: SunDim,
        label: 'Brightnesses',
        href: '/dashboard/brightnesses'
    },
    {
        icon: Heater,
        label: 'Soil Humidities',
        href: '/dashboard/soilhumidities'
    },
    {
        icon: Fuel,
        label: 'CO2',
        href: '/dashboard/co2'
    },
    {
        icon: Droplets,
        label: 'PH',
        href: '/dashboard/ph'
    }
]

// export const dataSupportSidebar = [ 

//     {
//         icon: Settings,
//         label: 'Settings',
//         href: '/settings'
//     },

//     {
//         icon: ShieldCheck,
//         label: 'Security',
//         href: '/security'
//     },

// ]


export const dataActuatorSidebar = [ 
    {
        icon: Thermometer,
        label: 'Fan 1',
        href: '/dashboard/fan1'
    },
    {
        icon: Droplet,
        label: 'Lamp 1',
        href: '/dashboard/lamp1'
    },
    {
        icon: SunDim,
        label: 'Pump 1',
        href: '/dashboard/pump1'
    },
    {
        icon: Heater,
        label: 'Heater 1',
        href: '/dashboard/heater1'
    }
]