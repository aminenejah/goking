"use client";

import { motion } from "framer-motion";
import { BadgeCheck, MessageCircle, ShieldCheck, Building2 } from "lucide-react";
import styles from "./TrustBadges.module.css";

const badges = [
  {
    icon: <BadgeCheck size={24} />,
    title: "Best Price Guarantee",
    subtitle: "Always the best deal, guaranteed",
  },
  {
    icon: <MessageCircle size={24} />,
    title: "24/7 Support",
    subtitle: "WhatsApp & phone always available",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Secure Payments",
    subtitle: "100% secure transactions",
  },
  {
    icon: <Building2 size={24} />,
    title: "500+ Properties",
    subtitle: "Verified & premium listings",
  },
];

export default function TrustBadges() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className={styles.badge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={styles.iconWrap}>{badge.icon}</div>
              <div className={styles.textWrap}>
                <span className={styles.title}>{badge.title}</span>
                <span className={styles.subtitle}>{badge.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
