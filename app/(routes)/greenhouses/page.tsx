"use client";
import React, { useState, useEffect } from 'react';
import { HeaderCompanies } from '@/components/HeaderTable/HeaderCompanies';
import { toast } from "@/components/ui/use-toast";
import jsPDF from 'jspdf'; // Importa jsPDF
import 'jspdf-autotable'; // Importa el plugin autotable
import Paginate from '@/components/Pagination/Paginate';
import GreenhouseTable from '@/components/Tables/GreenHouseTable';
import { FormCreateCustomer } from '@/components/FormCreateCustomer';
import { handleDownloadPDF } from '@/utils/pdfUtils';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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



  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Search term:", term);
  };



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedGreenhouses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const downloadPDF = (days: number) => {
    handleDownloadPDF(days, sortedGreenhouses, greenhouseNames, "Greenhouses");
  };

  return (
    <>
      <HeaderCompanies title="Greenhouses" onSearch={handleSearch} handleDownloadPDF={downloadPDF} />

      <GreenhouseTable
        currentItems={currentItems}
        setOpenModalEditIndex={setOpenModalEditIndex}
        handleSort={handleSort}
        deleteGreenhouse={deleteGreenhouse}
      />

      <Paginate
        currentPage={currentPage}
        totalItems={sortedGreenhouses.length}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
    </>
  );
}