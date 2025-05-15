import { FeedbackFormData } from "@/types/feedback";
import React from "react";
import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form";
import FeedbackTypeSelector from "./FeedbackTypeSelector";
import FormField from "./FormField";
import ScreenshotUpload from "./ScreenshotUpload";
import SubmitButton from "./SubmitButton";

interface FeedbackFormContentProps {
  register: UseFormRegister<FeedbackFormData>;
  formState: FormState<FeedbackFormData>;
  watch: UseFormWatch<FeedbackFormData>;
  isSubmitting: boolean;
  defaultEmail?: string;
  screenshot: File | null;
  handleScreenshotChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeScreenshot: () => void;
}

const FeedbackFormContent: React.FC<FeedbackFormContentProps> = ({
  register,
  formState,
  watch,
  isSubmitting,
  defaultEmail,
  screenshot,
  handleScreenshotChange,
  removeScreenshot,
}) => {
  const { errors } = formState;
  const currentType = watch("type") || "issue";

  const feedbackTypes = [
    {
      value: "issue",
      label: "Issue",
      description: "Report a bug or problem",
    },
    {
      value: "suggestion",
      label: "Suggestion",
      description: "Share your ideas",
    },
    {
      value: "question",
      label: "Question",
      description: "Ask about something",
    },
    {
      value: "other",
      label: "Other",
      description: "Something else",
    },
  ];

  return (
    <div className="space-y-4">
      <FeedbackTypeSelector
        currentType={currentType}
        register={register}
        feedbackTypes={feedbackTypes}
      />

      <FormField
        id="email"
        label="Your email"
        type="email"
        placeholder="email@example.com"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={errors.email}
        disabled={!!defaultEmail}
        helpText={defaultEmail ? "Using your account email" : undefined}
      />

      <FormField
        id="subject"
        label="Subject"
        placeholder="Brief description"
        register={register("subject", { required: "Subject is required" })}
        error={errors.subject}
      />

      <FormField
        id="message"
        label="Message"
        type="textarea"
        placeholder="Please provide details..."
        register={register("message", { required: "Message is required" })}
        error={errors.message}
      />

      <ScreenshotUpload
        screenshot={screenshot}
        onScreenshotChange={handleScreenshotChange}
        onRemoveScreenshot={removeScreenshot}
      />

      <SubmitButton isSubmitting={isSubmitting} />
    </div>
  );
};

export default FeedbackFormContent;
