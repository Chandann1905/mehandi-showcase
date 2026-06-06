"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { UploadCloud, X, File as FileIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface FileUploadProps {
  value?: string;
  onChange: (file?: File) => void;
  onRemove?: () => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
  isUploading?: boolean;
  progress?: number;
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  accept = { "image/*": [] },
  maxSize = 10 * 1024 * 1024,
  className,
  disabled = false,
  isUploading = false,
  progress = 0,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  // Sync external value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setPreview(value);
    }
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError(null);
      
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        if (rejection && rejection.errors[0]?.code === "file-too-large") {
          setError(`File is too large. Max size is ${Math.round(maxSize / (1024 * 1024))}MB.`);
        } else if (rejection && rejection.errors[0]?.code === "file-invalid-type") {
          setError("Invalid file type.");
        } else {
          setError(rejection?.errors[0]?.message || "Error uploading file.");
        }
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onChange(file);
      }
    },
    [maxSize, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled: disabled || isUploading,
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    if (onRemove) onRemove();
  };

  const isImage = preview?.match(/\.(jpeg|jpg|gif|png|webp)$/i) || preview?.startsWith("blob:") || preview?.startsWith("http");

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-muted/50 hover:bg-muted",
          (disabled || isUploading) && "opacity-60 cursor-not-allowed",
          preview ? "p-4" : "p-6"
        )}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-sm font-medium">Uploading... {progress}%</div>
          </div>
        ) : preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <FileIcon className="h-10 w-10 text-muted-foreground" />
                <span className="text-sm font-medium max-w-[200px] truncate">
                  File Selected
                </span>
              </div>
            )}
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-md"
                onClick={handleRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="p-3 bg-background rounded-full shadow-sm mb-2">
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium">
              <span className="text-primary hover:underline">Click to upload</span> or drag and drop
            </div>
            <div className="text-xs text-muted-foreground">
              SVG, PNG, JPG or GIF (max. {Math.round(maxSize / (1024 * 1024))}MB)
            </div>
          </div>
        )}
      </div>
      
      {error && <div className="text-sm text-destructive font-medium">{error}</div>}
    </div>
  );
}
