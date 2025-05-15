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

  const { register, handleSubmit, watch, formState, reset, setValue } =
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
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Card className="w-full max-w-md relative overflow-hidden animate-scale-in shadow-xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-6 w-6 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-3 w-3" />
        </Button>
        <ScrollArea className="h-[85vh] max-h-[600px]">
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Send Feedback</h2>
            <p className="text-muted-foreground text-sm mb-4">
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
