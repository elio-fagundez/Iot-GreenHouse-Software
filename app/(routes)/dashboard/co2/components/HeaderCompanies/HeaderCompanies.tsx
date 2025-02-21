"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from 'lucide-react'
import { useState, ChangeEvent } from 'react'
import { FormCreateCustomer } from "../FormCreateCustomer/FormCreateCustomer"

interface HeaderCompaniesProps {
    title: string;
    onSearch: (searchTerm: string) => void;
}

export function HeaderCompanies({ title, onSearch }: HeaderCompaniesProps) {
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchTerm(value)
        onSearch(value)
    }

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl mb-12">{title}</h2>
            <div className="flex items-center gap-x-4">
                <Input
                    placeholder={`Search ${title} ...`}
                    className="rounded-lg"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {title.toLowerCase() === 'greenhouses' && (
                    <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                        <DialogTrigger asChild>
                            <Button><CirclePlus strokeWidth={2} className='w-3 h-3 mr-2' /> Create Green House </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Green House</DialogTitle>
                                <DialogDescription>Create and configure your Green House</DialogDescription>
                            </DialogHeader>
                            <FormCreateCustomer setOpenModalCreate={setOpenModalCreate} greenhouseData={undefined} />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    )
}