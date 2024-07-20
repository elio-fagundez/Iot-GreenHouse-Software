import {
    BarChart4,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    HousePlus
} from 'lucide-react'

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
        icon: CircleHelpIcon,
        label: 'Faqs',
        href: '/faqs'
    },
    {
        icon: BarChart4,
        label: 'Analytics',
        href: '/analytics'
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