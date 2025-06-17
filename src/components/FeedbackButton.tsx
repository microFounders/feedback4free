import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ButtonContent from "./feedback-button/ButtonContent";
import { FeedbackButtonProps } from "./feedback-button/FeedbackButtonProps";
import FeedbackForm from "./FeedbackForm";

function getPositionStyles(
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
): React.CSSProperties {
  const positions: Record<typeof position, React.CSSProperties> = {
    "bottom-right": { bottom: "1.5rem", right: "1.5rem" },
    "bottom-left": { bottom: "1.5rem", left: "1.5rem" },
    "top-right": { top: "1.5rem", right: "1.5rem" },
    "top-left": { top: "1.5rem", left: "1.5rem" },
  };

  return positions[position];
}

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

  // Use the passed userEmail if provided, otherwise use the email from auth state
  const effectiveEmail = userEmail || "";

  const animationClass = animate ? "f4f-animate-pulse-slow" : "";

  return (
    <>
      <div
        className="f4f-fixed f4f-z-[9999] f4f-min-w-max"
        style={{
          position: "fixed",
          ...getPositionStyles(position),
        }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className={`f4f-shadow-lg hover:f4f-shadow-xl f4f-transition-all f4f-duration-300 ${animationClass} ${
            showLabel ? "f4f-px-4" : "f4f-p-3"
          }`}
          variant={color}
          size={showLabel ? size : "icon"}
          rounded={rounded}
          aria-label={label}
        >
          <ButtonContent icon={icon} label={label} showLabel={showLabel} />
        </Button>
      </div>

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
