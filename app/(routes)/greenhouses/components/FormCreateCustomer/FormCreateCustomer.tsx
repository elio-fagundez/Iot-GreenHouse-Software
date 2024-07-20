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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UploadButton } from "@uploadthing/react"
import { toast } from "@/components/ui/use-toast"

interface FormCreateCustomerProps {
  setOpenModalCreate: (open: boolean) => void;
  greenhouseData: any;
}

const formSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(6),
  cif: z.string().min(6),
  profileImage: z.string(),
})


export const FormCreateCustomer: React.FC<FormCreateCustomerProps> = ({ setOpenModalCreate, greenhouseData }) => {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  console.log("greenhouseData", greenhouseData);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: greenhouseData?.name || "",
      country: greenhouseData?.country || "",
      website: greenhouseData?.website || "",
      phone: greenhouseData?.phone || "",
      cif: greenhouseData?.cif || "",
      profileImage: greenhouseData?.profileImage || "",
    },
  })

  const { isValid } = form.formState
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let url = `${apiUrl}/api/greenhouses/`;
    let method = 'POST';
    let successMessage = "Green House created successfully";

    // Si greenhouseData existe, cambiar a PUT y ajustar la URL y el mensaje de éxito
    if (greenhouseData && greenhouseData.id) {
      url = `${apiUrl}/api/greenhouses/${greenhouseData.id}`;
      method = 'PUT';
      successMessage = "Green House updated successfully";
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

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
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
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="united-kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="united-states">
                        United States
                      </SelectItem>
                    </SelectContent>

                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="www.greenhouse.com" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 123456789" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="col-span-2 gap-y-4">
            <FormField
              control={form.control}
              name="cif"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Code" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 py-2">

            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    {photoUploaded ? (<p>Image Uploaded!!</p>) : (
                      <UploadButton
                        className="bg-slate-600/20 text-slate-800 rounded-lg 
                        outline-dotted outline-3"
                        {...field}
                        endpoint="profileImage"
                        onClientUploadComplete={(res: { url: string }[]) => {
                          form.setValue("profileImage", res?.[0].url);
                          toast({
                            title: "Photo Uploaded",
                          });
                          setPhotoUploaded(true);
                        }}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast({
                            title: "Error uploading image",
                          });


                        }}
                      />
                    )}


                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={!isValid}>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
