"use client";

import { useMemo, useState } from "react";
import { HeaderCompanies } from "@/components/HeaderTable/HeaderCompanies";
import Paginate from "@/components/Pagination/Paginate";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { handleDownloadPDF } from "@/utils/pdfUtils";
import {
  GreenhouseForm,
  GreenhouseFormValues,
} from "@/components/Greenhouses";
import { Greenhouse, useGreenhouse } from "@/app/GreenhouseContext";

export default function GreenhousesPage() {
  const {
    greenhouses,
    refreshGreenhouses,
    setSelectedGreenhouseId,
  } = useGreenhouse();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingGreenhouse, setEditingGreenhouse] = useState<Greenhouse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const itemsPerPage = 10;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  const filteredGreenhouses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [...greenhouses];
    return greenhouses.filter((item) =>
      [
        item.name,
        item.country,
        item.phone,
        item.cif,
        item.website,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term))
    );
  }, [greenhouses, searchTerm]);

  const sortedGreenhouses = useMemo(() => {
    return [...filteredGreenhouses].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [filteredGreenhouses]);

  const totalItems = sortedGreenhouses.length;
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const page = Math.min(currentPage, totalPages);
  const start = (page - 1) * itemsPerPage;
  const currentItems = sortedGreenhouses.slice(start, start + itemsPerPage);

  const toInitialFormValues = (item: Greenhouse): Partial<GreenhouseFormValues> => ({
    name: item.name,
    country: item.country ?? "",
    phone: item.phone ?? "",
    cif: item.cif ?? "",
    website: item.website ?? "",
    profileImage: item.profileImage ?? "",
  });

  const resetState = () => {
    setActionError(null);
    setIsSubmitting(false);
  };

  const handleCreate = async (values: GreenhouseFormValues) => {
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL no configurada");
    }

    const response = await fetch(`${baseUrl}/greenhouses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error ?? "No se pudo crear el invernadero");
    }
    const list = await refreshGreenhouses();
    if (data && typeof data.id === "number" && list.some((item) => item.id === data.id)) {
      setSelectedGreenhouseId(data.id);
    }
    toast({ title: "Invernadero creado" });
    setIsCreateOpen(false);
  };

  const handleUpdate = async (id: number, values: GreenhouseFormValues) => {
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL no configurada");
    }

    const response = await fetch(`${baseUrl}/greenhouses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error ?? "No se pudo actualizar el invernadero");
    }

    await refreshGreenhouses();
    toast({ title: "Invernadero actualizado" });
    setEditingGreenhouse(null);
  };

  const handleDelete = async (id: number) => {
    if (!baseUrl) {
      toast({ title: "Falta configurar la API", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/greenhouses/${id}`, {
        method: "DELETE",
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error ?? "No se pudo eliminar el invernadero");
      }

      await refreshGreenhouses();
      toast({ title: "Invernadero eliminado" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo eliminar";
      setActionError(message);
      toast({ title: message, variant: "destructive" });
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const downloadPDF = (days: number, reportTitle: string) => {
    const pdfData = sortedGreenhouses.map((item) => ({
      id: item.id,
      greenhouseId: String(item.id),
      value: 0,
      createdAt: item.createdAt,
    }));

    const pdfNames = Object.fromEntries(
      sortedGreenhouses.map((item) => [String(item.id), item.name])
    );

    handleDownloadPDF(days, pdfData, pdfNames, reportTitle);
  };

  const openCreateDialog = () => {
    resetState();
    setIsCreateOpen(true);
    setEditingGreenhouse(null);
  };

  const openEditDialog = (record: Greenhouse) => {
    resetState();
    setEditingGreenhouse(record);
    setIsCreateOpen(false);
  };

  const closeDialogs = () => {
    resetState();
    setIsCreateOpen(false);
    setEditingGreenhouse(null);
  };

  return (
    <>
      <HeaderCompanies
        title="Greenhouses"
        onSearch={setSearchTerm}
        handleDownloadPDF={downloadPDF}
        onCreate={openCreateDialog}
        createLabel="Nuevo invernadero"
        isCreateDisabled={isSubmitting}
      />

      {actionError && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {actionError}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#1f1f1f] dark:bg-[#0a0a0a]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>CIF</TableHead>
              <TableHead>Sitio web</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-6 text-center text-sm text-muted-foreground">
                  {searchTerm ? "No se encontraron invernaderos con ese filtro." : "Aún no hay invernaderos registrados."}
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.country ?? "-"}</TableCell>
                  <TableCell>{item.phone ?? "-"}</TableCell>
                  <TableCell>{item.cif ?? "-"}</TableCell>
                  <TableCell>
                    {item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        {item.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => void handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Paginate
          currentPage={page}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          paginate={setCurrentPage}
        />
      </div>

  <Dialog open={isCreateOpen} onOpenChange={(open) => { if (!open) closeDialogs(); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuevo invernadero</DialogTitle>
            <DialogDescription>Registra un nuevo invernadero para asociarlo a los datos de sensores.</DialogDescription>
          </DialogHeader>
          <GreenhouseForm
            onSubmit={async (values) => {
              setIsSubmitting(true);
              try {
                await handleCreate(values);
              } catch (error) {
                const message =
                  error instanceof Error ? error.message : "No se pudo crear el invernadero";
                setActionError(message);
                toast({ title: message, variant: "destructive" });
              } finally {
                setIsSubmitting(false);
              }
            }}
            onCancel={closeDialogs}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

  <Dialog open={!!editingGreenhouse} onOpenChange={(open) => { if (!open) closeDialogs(); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar invernadero</DialogTitle>
            <DialogDescription>Modifica la información del invernadero seleccionado.</DialogDescription>
          </DialogHeader>
          {editingGreenhouse && (
            <GreenhouseForm
              initialData={toInitialFormValues(editingGreenhouse)}
              onSubmit={async (values) => {
                setIsSubmitting(true);
                try {
                  await handleUpdate(editingGreenhouse.id, values);
                } catch (error) {
                  const message =
                    error instanceof Error ? error.message : "No se pudo actualizar el invernadero";
                  setActionError(message);
                  toast({ title: message, variant: "destructive" });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              onCancel={closeDialogs}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
