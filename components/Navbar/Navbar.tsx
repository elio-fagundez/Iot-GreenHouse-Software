import { useGreenhouse } from '@/app/GreenhouseContext'; // Asegúrate de ajustar la ruta
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";
import { ToggleTheme } from "../ToggleTheme";
import Select from 'react-select';
import { setCookie } from 'nookies';

interface Greenhouse {
  id: number;
  name: string;
}

interface NavbarProps {
  greenhouses: Greenhouse[];
}

export default function Navbar({ greenhouses }: NavbarProps) {
  const { setSelectedGreenhouse } = useGreenhouse();

  const options = Array.isArray(greenhouses) ? greenhouses.map(greenhouse => ({
    value: greenhouse.id,
    label: greenhouse.name,
  })) : [];

  const handleChange = (selectedOption: any) => {
    setSelectedGreenhouse(selectedOption);
    setCookie(null, 'selectedGreenhouse', selectedOption.value, {
      maxAge: 30 * 24 * 60 * 60, // 30 días
      path: '/',
    });
  };



  return (
    <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between bg-background border-b h-20">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>

      <div className="relative w-[300px]">
        <div className="flex">
          <Select
            options={options}
            placeholder="Select Green House"
            className="w-full p-2 rounded-lg z-50"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex gap-x-2 items-center">
        <ToggleTheme />
        <UserButton />
      </div>
    </nav>
  );
}