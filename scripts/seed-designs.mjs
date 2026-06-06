import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleDesigns = [
  {
    title: "Classic Arabic Backhand",
    slug: "classic-arabic-backhand",
    description: "An elegant, minimalist Arabic mehndi design featuring bold floral motifs and spaced-out patterns. Perfect for festivals and engagements.",
    category_id: "arabic", // we'll use a string or create category first
    category_name: "Arabic Mehndi",
    thumbnail_url: "https://images.unsplash.com/photo-1594950893047-92042f4c4059?auto=format&fit=crop&q=80&w=800",
    images: [],
    tags: ["arabic", "minimalist", "backhand", "elegant"],
    price_range: "₹500 - ₹1000",
    time_required: "30-45 minutes",
    is_featured: true,
    status: "published",
    view_count: 120,
    favorite_count: 45,
    created_by: "system",
  },
  {
    title: "Bridal Full Hand Masterpiece",
    slug: "bridal-full-hand-masterpiece",
    description: "A breathtaking full-hand bridal design incorporating traditional Indian elements, mandalas, and intricate detailing.",
    category_id: "bridal",
    category_name: "Bridal Mehndi",
    thumbnail_url: "https://images.unsplash.com/photo-1589255760233-a3b04859d04b?auto=format&fit=crop&q=80&w=800",
    images: [],
    tags: ["bridal", "fullhand", "intricate", "traditional"],
    price_range: "₹3000 - ₹5000",
    time_required: "3-4 hours",
    is_featured: true,
    status: "published",
    view_count: 350,
    favorite_count: 112,
    created_by: "system",
  },
  {
    title: "Modern Floral Mandala",
    slug: "modern-floral-mandala",
    description: "A stunning modern take on the traditional mandala, focusing on central symmetry and floral extensions on the fingers.",
    category_id: "modern",
    category_name: "Modern & Minimal",
    thumbnail_url: "https://images.unsplash.com/photo-1621213032765-a0db9357d341?auto=format&fit=crop&q=80&w=800",
    images: [],
    tags: ["mandala", "modern", "floral"],
    price_range: "₹800 - ₹1500",
    time_required: "1 hour",
    is_featured: true,
    status: "published",
    view_count: 85,
    favorite_count: 22,
    created_by: "system",
  },
  {
    title: "Indo-Western Fusion",
    slug: "indo-western-fusion",
    description: "A blend of traditional Indian detailing with geometric Western patterns.",
    category_id: "indo-western",
    category_name: "Indo-Western",
    thumbnail_url: "https://images.unsplash.com/photo-1510204739110-3fc1e26b3492?auto=format&fit=crop&q=80&w=800",
    images: [],
    tags: ["fusion", "geometric", "contemporary"],
    price_range: "₹1000 - ₹2000",
    time_required: "1-2 hours",
    is_featured: false,
    status: "published",
    view_count: 45,
    favorite_count: 12,
    created_by: "system",
  },
  {
    title: "Dubai Style Heavy Arabic",
    slug: "dubai-style-heavy-arabic",
    description: "Thick, bold strokes combined with intricate shading, inspired by Dubai mehndi styles.",
    category_id: "arabic",
    category_name: "Arabic Mehndi",
    thumbnail_url: "https://images.unsplash.com/photo-1594950893047-92042f4c4059?auto=format&fit=crop&q=80&w=800", // Reusing image
    images: [],
    tags: ["dubai", "heavy", "arabic"],
    price_range: "₹1500 - ₹2500",
    time_required: "2 hours",
    is_featured: true,
    status: "published",
    view_count: 210,
    favorite_count: 67,
    created_by: "system",
  }
];

const sampleCategories = [
  {
    name: "Bridal Mehndi",
    slug: "bridal",
    description: "Intricate, heavy designs for your special day.",
    status: "active",
    display_order: 1,
    created_by: "system",
  },
  {
    name: "Arabic Mehndi",
    slug: "arabic",
    description: "Bold, flowing patterns with elegant negative space.",
    status: "active",
    display_order: 2,
    created_by: "system",
  },
  {
    name: "Modern & Minimal",
    slug: "modern",
    description: "Simple, chic designs for a contemporary look.",
    status: "active",
    display_order: 3,
    created_by: "system",
  }
];

async function seed() {
  console.log("Starting database seeding...");

  try {
    // 1. Seed Categories
    console.log("Seeding categories...");
    const categoryCollection = collection(db, "categories");
    for (const cat of sampleCategories) {
      await addDoc(categoryCollection, {
        ...cat,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      console.log(`Added category: ${cat.name}`);
    }

    // 2. Seed Designs
    console.log("Seeding designs...");
    const designCollection = collection(db, "designs");
    for (const design of sampleDesigns) {
      await addDoc(designCollection, {
        ...design,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      console.log(`Added design: ${design.title}`);
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
