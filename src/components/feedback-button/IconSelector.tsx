import {
  AlertTriangle,
  Flag,
  HelpCircle,
  Info,
  MessageSquare,
} from "lucide-react";
import React from "react";

type FeedbackIconType = "message" | "help" | "flag" | "alert" | "info";

interface IconSelectorProps {
  icon: FeedbackIconType;
  className?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  icon,
  className = "",
}) => {
  switch (icon) {
    case "help":
      return <HelpCircle className={className} />;
    case "flag":
      return <Flag className={className} />;
    case "alert":
      return <AlertTriangle className={className} />;
    case "info":
      return <Info className={className} />;
    case "message":
    default:
      return <MessageSquare className={className} />;
  }
};

export default IconSelector;
