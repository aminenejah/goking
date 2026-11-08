import { Users, TrendingUp, DollarSign, Home, Star, CalendarCheck, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getProperties, getBookings, getReviews } from "@/app/actions";

export default async function AnalyticsPage() {
  const [properties, bookings, reviews] = await Promise.all([
    getProperties(),
    getBookings(),
    getReviews(),
  ]);

  // Calculations
  const totalProperties = properties.length;
  const activeProperties = properties.filter((p: any) => p.status === "Active").length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b: any) => b.status === "Confirmed");
  const pendingBookings = bookings.filter((b: any) => b.status === "Pending");
  const rejectedBookings = bookings.filter((b: any) => b.status === "Rejected");

  const totalRevenue = confirmedBookings.reduce((sum: number, b: any) => {
    const num = parseFloat((b.amount || "").replace(/[^0-9.-]+/g, "")) || 0;
    return sum + num;
  }, 0);

  const avgBookingValue = confirmedBookings.length > 0 ? Math.round(totalRevenue / confirmedBookings.length) : 0;
  const approvalRate = totalBookings > 0 ? Math.round((confirmedBookings.length / totalBookings) * 100) : 0;

  // Reviews stats
  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter((r: any) => r.status === "Approved");
  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((sum: number, r: any) => sum + (Number(r.rating) || 5), 0) / approvedReviews.length).toFixed(1)
    : "5.0";

  // Category breakdown
  const categoryCounts: Record<string, number> = {};
  properties.forEach((p: any) => {
    const cat = p.category || p.type || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  // Purpose breakdown
  const saleCount = properties.filter((p: any) => p.purpose === "sale" || p.purpose === "buy").length;
  const rentCount = properties.filter((p: any) => p.purpose !== "sale" && p.purpose !== "buy").length;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      sub: `${confirmedBookings.length} confirmed bookings`,
      icon: DollarSign,
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      label: "Total Bookings",
      value: totalBookings.toString(),
      sub: `${approvalRate}% approval rate`,
      icon: CalendarCheck,
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      label: "Active Listings",
      value: `${activeProperties}/${totalProperties}`,
      sub: `${saleCount} for sale · ${rentCount} for rent`,
      icon: Home,
      color: "#9333ea",
      bg: "#f3e8ff",
    },
    {
      label: "Client Rating",
      value: `${avgRating} ★`,
      sub: `${totalReviews} total reviews`,
      icon: Star,
      color: "#ca8a04",
      bg: "#fef08a",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#18181b", margin: 0 }}>Platform Analytics</h1>
        <p style={{ color: "#71717a", marginTop: "0.25rem", fontSize: "0.95rem" }}>
          Real-time performance metrics across properties, bookings, and customer satisfaction
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ backgroundColor: stat.bg, padding: "0.75rem", borderRadius: "8px" }}>
                <stat.icon size={22} color={stat.color} />
              </div>
            </div>
            <h3 style={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.25rem" }}>{stat.label}</h3>
            <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18181b", margin: 0 }}>{stat.value}</p>
            <p style={{ fontSize: "0.8rem", color: "#a1a1aa", marginTop: "0.5rem", margin: 0 }}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Middle Grid: Booking Status Breakdown & Category Distribution */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {/* Booking Statuses */}
        <div style={{ backgroundColor: "#fff", padding: "1.75rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#18181b", marginBottom: "1.5rem" }}>Booking Inquiries Overview</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", backgroundColor: "#f0fdf4", borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span style={{ fontWeight: 500, fontSize: "0.9rem", color: "#166534" }}>Confirmed Bookings</span>
              </div>
              <span style={{ fontWeight: 700, color: "#166534" }}>{confirmedBookings.length}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", backgroundColor: "#fefce8", borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Clock size={18} color="#ca8a04" />
                <span style={{ fontWeight: 500, fontSize: "0.9rem", color: "#854d0e" }}>Pending Approval</span>
              </div>
              <span style={{ fontWeight: 700, color: "#854d0e" }}>{pendingBookings.length}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", backgroundColor: "#fef2f2", borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <XCircle size={18} color="#dc2626" />
                <span style={{ fontWeight: 500, fontSize: "0.9rem", color: "#991b1b" }}>Rejected Bookings</span>
              </div>
              <span style={{ fontWeight: 700, color: "#991b1b" }}>{rejectedBookings.length}</span>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #f4f4f5", display: "flex", justifyContent: "space-between", color: "#71717a", fontSize: "0.85rem" }}>
            <span>Average Booking Value:</span>
            <strong style={{ color: "#18181b" }}>${avgBookingValue.toLocaleString()}</strong>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div style={{ backgroundColor: "#fff", padding: "1.75rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#18181b", marginBottom: "1.5rem" }}>Portfolio by Category</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = totalProperties > 0 ? Math.round((count / totalProperties) * 100) : 0;
              return (
                <div key={cat}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.35rem" }}>
                    <span style={{ fontWeight: 500, textTransform: "capitalize" }}>{cat}</span>
                    <span style={{ color: "#71717a" }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", backgroundColor: "#f4f4f5", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", backgroundColor: "var(--primary)", borderRadius: "4px" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
