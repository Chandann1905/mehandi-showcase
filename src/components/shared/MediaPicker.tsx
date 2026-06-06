"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { uploadFile, generateFileName, UPLOAD_LIMITS, ALLOWED_IMAGE_TYPES } from "@/lib/firebase/storage";
import type { StoragePath } from "@/constants/storage-paths";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MediaPickerProps {
  value?: string;
  onChange: (url: string) => void;
  folder: StoragePath;
  disabled?: boolean;
}

export function MediaPicker({ value, onChange, folder, disabled }: MediaPickerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file?: File) => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      const fileName = generateFileName(file.name);
      const fullPath = `${folder}/${fileName}`;

      const { getUrl } = uploadFile(
        fullPath, 
        file, 
        undefined, 
        (prog) => setProgress(prog)
      );

      const url = await getUrl();
      onChange(url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    // Note: We don't delete the file from storage immediately to prevent 
    // accidental data loss if the form isn't saved. It can be cleaned up later.
    onChange("");
  };

  return (
    <div className="space-y-4">
      <FileUpload
        value={value}
        onChange={handleUpload}
        onRemove={handleRemove}
        isUploading={isUploading}
        progress={progress}
        disabled={disabled}
        accept={{
          "image/*": [...ALLOWED_IMAGE_TYPES],
        }}
        maxSize={UPLOAD_LIMITS.DESIGN_IMAGE}
      />
      {/* Fallback string input for external URLs (useful during dev or if Firebase storage isn't ready) */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Or provide an external URL</Label>
        <Input 
          type="url" 
          value={value || ""} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={disabled || isUploading}
          className="text-xs"
        />
      </div>
    </div>
  );
}
