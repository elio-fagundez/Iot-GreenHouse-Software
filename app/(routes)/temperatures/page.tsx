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
import { Trash, Edit, CirclePlus, FileText } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormCreateCustomer } from './components/FormCreateCustomer';
import { Button } from '@/components/ui/button';
import { useGreenhouse } from '@/app/GreenhouseContext';
import jsPDF from 'jspdf'; // Importa jsPDF
import 'jspdf-autotable'; // Importa el plugin autotable

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

  const { selectedGreenhouse } = useGreenhouse();

  console.log("selectedGreenhouse", selectedGreenhouse);

  const greenHouse = (selectedGreenhouse as any)?.value || 1;
  console.log("greenHouse", greenHouse);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/api/temperatures/${greenHouse}`)
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
  }, [greenHouse]);

  const deleteGreenhouse = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/temperatures/${id}`, {
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // Agrega el título
    doc.text('Temperature Report', 14, 20);
  
    // Datos de la tabla
    const data = filteredItems.map((greenhouse) => [
      greenhouse.id,
      greenhouseNames[greenhouse.greenhouseId],
      greenhouse.value ? `${greenhouse.value} °C` : '0 °C',
      greenhouse.createdAt ? new Date(greenhouse.createdAt).toLocaleDateString('en-US') : '',
    ]);
  
    // Genera la tabla en el PDF
    doc.autoTable({
      startY: 30, // Ajusta la posición de inicio de la tabla para que no se superponga con el título
      head: [['ID', 'Name', 'Value', 'Created at']],
      body: data,
    });
  
    // Guarda el PDF
    doc.save('temperature-report.pdf');
  };

  return (
    <>
      <div className="flex items-center justify-end gap-x-4 mb-4">
        <div>
          <Button><CirclePlus strokeWidth={2} className='w-3 h-3 mr-2' /> Create Green House </Button>
        </div>
        <Button onClick={handleDownloadPDF} className='ml-4'><FileText strokeWidth={2} className='w-3 h-3 mr-2' /> Download Report</Button>
      </div>
      <HeaderCompanies title="Temperatures" onSearch={handleSearch} />

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
              <TableCell className="my-4 bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">{greenhouseNames[greenhouse.greenhouseId]}</TableCell>
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
                        <DialogTitle>Edit Temperature</DialogTitle>
                        <DialogDescription>Edit and configure your Temperature</DialogDescription>
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