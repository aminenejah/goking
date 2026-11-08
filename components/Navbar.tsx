"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Globe, UserCircle, ChevronDown } from "lucide-react";
import styles from "./Navbar.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { Locale } from "@/i18n/locales";

export default function Navbar({ settings }: { settings?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const platformName = settings?.platformName || "Aveneo Real Estate";
  const nameParts = platformName.split(" ");
  const firstPart = nameParts[0] || "Aveneo";
  const restPart = nameParts.slice(1).join(" ") || "Real Estate";

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          {firstPart}<span>{restPart}</span>
        </div>
        
        <div className={styles.desktopLinks}>
          <a href="#stays" className={styles.activeLink}>{t("stays", "navbar")}</a>
          <a href="#experiences">{t("experiences", "navbar")}</a>
          <a href="#online">{t("online", "navbar")}</a>
        </div>

        <div className={styles.actions}>
          <a href="#host" className={styles.hostLink}>{t("host", "navbar")}</a>
          
          <div style={{ position: "relative" }}>
            <button className={styles.iconBtn} onClick={() => setLangMenuOpen(!langMenuOpen)} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Globe size={20} /> <span style={{ fontSize: "0.875rem", fontWeight: 500, textTransform: "uppercase" }}>{lang}</span>
            </button>
            {langMenuOpen && (
              <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#fff", color: "#1c1c1c", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", minWidth: "120px", zIndex: 50 }}>
                {(["en", "fr", "es", "it", "ar"] as Locale[]).map((l) => (
                  <button key={l} onClick={() => { setLang(l); setLangMenuOpen(false); }} style={{ width: "100%", padding: "0.75rem 1rem", border: "none", background: lang === l ? "#f4f4f5" : "transparent", textAlign: "left", cursor: "pointer", fontSize: "0.875rem" }}>
                    {l === "en" ? "English" : l === "fr" ? "Français" : l === "es" ? "Español" : l === "it" ? "Italiano" : "العربية"}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={styles.userMenu}>
            <Menu size={16} />
            <UserCircle size={28} color="#717171" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.mobileMenu}>
          <a href="#stays" onClick={() => setIsOpen(false)}>{t("stays", "navbar")}</a>
          <a href="#experiences" onClick={() => setIsOpen(false)}>{t("experiences", "navbar")}</a>
          <a href="#host" onClick={() => setIsOpen(false)}>{t("host", "navbar")}</a>
        </div>
      )}
    </motion.nav>
  );
}
