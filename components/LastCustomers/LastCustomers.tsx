import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { Building } from 'lucide-react'
import React from 'react'
import { CustomersTable } from '../CustomersTable'

export default function LastCustomers() {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 '>
            <div className="flex gap-x-2 items-center">
                <CustomIcon icon={Building} />
                <p className='text-sm'>Last Customers</p>
            </div>
            <div>
             <CustomersTable />
            </div>
        </div>
    )
}
