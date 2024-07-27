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
    fetch(`${apiUrl}/api/greenhouses/`)
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
      const response = await fetch(`${apiUrl}/api/greenhouses/${id}`, {
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


  return (
    <>
      <HeaderCompanies title="List of Humidities" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>CIF</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {greenhouses.map(greenhouse => (
            <TableRow key={greenhouse.id}>
          

              <TableCell>{greenhouse.id}</TableCell>
              <TableCell className="font-medium">{greenhouse.name}</TableCell>
              <TableCell>{greenhouse.country}</TableCell>
              <TableCell>{greenhouse.phone}</TableCell>
              <TableCell>{greenhouse.website}</TableCell>
              <TableCell>{greenhouse.cif}</TableCell>
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