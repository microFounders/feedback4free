import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FeedbackFormContent from "./feedback/FeedbackFormContent";

import {
  sendFeedbackToSlack,
  sendFeedbackToWebhook,
} from "@/services/feedback-service";
import { FeedbackFormData } from "@/types/feedback";

interface FeedbackFormProps {
  onClose: () => void;
  slackWebhookUrl: string;
  webhookUrl?: string;
  defaultEmail?: string;
  integrationType?: "slack" | "webhook";
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onClose,
  slackWebhookUrl,
  webhookUrl,
  defaultEmail,
  integrationType = "slack",
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const { register, handleSubmit, watch, formState, reset } =
    useForm<FeedbackFormData>({
      defaultValues: {
        type: "issue",
        email: defaultEmail || "",
        subject: "",
        message: "",
      },
    });

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleScreenshotChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setScreenshot(file);
  };

  const removeScreenshot = () => {
    setScreenshot(null);
  };

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      setIsSubmitting(true);

      const feedbackData: FeedbackFormData = {
        type: data.type || "issue",
        email: data.email || "",
        subject: data.subject || "",
        message: data.message || "",
        screenshot,
      };

      // Choose the right service based on integration type
      if (integrationType === "webhook" && webhookUrl) {
        await sendFeedbackToWebhook(feedbackData, webhookUrl);
      } else {
        await sendFeedbackToSlack(feedbackData, slackWebhookUrl);
      }

      toast({
        title: "Feedback Sent",
        description: "Thank you for your feedback!",
        duration: 5000,
      });

      reset();
      setScreenshot(null);
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="f4f-fixed f4f-inset-0 f4f-bg-black/30 f4f-backdrop-blur-sm f4f-z-50 f4f-flex f4f-items-center f4f-justify-center f4f-p-4 f4f-animate-fade-in"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
      }}
    >
      <Card className="f4f-w-full f4f-max-w-md f4f-relative f4f-overflow-hidden f4f-animate-scale-in f4f-shadow-xl">
        <Button
          variant="ghost"
          size="icon"
          className="f4f-absolute f4f-right-2 f4f-top-2 f4f-h-6 f4f-w-6 f4f-z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="f4f-h-3 f4f-w-3" />
        </Button>
        <ScrollArea className="f4f-h-[85vh] f4f-max-h-[600px]">
          <div className="f4f-p-6">
            <h2 className="f4f-text-xl f4f-font-medium f4f-mb-2">
              Send Feedback
            </h2>
            <p className="f4f-text-muted-foreground f4f-text-sm f4f-mb-4">
              We'd love to hear from you
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FeedbackFormContent
                register={register}
                formState={formState}
                watch={watch}
                isSubmitting={isSubmitting}
                defaultEmail={defaultEmail}
                screenshot={screenshot}
                handleScreenshotChange={handleScreenshotChange}
                removeScreenshot={removeScreenshot}
              />
            </form>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default FeedbackForm;
