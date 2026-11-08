"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Zap, Clock } from "lucide-react";
import Link from "next/link";
import styles from "./FlashSales.module.css";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

interface FlashDeal {
  id: number;
  title: string;
  image: string;
  address: string;
  originalPrice: string;
  discountedPrice: string;
  discountPercent: number;
  expiresAt: Date;
}

function buildDeals(properties: any[]): FlashDeal[] {
  // Take up to 6 properties and simulate flash deals
  const candidates = properties
    .filter((p: any) => p.status === "Active")
    .slice(0, 8);

  return candidates
    .filter((_, i) => i % 2 === 0) // Pick every other one to keep it curated
    .slice(0, 5)
    .map((p: any) => {
      const basePrice = parseFloat(p.price) || 200;
      const discountPercent = Math.floor(seededRandom(p.id + 13) * 20) + 10; // 10-30%
      const discountedPrice = Math.round(basePrice * (1 - discountPercent / 100));

      // Expiry: random hours in the future (2-48h)
      const hoursFromNow = Math.floor(seededRandom(p.id + 29) * 46) + 2;
      const expiresAt = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);

      // If the property already has DB fields, prefer those
      const actualOriginal = p.originalPrice || basePrice.toString();
      const actualDiscounted = p.discountedPrice || discountedPrice.toString();

      return {
        id: p.id,
        title: p.title,
        image: p.image,
        address: p.address || "",
        originalPrice: actualOriginal,
        discountedPrice: actualDiscounted,
        discountPercent,
        expiresAt: p.discountExpiresAt ? new Date(p.discountExpiresAt) : expiresAt,
      };
    });
}

function CountdownTimer({ expiresAt }: { expiresAt: Date }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(0, expiresAt.getTime() - now);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (diff === 0) {
    return (
      <div className={styles.countdown}>
        <Clock size={14} className={styles.countdownIcon} />
        <span className={styles.countdownText}>Expired</span>
      </div>
    );
  }

  return (
    <div className={styles.countdown}>
      <Clock size={14} className={styles.countdownIcon} />
      <div>
        <div className={styles.countdownText}>
          {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
        </div>
        <div className={styles.countdownLabel}>Time remaining</div>
      </div>
    </div>
  );
}

export default function FlashSales({ properties = [] }: { properties?: any[] }) {
  const deals = useMemo(() => buildDeals(properties), [properties]);

  if (deals.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.flashIcon}>
              <Zap size={18} />
            </span>
            Flash <span>Deals</span>
          </motion.h2>
        </div>

        <div className={styles.scrollContainer}>
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/properties/${deal.id}`}
                className={styles.dealCard}
              >
                <div className={styles.dealImageWrap}>
                  <img src={deal.image} alt={deal.title} loading="lazy" />
                  <span className={styles.discountBadge}>
                    -{deal.discountPercent}%
                  </span>
                </div>

                <div className={styles.dealContent}>
                  <h3 className={styles.dealTitle}>{deal.title}</h3>
                  <p className={styles.dealLocation}>{deal.address}</p>

                  <div className={styles.priceRow}>
                    <span className={styles.originalPrice}>
                      ${deal.originalPrice}
                    </span>
                    <span className={styles.discountedPrice}>
                      ${deal.discountedPrice}
                    </span>
                  </div>

                  <CountdownTimer expiresAt={deal.expiresAt} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
