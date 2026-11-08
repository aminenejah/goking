import { TrendingUp, DollarSign, Home, CalendarCheck, BarChart, MessageSquare, Receipt, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getProperties, getBookings, getReviews } from "@/app/actions";

export default async function AdminDashboard() {
  const [properties, bookings, reviews] = await Promise.all([
    getProperties(),
    getBookings(),
    getReviews(),
  ]);

  const activeListings = properties.filter((p: any) => p.status === "Active").length;
  const totalListings = properties.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b: any) => b.status === "Pending").length;
  const confirmedBookings = bookings.filter((b: any) => b.status === "Confirmed").length;
  const pendingReviews = reviews.filter((r: any) => r.status === "Pending").length;

  // Revenue: sum of confirmed bookings that have a numeric amount
  const totalRevenue = bookings
    .filter((b: any) => b.status === "Confirmed")
    .reduce((sum: number, b: any) => {
      const cleaned = String(b.amount || "0").replace(/[^0-9.]/g, "");
      return sum + (parseFloat(cleaned) || 0);
    }, 0);

  const formatCurrency = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `$${(n / 1_000).toFixed(1)}K`
      : `$${n.toFixed(0)}`;

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "#10b981",
      bg: "#d1fae5",
      sub: `${confirmedBookings} confirmed bookings`,
    },
    {
      label: "Active Listings",
      value: activeListings.toString(),
      icon: Home,
      color: "#3b82f6",
      bg: "#dbeafe",
      sub: `${totalListings} total properties`,
    },
    {
      label: "Total Bookings",
      value: totalBookings.toString(),
      icon: CalendarCheck,
      color: "#8b5cf6",
      bg: "#ede9fe",
      sub: `${pendingBookings} pending approval`,
    },
    {
      label: "Pending Reviews",
      value: pendingReviews.toString(),
      icon: MessageSquare,
      color: "#f59e0b",
      bg: "#fef3c7",
      sub: `${reviews.length} total reviews`,
    },
  ];

  // Recent bookings (last 5)
  const recentBookings = bookings.slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18181b", margin: 0 }}>Dashboard Overview</h1>
        <p style={{ color: "#71717a", marginTop: "0.25rem", fontSize: "0.9rem" }}>
          Welcome back, Admin · Live data from your platform
        </p>
      </div>

      {/* KPI Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ backgroundColor: stat.bg, padding: "0.75rem", borderRadius: "10px" }}>
                <stat.icon size={22} color={stat.color} />
              </div>
              <span style={{ backgroundColor: stat.bg, color: stat.color, padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600 }}>
                Live
              </span>
            </div>
            <h3 style={{ color: "#71717a", fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</h3>
            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#18181b", lineHeight: 1 }}>{stat.value}</p>
            <p style={{ fontSize: "0.75rem", color: "#a1a1aa", marginTop: "0.5rem" }}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        {/* Recent Bookings */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5", overflow: "hidden" }}>
          <div style={{ padding: "1.5rem 1.5rem 1rem", borderBottom: "1px solid #f4f4f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Recent Bookings</h2>
            <Link href="/admin/bookings" style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 500, textDecoration: "none" }}>
              View all →
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#a1a1aa" }}>
              <CalendarCheck size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.4, display: "block" }} />
              <p style={{ margin: 0, fontWeight: 500 }}>No bookings yet</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#fafafa", color: "#71717a", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  <th style={{ padding: "0.75rem 1.5rem" }}>Property</th>
                  <th style={{ padding: "0.75rem 1.5rem" }}>Guest</th>
                  <th style={{ padding: "0.75rem 1.5rem" }}>Amount</th>
                  <th style={{ padding: "0.75rem 1.5rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking: any) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid #f4f4f5" }}>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: 500, fontSize: "0.875rem", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {booking.propertyTitle}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{booking.guestName}</div>
                      <div style={{ fontSize: "0.75rem", color: "#71717a" }}>{booking.guestEmail}</div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: 600, fontSize: "0.875rem" }}>{booking.amount}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "0.25rem",
                        backgroundColor: booking.status === "Confirmed" ? "#dcfce7" : booking.status === "Rejected" ? "#fee2e2" : "#fef9c3",
                        color: booking.status === "Confirmed" ? "#166534" : booking.status === "Rejected" ? "#991b1b" : "#854d0e",
                        padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600
                      }}>
                        {booking.status === "Confirmed" && <CheckCircle size={11} />}
                        {booking.status === "Pending" && <Clock size={11} />}
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Actions + Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.25rem" }}>Quick Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link href="/admin/properties/new" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", backgroundColor: "var(--primary)", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>
                <Home size={18} /> Add New Property
              </Link>
              <Link href="/admin/analytics" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", backgroundColor: "#f4f4f5", borderRadius: "8px", textDecoration: "none", fontWeight: 500, fontSize: "0.875rem", color: "#18181b" }}>
                <BarChart size={18} color="var(--primary)" /> View Analytics
              </Link>
              <Link href="/admin/accounting" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", backgroundColor: "#f4f4f5", borderRadius: "8px", textDecoration: "none", fontWeight: 500, fontSize: "0.875rem", color: "#18181b" }}>
                <Receipt size={18} color="var(--primary)" /> Accounting
              </Link>
              <Link href="/admin/reviews" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", backgroundColor: "#f4f4f5", borderRadius: "8px", textDecoration: "none", fontWeight: 500, fontSize: "0.875rem", color: "#18181b" }}>
                <MessageSquare size={18} color="var(--primary)" /> Manage Reviews
                {pendingReviews > 0 && (
                  <span style={{ marginLeft: "auto", backgroundColor: "#fbbf24", color: "#1c1c1c", borderRadius: "999px", padding: "1px 8px", fontSize: "0.7rem", fontWeight: 700 }}>
                    {pendingReviews}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Property breakdown */}
          <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.25rem" }}>Listings Breakdown</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "For Rent", count: properties.filter((p: any) => p.purpose !== "sale" && p.purpose !== "buy").length, color: "#3b82f6" },
                { label: "For Sale", count: properties.filter((p: any) => p.purpose === "sale" || p.purpose === "buy").length, color: "#10b981" },
                { label: "Active", count: activeListings, color: "#8b5cf6" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem", fontSize: "0.8rem" }}>
                    <span style={{ color: "#71717a" }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.count}</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "#f4f4f5", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${totalListings > 0 ? (item.count / totalListings) * 100 : 0}%`,
                      backgroundColor: item.color,
                      borderRadius: "999px",
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
