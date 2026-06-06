import { formRepository } from "@/repositories/form.repository";
import type { FormSubmission } from "@/types/form.types";
import type { OperationResult } from "@/types/common.types";

export class FormService {
  async submitForm(
    formSlug: string,
    data: Record<string, string | number | boolean>
  ): Promise<OperationResult> {
    try {
      const form = await formRepository.findBySlug(formSlug);
      if (!form || !form.active) {
        return { success: false, error: "Form not found or inactive." };
      }

      await formRepository.submitResponse(form.id, data);
      return { success: true };
    } catch (error) {
      console.error("Form submission failed:", error);
      return { success: false, error: "Failed to submit form." };
    }
  }

  async getAllForms(): Promise<import("@/types/form.types").Form[]> {
    return formRepository.findAll();
  }
}

export const formService = new FormService();
