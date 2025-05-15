import React from "react";
import FeedbackButton from "./components/FeedbackButton";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import "./index.css";

// Export the main component
export const FeedbackComponent: React.FC<{
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
}> = ({ slackWebhookUrl, position, color, icon, animate }) => {
  return (
    <ThemeProvider defaultTheme="system">
      <Toaster />
      <FeedbackButton
        slackWebhookUrl={slackWebhookUrl}
        position={position}
        color={color}
        icon={icon}
        animate={animate}
      />
    </ThemeProvider>
  );
};

// Export individual components for more flexibility
export { default as FeedbackButton } from "./components/FeedbackButton";

// Default export for easier importing
export default FeedbackComponent;
