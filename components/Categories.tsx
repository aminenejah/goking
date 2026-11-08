"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./Categories.module.css";

const purposes = [
  { id: "rent", label: "🏠 Rent" },
  { id: "buy", label: "🏡 Buy" },
];

const rentCategories = [
  { id: "all", label: "All", emoji: "🏠" },
  { id: "villas", label: "Villas", emoji: "🏡" },
  { id: "apartments", label: "Apartments", emoji: "🏢" },
  { id: "houses", label: "Houses", emoji: "🏠" },
  { id: "penthouses", label: "Penthouses", emoji: "🌆" },
  { id: "castles", label: "Castles", emoji: "🏰" },
  { id: "yachts", label: "Yachts", emoji: "⛵" },
  { id: "rooms", label: "Rooms", emoji: "🛏️" },
];

const buyCategories = [
  { id: "all", label: "All", emoji: "🏠" },
  { id: "villas", label: "Villas", emoji: "🏡" },
  { id: "apartments", label: "Apartments", emoji: "🏢" },
  { id: "houses", label: "Houses", emoji: "🏠" },
  { id: "penthouses", label: "Penthouses", emoji: "🌆" },
  { id: "land", label: "Land", emoji: "🌿" },
];

function CategoriesInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";
  const activePurpose = searchParams.get("purpose") || "rent";

  const categories = activePurpose === "buy" ? buyCategories : rentCategories;

  const updateFilter = (
    key: "category" | "purpose",
    value: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "category") {
      if (value === "all") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
    }

    if (key === "purpose") {
      params.set("purpose", value);
      // reset category when switching purpose, since option sets differ
      params.delete("category");
    }

    router.push(`/?${params.toString()}#properties`);
  };

  return (
    <>
      {/* Rent / Buy */}
      <div className={styles.purposeTabs}>
        {purposes.map((purpose) => (
          <button
            key={purpose.id}
            onClick={() => updateFilter("purpose", purpose.id)}
            className={`${styles.purposeButton} ${activePurpose === purpose.id ? styles.activePurpose : ""
              }`}
          >
            {purpose.label}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.category} ${activeCategory === cat.id ? styles.active : ""
              }`}
            onClick={() => updateFilter("category", cat.id)}
          >
            <span className={styles.emoji}>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default function Categories() {
  return (
    <div className={`container ${styles.categoriesContainer}`}>
      <Suspense fallback={<div style={{ height: "80px" }} />}>
        <CategoriesInner />
      </Suspense>
    </div>
  );
}