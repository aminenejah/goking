"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import styles from "./Hero.module.css";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (dates) params.append("dates", dates);
    if (price) params.append("price", price);
    if (condition) params.append("condition", condition);
    if (purpose) params.append("purpose", purpose);

    router.push(`/?${params.toString()}#properties`);
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={styles.title}>
            {t("title1", "hero")} <span>{t("title2", "hero")}</span> {t("title3", "hero")}
          </h1>
          <p className={styles.subtitle}>
            {t("subtitle", "hero")}
          </p>
          
          <div className={styles.searchPill}>
            <div className={styles.searchSection}>
              <label>{t("searchWhere", "hero")}</label>
              <input 
                type="text" 
                placeholder={t("searchWherePlaceholder", "hero")} 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.searchSection}>
              <label>{t("searchCheckIn", "hero")} / {t("searchCheckOut", "hero")}</label>
              <input 
                type="text" 
                placeholder={t("searchDatesPlaceholder", "hero")} 
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.searchSection}>
              <label>{t("searchPrice", "hero")}</label>
              <select 
                className={styles.select}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">{t("searchPriceAny", "hero")}</option>
                <option value="0-1m">$0 - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="5m+">$5M+</option>
              </select>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.searchSection}>
              <label>{t("searchCondition", "hero")}</label>
              <select 
                className={styles.select}
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">{t("searchConditionAny", "hero")}</option>
                <option value="new">{t("searchConditionNew", "hero")}</option>
                <option value="excellent">{t("searchConditionExcellent", "hero")}</option>
                <option value="renovate">{t("searchConditionRenovate", "hero")}</option>
              </select>
            </div>
            <div className={styles.divider}></div>
            <div className={`${styles.searchSection} ${styles.whoSection}`}>
              <div>
                <label>{t("searchPurpose", "hero")}</label>
                <select 
                  className={styles.select}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="rent">{t("searchPurposeRent", "hero")}</option>
                  <option value="sale">{t("searchPurposeSale", "hero")}</option>
                </select>
              </div>
              <button className={styles.searchBtn} onClick={handleSearch}>
                <Search size={20} color="#fff" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
