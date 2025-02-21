import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormCreateCustomer } from "../FormCreateCustomer";

interface Sensor {
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

interface SensorTableProps {
  currentItems: Sensor[];
  handleSort: (column: keyof Sensor | "name") => void;
  deleteSensor: (id: number) => void;
  title: string;
}

const SensorTable: React.FC<SensorTableProps> = ({
  currentItems,
  handleSort,
  deleteSensor,
  title,
}) => {
  const [openModalEditIndex, setOpenModalEditIndex] = useState<number | null>(
    null
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {currentItems.some((item) => item.id) && (
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID
            </TableHead>
          )}

            <TableHead
              onClick={() => handleSort("value")}
              className="cursor-pointer"
            >
              Value
            </TableHead>
       
          {currentItems.some((item) => item.createdAt) && (
            <TableHead
              onClick={() => handleSort("createdAt")}
              className="cursor-pointer"
            >
              Created at
            </TableHead>
          )}
      
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentItems.map((sensor, index) => (
          <TableRow key={sensor.id}>
            <TableCell>{sensor.id}</TableCell>
            <TableCell>{sensor.value ?? "N/A"}</TableCell>

            <TableCell>
              {sensor.createdAt
                ? new Date(sensor.createdAt).toLocaleString("en-US")
                : "N/A"}
            </TableCell>

  
            <TableCell>
              <Dialog
                open={openModalEditIndex === index}
                onOpenChange={(isOpen) =>
                  setOpenModalEditIndex(isOpen ? index : null)
                }
              >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit {title}</DialogTitle>
                    <DialogDescription>
                      Edit and configure your {title}
                    </DialogDescription>
                  </DialogHeader>
                  <FormCreateCustomer
                    data={currentItems[index]}
                    setOpenModalCreate={() => setOpenModalEditIndex(null)}
                  />
                </DialogContent>
              </Dialog>
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => setOpenModalEditIndex(index)}
                  className="bg-green-300 h-8 w-8 rounded"
                  style={{ color: "black" }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>

                <button
                  onClick={() => deleteSensor(sensor.id)}
                  className="bg-red-600 h-8 w-8 rounded"
                  style={{ color: "white" }}
                >
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

export default SensorTable;
