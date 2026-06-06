import {
  getAnalytics,
  logEvent,
  setUserProperties,
  isSupported,
  type Analytics,
} from "firebase/analytics";
import { firebaseApp } from "./config";
import type { AnalyticsEvent } from "@/constants/analytics-events";

/**
 * Firebase Analytics instance.
 * Lazy-initialized and only on client side (analytics requires window).
 */
let analyticsInstance: Analytics | null = null;

/**
 * Get the Analytics instance (client-side only).
 * Returns null during SSR or if analytics is not supported.
 */
async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;

  if (analyticsInstance) return analyticsInstance;

  const supported = await isSupported();
  if (!supported) return null;

  analyticsInstance = getAnalytics(firebaseApp);
  return analyticsInstance;
}

/**
 * Track an analytics event.
 * Safe to call on server — silently no-ops during SSR.
 */
export async function trackEvent(
  eventName: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
): Promise<void> {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  logEvent(analytics, eventName as string, params);
}

/**
 * Set user properties for analytics segmentation.
 */
export async function setUserProps(
  properties: Record<string, string>
): Promise<void> {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  setUserProperties(analytics, properties);
}

/**
 * Track a page view event.
 */
export async function trackPageView(
  pagePath: string,
  pageTitle: string
): Promise<void> {
  await trackEvent("page_view" as AnalyticsEvent, {
    page_path: pagePath,
    page_title: pageTitle,
  });
}
