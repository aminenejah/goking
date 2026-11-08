import React from "react";
import Link from "next/link";
import styles from "./PropertyCard.module.css";
import { Heart, Eye, CalendarCheck, Star } from "lucide-react";

// Deterministic pseudo-random from property ID (stable across renders)
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function PropertyCard({ property }: { property: any }) {
  const isSale = property.purpose === "sale" || property.purpose === "buy";
  const isNightly = property.rentType === "nightly";

  // Badge logic
  const isFeatured = property.rating >= 4.8;
  const viewCount = property.viewCount || Math.floor(seededRandom(property.id) * 900 + 100);
  const bookingCount = property.bookingCount || Math.floor(seededRandom(property.id + 7) * 5);
  const isPopular = viewCount > 500 || bookingCount >= 3;

  const displayPrice = property.price?.startsWith("$") ? property.price : `$${property.price}`;

  const hasSpecs = property.bedrooms != null || property.bathrooms != null || property.surfaceArea != null;

  return (
    <Link href={`/properties/${property.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={property.image} alt={property.title} className={styles.image} />
        <button className={styles.heartBtn} onClick={(e) => e.preventDefault()}>
          <Heart size={22} color="#fff" strokeWidth={2} />
        </button>

        {/* Status badges — top-left stack */}
        <div className={styles.badgeStack}>
          {isSale && <span className={styles.saleBadge}>For Sale</span>}
          {!isSale && isNightly && <span className={styles.nightBadge}>Per Night</span>}
          {isFeatured && <span className={styles.featuredBadge}>⭐ Featured</span>}
          {isPopular && !isFeatured && <span className={styles.popularBadge}>🔥 Popular</span>}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3>{property.title}</h3>
          <span className={styles.rating}>
            <Star size={14} fill="currentColor" strokeWidth={0} />
            {property.rating}
          </span>
        </div>
        <p className={styles.location}>{property.address || property.location}</p>

        {hasSpecs && (
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "#71717a", margin: "0.25rem 0" }}>
            {property.bedrooms != null && <span>{property.bedrooms} bds</span>}
            {property.bedrooms != null && property.bathrooms != null && <span>•</span>}
            {property.bathrooms != null && <span>{property.bathrooms} ba</span>}
            {(property.bedrooms != null || property.bathrooms != null) && property.surfaceArea != null && <span>•</span>}
            {property.surfaceArea != null && <span>{property.surfaceArea} m²</span>}
          </div>
        )}

        <p className={styles.price}>
          {displayPrice}
          <span className={styles.priceNote}> {property.priceNote}</span>
        </p>

        {/* Social proof */}
        <div className={styles.socialProof}>
          <span className={styles.socialItem}>
            <Eye size={14} />
            {viewCount} views
          </span>
          {bookingCount > 0 && (
            <span className={styles.socialItem}>
              <CalendarCheck size={14} />
              {bookingCount} bookings
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
