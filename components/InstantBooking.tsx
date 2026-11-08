"use client";

import { motion } from "framer-motion";
import { Zap, Calendar, CheckCircle, Clock } from "lucide-react";
import styles from "./InstantBooking.module.css";

export default function InstantBooking() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.banner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.iconWrap}>⚡</div>

          <div className={styles.textWrap}>
            <h3 className={styles.title}>
              <span className={styles.titleBolt}>
                <Zap size={18} />
              </span>
              Instant Booking
            </h3>
            <p className={styles.subtitle}>
              Synced calendar, live availability — confirm your stay in just a few clicks, no waiting for host approval.
            </p>
          </div>

          <div className={styles.features}>
            <span className={styles.feature}>
              <Calendar size={16} className={styles.featureIcon} />
              Live Calendar
            </span>
            <span className={styles.feature}>
              <CheckCircle size={16} className={styles.featureIcon} />
              Auto Confirm
            </span>
            <span className={styles.feature}>
              <Clock size={16} className={styles.featureIcon} />
              24/7 Support
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
