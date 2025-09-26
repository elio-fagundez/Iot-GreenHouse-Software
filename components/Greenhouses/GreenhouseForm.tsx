"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const greenhouseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre es obligatorio"),
  country: z
    .string()
    .trim()
    .min(2, "El país es obligatorio"),
  phone: z
    .string()
    .trim()
    .min(5, "El teléfono es obligatorio"),
  cif: z
    .string()
    .trim()
    .min(3, "El CIF es obligatorio"),
  website: z
    .string()
    .trim()
    .min(3, "El sitio web es obligatorio"),
  profileImage: z
    .string()
    .trim()
    .optional(),
});

export type GreenhouseFormValues = z.infer<typeof greenhouseSchema>;

const DEFAULT_IMAGE = "https://placehold.co/600x400?text=Greenhouse";

interface GreenhouseFormProps {
  initialData?: Partial<GreenhouseFormValues>;
  onSubmit: (values: GreenhouseFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function GreenhouseForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: GreenhouseFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<GreenhouseFormValues>({
    resolver: zodResolver(greenhouseSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      country: initialData?.country ?? "",
      phone: initialData?.phone ?? "",
      cif: initialData?.cif ?? "",
      website: initialData?.website ?? "",
      profileImage: initialData?.profileImage ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: initialData?.name ?? "",
      country: initialData?.country ?? "",
      phone: initialData?.phone ?? "",
      cif: initialData?.cif ?? "",
      website: initialData?.website ?? "",
      profileImage: initialData?.profileImage ?? "",
    });
    setSubmitError(null);
  }, [initialData, form]);

  const handleSubmit = async (values: GreenhouseFormValues) => {
    setSubmitError(null);
    try {
      const payload: GreenhouseFormValues = {
        ...values,
        name: values.name.trim(),
        country: values.country.trim(),
        phone: values.phone.trim(),
        cif: values.cif.trim(),
        website: values.website.trim(),
        profileImage: values.profileImage?.trim() || DEFAULT_IMAGE,
      };
      await onSubmit(payload);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo guardar el invernadero";
      setSubmitError(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del invernadero" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input placeholder="País" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Teléfono" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIF</FormLabel>
                <FormControl>
                  <Input placeholder="CIF" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Sitio web</FormLabel>
                <FormControl>
                  <Input placeholder="https://tu-invernadero.com" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Imagen (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-gray-200" />

        {submitError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
