"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, CalendarCheck, Users, Settings, LogOut, PenTool, BarChart, Receipt, MessageSquare } from "lucide-react";
import styles from "./AdminSidebar.module.css";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart },
  { href: "/admin/accounting", label: "Accounting", icon: Receipt },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/admin/properties", label: "Properties", icon: Home },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/content", label: "Site Content", icon: PenTool },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span style={{ color: "#fff" }}>Aveneo</span><span style={{ color: "var(--primary)", fontWeight: 400, fontSize: "1.1rem", marginLeft: "4px" }}>Admin</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link 
              href={item.href} 
              key={item.href}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.avatar}>A</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Admin User</span>
          <span className={styles.userRole}>Super Admin</span>
        </div>
        <button style={{ marginLeft: "auto", background: "none", border: "none", color: "#a1a1aa", cursor: "pointer" }}>
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
