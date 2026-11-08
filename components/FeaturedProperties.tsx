"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Map, LayoutGrid } from "lucide-react";
import dynamic from "next/dynamic";
import styles from "./FeaturedProperties.module.css";
import PropertyCard from "./PropertyCard";

const SearchMap = dynamic(() => import("./SearchMap"), { ssr: false });

function PropertyList({ properties }: { properties: any[] }) {
  const searchParams = useSearchParams();
  const filterCategory = searchParams.get("category");
  const filterLocation = searchParams.get("location")?.toLowerCase();
  const filterPurpose = searchParams.get("purpose");
  const filterPrice = searchParams.get("price");
  const filterCondition = searchParams.get("condition");

  const filtered = properties.filter((p) => {
    if (filterCategory && filterCategory !== "all" && p.category !== filterCategory) return false;
    if (filterLocation && !((p.address || p.location || "").toLowerCase()).includes(filterLocation)) return false;
    if (filterPurpose) {
      if (filterPurpose === "buy" || filterPurpose === "sale") {
        if (p.purpose !== "sale" && p.purpose !== "buy") return false;
      } else if (p.purpose !== filterPurpose) {
        return false;
      }
    }
    if (filterCondition && p.condition && p.condition.toLowerCase() !== filterCondition.toLowerCase()) return false;
    return true;
  });

  const [showMap, setShowMap] = useState(false);

  if (filtered.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyEmoji}>🏠</p>
        <h3>No properties found</h3>
        <p>Try adjusting your filters or <a href="/" style={{ color: "var(--primary)" }}>clear all</a></p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.toolbar}>
        <span className={styles.resultCount}>
          {filtered.length} propert{filtered.length !== 1 ? "ies" : "y"} found
        </span>
        <button
          className={`${styles.mapToggle} ${showMap ? styles.mapToggleActive : ""}`}
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? (
            <>
              <LayoutGrid size={16} /> Hide Map
            </>
          ) : (
            <>
              <Map size={16} /> Show Map
            </>
          )}
        </button>
      </div>

      <div className={showMap ? styles.splitLayout : undefined}>
        <div className={styles.grid}>
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {showMap && (
          <div className={styles.mapPanel}>
            <SearchMap properties={filtered} />
          </div>
        )}
      </div>
    </>
  );
}

export default function FeaturedProperties({ properties = [] }: { properties?: any[] }) {
  return (
    <section className={styles.section} id="properties">
      <div className="container">
        <Suspense fallback={
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        }>
          <PropertyList properties={properties} />
        </Suspense>
      </div>
    </section>
  );
}
