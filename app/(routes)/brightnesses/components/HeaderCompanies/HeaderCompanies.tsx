"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { FormCreateCustomer } from "../FormCreateCustomer/FormCreateCustomer"

export function HeaderCompanies({title}: {title: string}) {
    const [openModalCreate, setOpenModalCreate] = useState(false)
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">{title}</h2>
            {title.toLowerCase() === 'greenhouses' && (

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button><CirclePlus strokeWidth={2} className='w-3 h-3 mr-2' /> Create Green House </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Green House                         
                        </DialogTitle>
                        <DialogDescription>Create and configure your Green House</DialogDescription>

                    </DialogHeader>
                    <FormCreateCustomer setOpenModalCreate={setOpenModalCreate} />
                </DialogContent>
            </Dialog>
             )}
        </div>
    )
}
