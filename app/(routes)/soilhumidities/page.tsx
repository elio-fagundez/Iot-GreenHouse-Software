"use client"
import React, { useState, useEffect } from 'react';
import { HeaderCompanies } from './components/HeaderCompanies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash, Edit, CirclePlus } from 'lucide-react';
import { toast } from "@/components/ui/use-toast"
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormCreateCustomer } from './components/FormCreateCustomer';
import { Button } from '@/components/ui/button';

export default function Page() {
  interface Greenhouse {
    country: string;
    phone: string;
    cif: string;
    id: number;
    name: string;
    website: string;
    profileImage: string;
  }

  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/api/soilhumidities/`)
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

  const [openModalEdit, setOpenModalEdit] = useState(false);

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
      setError(error as any);
      toast({
        title: "The greenhouse has error",

      });
    }
  };

  // const handleEditGreenhouse = (greenhouse) => {
  //   setSelectedGreenhouse(greenhouse);
  //   setOpenModalEdit(true);
  // };


  const [greenhouseNames, setGreenhouseNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchGreenhouseNames = async () => {
      const names: { [key: string]: string } = {};
      for (const greenhouse of greenhouses) {
        console.log("greenhouse", greenhouse);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
          // Reemplaza esta URL con la URL de tu API o lógica para obtener el nombre del invernadero
          const response = await fetch(`${apiUrl}/api/greenhouses/${greenhouse?.greenhouseId}`);
          console.log("greenhouse response", response);

          // Verifica si la respuesta es JSON
          const contentType = response.headers.get("content-type");
          if (response.status === 404) {
            console.error(`Error 404: El invernadero con ID ${greenhouse?.greenhouseId} no fue encontrado.`);
          } else if (contentType && contentType.includes("application/json")) {
            const data: Greenhouse = await response.json();
            console.log("greenhouse data", data);

            names[greenhouse?.greenhouseId] = data.name;
          } else {
            const text = await response.text(); // Lee el contenido de la respuesta como texto
            console.error('Error: La respuesta no es JSON', {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
              body: text,
            });
          }

          console.log("names", names);
        } catch (error) {
          console.error('Error fetching greenhouse name:', error);
        }
      }
      setGreenhouseNames(names);
    };

    fetchGreenhouseNames();
  }, [greenhouses]);


  return (
    <>
      <HeaderCompanies title="List of Soil Humidities" />

      <Table>
      <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Created at</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {greenhouses.map(greenhouse => (
            <TableRow key={greenhouse.id}>


              <TableCell>{greenhouse.id}</TableCell>
              <TableCell className="font-medium">{greenhouseNames[greenhouse.greenhouseId]}</TableCell>

              <TableCell className="font-medium">{greenhouse?.value ? greenhouse?.value : '0'} %</TableCell>
              <TableCell className="font-medium">
                {greenhouse?.createdAt ? new Date(greenhouse.createdAt).toLocaleDateString('en-US') : ''}
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-2">

                  <Dialog open={openModalEdit} onOpenChange={setOpenModalEdit}>
                    <DialogTrigger asChild>
                      <Button className="text-blue-700 hover:text-blue-900 bg-white hover:bg-gray-200" ><Edit /> </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Green House</DialogTitle>
                        <DialogDescription>Edit and configure your Green House</DialogDescription>
                      </DialogHeader>
                      <FormCreateCustomer greenhouseData={greenhouse.id} setOpenModalCreate={setOpenModalEdit} />
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