import {
    BarChart4,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    HousePlus
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