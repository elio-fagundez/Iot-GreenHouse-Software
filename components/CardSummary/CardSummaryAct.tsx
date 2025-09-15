import React from "react";
import { CardSummaryProps } from "./CardSummary.types";
import { CustomIcon } from "@/components/CustomIcon/CustomIcon";
import { CustomTooltip } from "@/components/CustomTooltip";
import Switch from "react-switch";

// Extendemos las props para incluir una función que notifique los cambios al componente padre
interface ExtendedCardSummaryProps extends CardSummaryProps {
  onStateChange: (id: string, value: "0" | "1") => void;
}

export function CardSummaryAct(props: ExtendedCardSummaryProps) {
  const { icon: Icon, title, total, tooltipText, onStateChange } = props;
  const commandId = title.replace(/\s+/g, "");
  // El estado del switch ahora es controlado directamente por las props (total)
  const isSwitchOn = total === "1";

  const handleSwitchChange = async (
    checked: boolean,
    event: React.MouseEvent<Element> | React.ChangeEvent<Element>,
    id: string
  ) => {
    const newValue = checked ? "1" : "0";
    // Llamamos a la función del padre para que actualice el estado centralizado.
    // El padre será ahora el responsable de hacer la llamada a la API.
    onStateChange(id, newValue);
  };

  return (
    <div
      className={`shadow-sm rounded-lg h-32 p-5 py-3 hover:shadow-lg transition text-white cursor-pointer bg-[#3a414a]`}
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">{title}</div>
        <CustomTooltip content={tooltipText} />
        <CustomIcon icon={Icon} />
      </div>
      <div className="flex gap-4 mt-2 md:mt-4">
        <p className="text-2xl">
          <Switch
            id={commandId}
            onChange={handleSwitchChange}
            checked={isSwitchOn}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
          />
        </p>
      </div>
    </div>
  );
}
