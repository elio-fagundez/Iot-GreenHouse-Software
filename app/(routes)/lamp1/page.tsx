"use client";
import React, { useState, useEffect } from 'react';
import { HeaderCompanies } from './components/HeaderCompanies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Edit } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormCreateCustomer } from './components/FormCreateCustomer';
import { Button } from '@/components/ui/button';

interface Greenhouse {
  country: string;
  phone: string;
  cif: string;
  id: number;
  name: string;
  website: string;
  profileImage: string;
  greenhouseId: string;
  value?: number;
  createdAt?: string;
}

type Order = 'asc' | 'desc';

export default function Page() {
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [openModalEditIndex, setOpenModalEditIndex] = useState<number | null>(null);
  const [greenhouseNames, setGreenhouseNames] = useState<{ [key: string]: string }>({});
  const [order, setOrder] = useState<{ column: keyof Greenhouse | 'name', order: Order }>({ column: 'id', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/api/lamp1/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGreenhouses(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const deleteGreenhouse = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/lamp1/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setGreenhouses(greenhouses.filter(greenhouse => greenhouse.id !== id));

      toast({
        title: "Greenhouse removed",
      });
    } catch (error) {
      setError(error as Error);
      toast({
        title: "The greenhouse has error",
      });
    }
  };

  useEffect(() => {
    const fetchGreenhouseNames = async () => {
      const names: { [key: string]: string } = {};
      for (const greenhouse of greenhouses) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
          const response = await fetch(`${apiUrl}/api/greenhouses/${greenhouse.greenhouseId}`);
          const contentType = response.headers.get("content-type");
          if (response.status === 404) {
            console.error(`Error 404: El invernadero con ID ${greenhouse.greenhouseId} no fue encontrado.`);
          } else if (contentType && contentType.includes("application/json")) {
            const data: Greenhouse = await response.json();
            names[greenhouse.greenhouseId] = data.name;
          } else {
            const text = await response.text();
            console.error('Error: La respuesta no es JSON', {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
              body: text,
            });
          }
        } catch (error) {
          console.error('Error fetching greenhouse name:', error);
        }
      }
      setGreenhouseNames(names);
    };

    fetchGreenhouseNames();
  }, [greenhouses]);

  const handleSort = (column: keyof Greenhouse | 'name') => {
    const isAsc = order.column === column && order.order === 'asc';
    setOrder({ column, order: isAsc ? 'desc' : 'asc' });
  };

  const sortedGreenhouses = [...greenhouses].sort((a, b) => {
    const column = order.column;
    if (column === 'name') {
      const nameA = greenhouseNames[a.greenhouseId] || '';
      const nameB = greenhouseNames[b.greenhouseId] || '';
      return order.order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else {
      const valueA = a[column] || '';
      const valueB = b[column] || '';
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order.order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order.order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return 0;
      }
    }
  });

  const SortArrow = ({ order, active }: { order: 'asc' | 'desc'; active: boolean }) => {
    const style = active ? { fontWeight: 'bold' } : { color: '#ccc' };
    return order === 'asc' ? <span style={style}>↑</span> : <span style={style}>↓</span>;
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Search term:", term);
  };


  const filteredItems = sortedGreenhouses.filter(greenhouse =>
    greenhouseNames[greenhouse.greenhouseId]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    greenhouse.greenhouseId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof greenhouse.value === 'number' && greenhouse.value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );




  return (
    <>
      <HeaderCompanies title="Lamp 1" onSearch={handleSearch} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('id')}>
              ID <SortArrow order="asc" active={order.column === 'id' && order.order === 'asc'} />
              <SortArrow order="desc" active={order.column === 'id' && order.order === 'desc'} />
            </TableHead>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              Name <SortArrow order="asc" active={order.column === 'name' && order.order === 'asc'} />
              <SortArrow order="desc" active={order.column === 'name' && order.order === 'desc'} />
            </TableHead>
            <TableHead onClick={() => handleSort('value')} className="cursor-pointer">
              Value <SortArrow order="asc" active={order.column === 'value' && order.order === 'asc'} />
              <SortArrow order="desc" active={order.column === 'value' && order.order === 'desc'} />
            </TableHead>
            <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer">
              Created at <SortArrow order="asc" active={order.column === 'createdAt' && order.order === 'asc'} />
              <SortArrow order="desc" active={order.column === 'createdAt' && order.order === 'desc'} />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((greenhouse, index) => (
            <TableRow key={greenhouse.id}>
              <TableCell>{greenhouse.id}</TableCell>
              <TableCell className="font-medium">{greenhouseNames[greenhouse.greenhouseId]}</TableCell>
              <TableCell className="font-medium">{greenhouse.value ? greenhouse.value : '0'} °C</TableCell>
              <TableCell className="font-medium">
                {greenhouse.createdAt ? new Date(greenhouse.createdAt).toLocaleDateString('en-US') : ''}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Dialog open={openModalEditIndex === index} onOpenChange={(isOpen) => setOpenModalEditIndex(isOpen ? index : null)}>
                    <DialogTrigger asChild>
                      <Button className="text-blue-700 hover:text-blue-900 bg-white hover:bg-gray-200">
                        <Edit />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Fan 1</DialogTitle>
                        <DialogDescription>Edit and configure your Fan 1</DialogDescription>
                      </DialogHeader>
                      <FormCreateCustomer greenhouseData={greenhouses[index]} setOpenModalCreate={() => setOpenModalEditIndex(null)} />
                    </DialogContent>
                  </Dialog>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteGreenhouse(greenhouse.id)}
                  >
                    <Trash />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}