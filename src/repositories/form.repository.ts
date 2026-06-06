import { BaseRepository } from "./base.repository";
import {
  fetchCollection,
  createDocument,
  where,
  orderBy,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Form, FormSubmission } from "@/types/form.types";

/**
 * Repository for dynamic forms.
 */
export class FormRepository extends BaseRepository<Form> {
  constructor() {
    super(COLLECTIONS.FORMS);
  }

  async findBySlug(slug: string): Promise<Form | null> {
    return this.findByField("slug", slug);
  }

  /**
   * Submit a form response.
   */
  async submitResponse(
    formId: string,
    data: Record<string, string | number | boolean>
  ): Promise<string> {
    const submission: DocumentData = {
      form_id: formId,
      data,
    };
    const ref = await createDocument(COLLECTIONS.FORM_SUBMISSIONS, submission);
    return ref.id;
  }

  /**
   * Get submissions for a form.
   */
  async getSubmissions(formId: string): Promise<FormSubmission[]> {
    const constraints = [
      where("form_id", "==", formId),
      orderBy("created_at", "desc"),
    ];

    const snapshot = await fetchCollection(
      COLLECTIONS.FORM_SUBMISSIONS,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as FormSubmission
    );
  }
}

export const formRepository = new FormRepository();
