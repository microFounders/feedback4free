import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import ButtonContent from "./feedback-button/ButtonContent";
import { FeedbackButtonProps } from "./feedback-button/FeedbackButtonProps";
import { getPositionClasses } from "./feedback-button/PositionClasses";
import FeedbackForm from "./FeedbackForm";

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  slackWebhookUrl = "",
  webhookUrl = "",
  position = "bottom-right",
  color = "default",
  icon = "message",
  animate = false,
  size = "default",
  label = "Feedback",
  showLabel = false,
  rounded = "full",
  userEmail,
  integrationType = "slack",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  // Use the passed userEmail if provided, otherwise use the email from auth state
  const effectiveEmail = userEmail || "";

  const positionClass = getPositionClasses(position);
  const animationClass = animate ? "animate-pulse-slow" : "";
  const roundedClass = rounded === "full" ? "rounded-full" : "rounded-md";

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 ${positionClass} ${roundedClass} shadow-lg hover:shadow-xl transition-all duration-300 ${animationClass} ${
          showLabel ? "px-4" : "p-3"
        }`}
        variant={color}
        size={showLabel ? size : "icon"}
        aria-label={label}
      >
        <ButtonContent icon={icon} label={label} showLabel={showLabel} />
      </Button>

      {isOpen && (
        <FeedbackForm
          onClose={() => setIsOpen(false)}
          slackWebhookUrl={slackWebhookUrl}
          webhookUrl={webhookUrl}
          defaultEmail={effectiveEmail}
          integrationType={integrationType}
        />
      )}
    </>
  );
};

export default FeedbackButton;
