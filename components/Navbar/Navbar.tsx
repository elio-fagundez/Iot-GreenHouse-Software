import { useMemo, useEffect } from "react";
import { useGreenhouse } from "@/app/GreenhouseContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";
import { ToggleTheme } from "../ToggleTheme";
import Select from "react-select";
import { logout } from "@/src/utils/logout";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const {
    greenhouses,
    loading,
    selectedGreenhouseId,
    setSelectedGreenhouseId,
  } = useGreenhouse();

  const options = useMemo(
    () =>
      greenhouses.map((greenhouse) => ({
        value: greenhouse.id,
        label: greenhouse.name,
      })),
    [greenhouses]
  );

  const selectedOption = useMemo(() => {
    if (!selectedGreenhouseId) return null;
    return options.find((option) => option.value === selectedGreenhouseId) ?? null;
  }, [options, selectedGreenhouseId]);

  useEffect(() => {
    if (options.length === 0) return;
    if (selectedOption) return;
    setSelectedGreenhouseId(options[0].value);
  }, [options, selectedOption, setSelectedGreenhouseId]);

  const handleChange = (selectedOption: any) => {
    const nextValue = selectedOption?.value ?? null;
    setSelectedGreenhouseId(nextValue);
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

      <div className="relative w-[300px] dark:bg-[#050b1b] dark:text-white">
        <div className="flex ">
          <Select
            options={options}
            placeholder="Select Green House"
            className="w-full p-2 rounded-lg z-50 dark:bg-[#050b1b] dark:text-white"
            onChange={handleChange}
            value={selectedOption}
            isLoading={loading}
            isClearable={false}
            instanceId="greenhouse-select"
          />
        </div>
      </div>
      <div className="flex gap-x-2 items-center">
        <ToggleTheme />
  <Button onClick={() => void logout()} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
}