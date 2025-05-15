import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import React from "react";

interface ScreenshotUploadProps {
  screenshot: File | null;
  onScreenshotChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveScreenshot: () => void;
}

const ScreenshotUpload: React.FC<ScreenshotUploadProps> = ({
  screenshot,
  onScreenshotChange,
  onRemoveScreenshot,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="screenshot" className="text-sm">
        Screenshot (optional)
      </Label>
      {!screenshot ? (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="screenshot"
            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-3 pb-3">
              <Upload className="w-6 h-6 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Click to upload</span> or drag and
                drop
              </p>
            </div>
            <input
              id="screenshot"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onScreenshotChange}
            />
          </label>
        </div>
      ) : (
        <div className="relative border rounded-md p-3 flex items-center">
          <div className="flex-1 truncate">
            <p className="text-sm font-medium">{screenshot.name}</p>
            <p className="text-xs text-muted-foreground">
              {(screenshot.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemoveScreenshot}
            className="h-8 w-8 p-0 ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScreenshotUpload;
