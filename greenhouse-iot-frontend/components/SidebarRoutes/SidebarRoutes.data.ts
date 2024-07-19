import {
    BarChart4,
    LeafyGreen,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Calendar
} from 'lucide-react'

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: 'Dashboard',
        href: '/'
    },
    {
        icon: LeafyGreen,
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