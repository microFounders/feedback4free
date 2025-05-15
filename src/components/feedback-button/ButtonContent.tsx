import React from "react";
import IconSelector from "./IconSelector";

interface ButtonContentProps {
  icon: "message" | "help" | "flag" | "alert" | "info";
  label: string;
  showLabel: boolean;
}

const ButtonContent: React.FC<ButtonContentProps> = ({
  icon,
  label,
  showLabel,
}) => {
  return (
    <>
      <IconSelector icon={icon} className="h-5 w-5" />
      {showLabel && <span className="ml-2">{label}</span>}
    </>
  );
};

export default ButtonContent;
