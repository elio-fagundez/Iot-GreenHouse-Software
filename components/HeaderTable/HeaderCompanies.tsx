"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText } from 'lucide-react'
import { useState, ChangeEvent } from 'react'
import DownloadModal from './DownloadModal'; 

interface HeaderCompaniesProps {
    title: string;
    onSearch: (searchTerm: string) => void;
    handleDownloadPDF: (days: number, reportTitle: string) => void;
}


export function HeaderCompanies({ title, onSearch, handleDownloadPDF }: HeaderCompaniesProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

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
                <Button onClick={openModal} className='ml-4'>
                    <FileText strokeWidth={2} className='w-3 h-3 mr-2' /> Download Report
                </Button>
            </div>
            <DownloadModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                handleDownloadPDF={(days: number) => {
                    handleDownloadPDF(days, "Report Title");
                    closeModal();
                }}
            />
        </div>
    );
}