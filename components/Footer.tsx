import styles from "./Footer.module.css";

export default function Footer({ settings }: { settings?: any }) {
  const platformName = settings?.platformName || "Aveneo Real Estate";
  const supportEmail = settings?.supportEmail || "contact@aveneorealestate.com";
  const phone = settings?.phone || "+216 71 000 000";
  const address = settings?.address || "Les Berges du Lac 2, Tunis";

  const nameParts = platformName.split(" ");
  const firstPart = nameParts[0] || "AVENEO";
  const restPart = nameParts.slice(1).join(" ") || "REAL ESTATE";

  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.grid}`}>
        <div className={styles.col}>
          <div className={styles.logo}>
            {firstPart.toUpperCase()} <span>{restPart.toUpperCase()}</span>
          </div>
          <p className={styles.desc}>
            The ultimate destination for premium real estate worldwide.
          </p>
        </div>
        
        <div className={styles.col}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#properties">Properties</a></li>
            <li><a href="#services">Services</a></li>
          </ul>
        </div>
        
        <div className={styles.col}>
          <h3>Contact Us</h3>
          <p>Email: {supportEmail}</p>
          <p>Phone: {phone}</p>
          <p>Office: {address}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} {platformName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
