import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface Greenhouse {
    id: number;
    name: string;
    value?: number;
    createdAt?: string;
    country?: string;
    phone?: string;
    cif?: string;
    website?: string;
    profileImage?: string;
}

interface GreenhouseTableProps {
    currentItems: Greenhouse[];
    setOpenModalEditIndex: (index: number | null) => void;
    handleSort: (column: keyof Greenhouse | 'name') => void;
    order: { column: keyof Greenhouse | 'name'; order: 'asc' | 'desc' };
    deleteGreenhouse: (id: number) => void;
    FormComponent: React.ComponentType<any>;
}

const GreenhouseTable: React.FC<GreenhouseTableProps> = ({
    currentItems,
    setOpenModalEditIndex,
    handleSort,
    order,
    deleteGreenhouse,
    FormComponent
}) => {
    console.log("currentItems:", currentItems);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {currentItems.some(item => item.id) &&

                        <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('id')}>
                            ID
                        </TableHead>
                    }
                    {currentItems.some(item => item.name) &&

                        <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                            Name
                        </TableHead>
                    }
                    {currentItems.some(item => item.value) &&

                        <TableHead onClick={() => handleSort('value')} className="cursor-pointer">
                            Value
                        </TableHead>
                    }
                    {currentItems.some(item => item.createdAt) &&
                        <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer">
                            Created at
                        </TableHead>}
                    {currentItems.some(item => item.country) && <TableHead>Country</TableHead>}
                    {currentItems.some(item => item.phone) && <TableHead>Phone</TableHead>}
                    {currentItems.some(item => item.cif) && <TableHead>CIF</TableHead>}
                    {currentItems.some(item => item.website) && <TableHead>Website</TableHead>}
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentItems.map((greenhouse, index) => (
                    <TableRow key={greenhouse.id}>
                        {greenhouse.id && <TableCell>{greenhouse.id}</TableCell>}
                        {greenhouse.name && <TableCell>{greenhouse.name}</TableCell>}
                        {greenhouse.value && <TableCell>{greenhouse.value ?? 'N/A'}</TableCell>}
                        {greenhouse.createdAt && (
                            <TableCell>
                                {greenhouse.createdAt ? new Date(greenhouse.createdAt).toLocaleString('en-US') : 'N/A'}
                            </TableCell>
                        )}
                        {greenhouse.country && <TableCell>{greenhouse.country}</TableCell>}
                        {greenhouse.phone && <TableCell>{greenhouse.phone}</TableCell>}
                        {greenhouse.cif && <TableCell>{greenhouse.cif}</TableCell>}
                        {greenhouse.website && <TableCell>{greenhouse.website}</TableCell>}
                        <TableCell>
                            <div className="flex gap-4">
                                <button onClick={() => setOpenModalEditIndex(index)} className='bg-green-300 h-8 w-8 rounded' style={{ color: 'black' }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => deleteGreenhouse(greenhouse.id)} className='bg-red-600 h-8 w-8 rounded' style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default GreenhouseTable;