import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  register: any;
  error?: { message?: string };
  disabled?: boolean;
  helpText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  disabled,
  helpText,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          rows={4}
          {...register}
          className={`text-sm min-h-[100px] ${
            error ? "border-destructive" : ""
          }`}
          disabled={disabled}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className={`h-10 text-sm ${error ? "border-destructive" : ""}`}
          disabled={disabled}
        />
      )}
      {error && <p className="text-xs text-destructive">{error.message}</p>}
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  );
};

export default FormField;
