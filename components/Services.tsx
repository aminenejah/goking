"use client";

import { motion } from "framer-motion";
import { Key, Shield, Globe } from "lucide-react";
import styles from "./Services.module.css";

const services = [
  {
    icon: <Globe size={40} />,
    title: "Global Reach",
    desc: "Access to international markets and premium clientele worldwide."
  },
  {
    icon: <Shield size={40} />,
    title: "Secure Transactions",
    desc: "Guaranteed privacy and security for all your high-value property transactions."
  },
  {
    icon: <Key size={40} />,
    title: "Concierge Service",
    desc: "End-to-end support from discovery to handing over the keys."
  }
];

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose <span>Aveneo</span>
          </motion.h2>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={styles.icon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
