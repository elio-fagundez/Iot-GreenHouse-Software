"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

import { toast } from "@/components/ui/use-toast"

interface FormCreateCustomerProps {
  setOpenModalCreate: (open: boolean) => void;
  greenhouseData: any;
}

const formSchema = z.object({
  id: z.string().min(1),
  value: z.string().min(1),
  createdAt: z.string().min(2),
  updatedAt: z.string().min(2),
  greenhouseId: z.string().min(1),
})


export const FormCreateCustomer: React.FC<FormCreateCustomerProps> = ({ setOpenModalCreate, greenhouseData }) => {
  console.log("greenhouseData", greenhouseData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: greenhouseData?.id || "",
      value: greenhouseData?.value || "",
      createdAt: greenhouseData?.createdAt || "",
      updatedAt: greenhouseData?.updatedAt || "",
      greenhouseId: greenhouseData?.greenhouseId || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let url = `${apiUrl}/api/humidities/`;
      let method = 'POST';
      let successMessage = "Temperature created successfully";

      // Si greenhouseData existe, cambiar a PUT y ajustar la URL y el mensaje de éxito
      if (greenhouseData && greenhouseData.id) {
        url = `${apiUrl}/api/humidities/${greenhouseData.id}`;
        method = 'PUT';
        successMessage = "Temperature updated successfully";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      setOpenModalCreate(false);
      toast({
        title: successMessage,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error creating/updating Green House",
      });
    }
  }
  const [inputValue, setInputValue] = useState('');




  return (
    <div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Value"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setInputValue(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-4">
            <Button type="submit" disabled={!inputValue}>Submit</Button>

          </div>
        </form>
      </Form>
    </div>
  )
}
