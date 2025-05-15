import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FeedbackFormData } from "@/types/feedback";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FeedbackType {
  value: string;
  label: string;
  description: string;
}

interface FeedbackTypeSelectorProps {
  currentType: string;
  register: UseFormRegister<FeedbackFormData>;
  feedbackTypes: FeedbackType[];
}

const FeedbackTypeSelector: React.FC<FeedbackTypeSelectorProps> = ({
  currentType,
  register,
  feedbackTypes,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm">What kind of feedback do you have?</Label>
      <RadioGroup
        defaultValue="issue"
        className="grid grid-cols-2 gap-2"
        {...register("type")}
      >
        {feedbackTypes.map((type) => (
          <Label
            key={type.value}
            htmlFor={`type-${type.value}`}
            className={`flex flex-col items-start p-3 border rounded-md cursor-pointer transition-all text-sm
              ${
                currentType === type.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:bg-muted"
              }`}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={type.value}
                id={`type-${type.value}`}
                className="h-4 w-4 data-[state=checked]:border-primary data-[state=checked]:text-primary"
              />
              <span className="font-medium">{type.label}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 ml-6">
              {type.description}
            </span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FeedbackTypeSelector;
