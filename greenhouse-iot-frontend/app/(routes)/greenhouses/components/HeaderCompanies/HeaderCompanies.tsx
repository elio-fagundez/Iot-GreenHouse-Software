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
import { FormCreateCustomer } from "../FormCreateCustomer"

export function HeaderCompanies() {
    const [openModalCreate, setOpenModalCreate] = useState(false)
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">List of Green Houses</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>Create Green House</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Green House</DialogTitle>
                        <DialogDescription>Create and configure your Green House</DialogDescription>

                    </DialogHeader> 

                    <FormCreateCustomer setOpenModalCreate={function (value: boolean): void {
                        throw new Error("Function not implemented.")
                    } } />
                </DialogContent>  
            </Dialog>
        </div>
    )
}
