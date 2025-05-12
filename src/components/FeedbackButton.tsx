import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Flag,
  HelpCircle,
  Info,
  MessageSquare,
} from "lucide-react";
import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";

interface FeedbackButtonProps {
  slackWebhookUrl: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  color?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  icon?: "message" | "help" | "flag" | "alert" | "info";
  animate?: boolean;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  slackWebhookUrl,
  position = "bottom-right",
  color = "default",
  icon = "message",
  animate = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  // Icon selector
  const IconComponent = () => {
    switch (icon) {
      case "help":
        return <HelpCircle className="h-5 w-5" />;
      case "flag":
        return <Flag className="h-5 w-5" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      case "message":
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  // Animation class (only apply if animate is true)
  const animationClass = animate ? "animate-pulse-slow" : "";

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 ${positionClasses[position]} rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 ${animationClass}`}
        variant={color}
        aria-label="Send feedback"
      >
        <IconComponent />
      </Button>

      {isOpen && (
        <FeedbackForm
          onClose={() => setIsOpen(false)}
          slackWebhookUrl={slackWebhookUrl}
        />
      )}
    </>
  );
};

export default FeedbackButton;
