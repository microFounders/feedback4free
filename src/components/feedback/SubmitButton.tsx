import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import React from "react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <Button
      type="submit"
      className="w-full h-10 text-sm"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Feedback
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
