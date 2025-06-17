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
      <IconSelector icon={icon} className="f4f-h-5 f4f-w-5" />
      {showLabel && <span className="f4f-ml-2">{label}</span>}
    </>
  );
};

export default ButtonContent;
