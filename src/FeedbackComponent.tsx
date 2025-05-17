import React from "react";
import FeedbackButton from "./components/FeedbackButton";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import "./index.css";

// Export the main component
export const FeedbackComponent: React.FC<{
  slackWebhookUrl?: string;
  webhookUrl?: string;
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
  size?: "sm" | "default" | "lg";
  label?: string;
  showLabel?: boolean;
  rounded?: "full" | "md";
  userEmail?: string;
  integrationType?: "slack" | "webhook";
}> = ({
  slackWebhookUrl,
  webhookUrl,
  position,
  color,
  icon,
  animate,
  size,
  label,
  showLabel,
  rounded,
  userEmail,
  integrationType,
}) => {
  return (
    <ThemeProvider defaultTheme="system">
      <Toaster />
      <FeedbackButton
        slackWebhookUrl={slackWebhookUrl}
        webhookUrl={webhookUrl}
        position={position}
        color={color}
        icon={icon}
        animate={animate}
        size={size}
        label={label}
        showLabel={showLabel}
        rounded={rounded}
        userEmail={userEmail}
        integrationType={integrationType}
      />
    </ThemeProvider>
  );
};

// Export individual components for more flexibility
export { default as FeedbackButton } from "./components/FeedbackButton";

// Default export for easier importing
export default FeedbackComponent;
