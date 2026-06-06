import { initializeApp, getApps, type FirebaseApp } from "firebase/app";

/**
 * Firebase configuration loaded from environment variables.
 * SECURITY: Config values are NEVER hardcoded — they come from .env.local.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Validates that all required Firebase config values are present.
 * Throws at startup if any required value is missing.
 */
function validateConfig(): void {
  const required = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ] as const;

  const missing = required.filter(
    (key) => !firebaseConfig[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase config values: ${missing.join(", ")}. ` +
        "Check your .env.local file."
    );
  }
}

/**
 * Initialize Firebase app (singleton pattern).
 * Prevents duplicate initialization in Next.js hot reload.
 */
function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  validateConfig();
  return initializeApp(firebaseConfig);
}

export const firebaseApp = getFirebaseApp();
