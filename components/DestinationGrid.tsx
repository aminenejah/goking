"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./DestinationGrid.module.css";

const cities = [
  {
    name: "Nabeul",
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=600",
    searchKey: "nabeul",
  },
  {
    name: "Hammamet",
    image: "https://images.unsplash.com/photo-1568322445389-f64b0f36bc64?auto=format&fit=crop&q=80&w=600",
    searchKey: "hammamet",
  },
  {
    name: "Djerba",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=600",
    searchKey: "djerba",
  },
  {
    name: "Tunis",
    image: "https://images.unsplash.com/photo-1590071089561-4d0d022b0075?auto=format&fit=crop&q=80&w=600",
    searchKey: "tunis",
  },
  {
    name: "Sousse",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&q=80&w=600",
    searchKey: "sousse",
  },
  {
    name: "Monastir",
    image: "https://images.unsplash.com/photo-1566909069067-30096e24b5b3?auto=format&fit=crop&q=80&w=600",
    searchKey: "monastir",
  },
  {
    name: "Mahdia",
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&q=80&w=600",
    searchKey: "mahdia",
  },
  {
    name: "Bizerte",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    searchKey: "bizerte",
  },
];

function getCityCounts(properties: any[]) {
  const counts: Record<string, number> = {};
  for (const city of cities) {
    counts[city.searchKey] = properties.filter((p: any) =>
      ((p.address || p.location || "").toLowerCase()).includes(city.searchKey)
    ).length;
  }
  return counts;
}

export default function DestinationGrid({ properties = [] }: { properties?: any[] }) {
  const router = useRouter();
  const counts = getCityCounts(properties);

  const handleCityClick = (searchKey: string) => {
    router.push(`/?location=${searchKey}#properties`);
  };

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
            Browse by <span>Destination</span>
          </motion.h2>
        </div>

        <div className={styles.scrollContainer}>
          {cities.map((city, index) => (
            <motion.div
              key={city.searchKey}
              className={styles.cityCard}
              onClick={() => handleCityClick(city.searchKey)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <img src={city.image} alt={city.name} loading="lazy" />
              <div className={styles.cityOverlay}>
                <span className={styles.cityName}>{city.name}</span>
                <span className={styles.cityCount}>
                  {counts[city.searchKey] || 0} propert{counts[city.searchKey] !== 1 ? "ies" : "y"}
                </span>
              </div>
              {counts[city.searchKey] > 0 && (
                <span className={styles.countBadge}>
                  {counts[city.searchKey]}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
