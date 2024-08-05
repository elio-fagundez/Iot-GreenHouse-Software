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
        href: '/'
    },
    {
        icon: HousePlus,
        label: 'Green Houses',
        href: '/greenhouses'
    }
]


export const dataToolsSidebar = [ 
    {
        icon: Thermometer,
        label: 'Temperatures',
        href: '/temperatures'
    },
    {
        icon: Droplet,
        label: 'Humidities',
        href: '/humidities'
    },
    {
        icon: SunDim,
        label: 'Brightnesses',
        href: '/brightnesses'
    },
    {
        icon: Heater,
        label: 'Soil Humidities',
        href: '/soilhumidities'
    },
    {
        icon: Fuel,
        label: 'CO2',
        href: '/co2'
    },
    {
        icon: Droplets,
        label: 'PH',
        href: '/ph'
    }
]

export const dataSupportSidebar = [ 

    {
        icon: Settings,
        label: 'Settings',
        href: '/settings'
    },

    {
        icon: ShieldCheck,
        label: 'Security',
        href: '/security'
    },

]


export const dataActuatorSidebar = [ 
    {
        icon: Thermometer,
        label: 'Fan 1',
        href: '/fan1'
    },
    {
        icon: Droplet,
        label: 'Lamp 1',
        href: '/lamp1'
    },
    {
        icon: SunDim,
        label: 'Pump 1',
        href: '/pump1'
    },
    {
        icon: Heater,
        label: 'Heater 1',
        href: '/heater1'
    }
]