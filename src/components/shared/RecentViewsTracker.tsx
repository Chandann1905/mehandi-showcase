"use client";

import { useEffect } from "react";
import { useRecentStore } from "@/store/recent.store";

export function RecentViewsTracker({ designId }: { designId: string }) {
  const { addRecent } = useRecentStore();

  useEffect(() => {
    if (designId) {
      addRecent(designId);
    }
  }, [designId, addRecent]);

  return null;
}
