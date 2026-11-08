import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, TrendingUp } from "lucide-react";
import { getBookings } from "@/app/actions";

export default async function AccountingPage() {
  const bookings = await getBookings();

  // Real revenue from confirmed bookings
  const confirmed = bookings.filter((b: any) => b.status === "Confirmed");
  const pending = bookings.filter((b: any) => b.status === "Pending");

  const totalRevenue = confirmed.reduce((sum: number, b: any) => {
    const cleaned = String(b.amount || "0").replace(/[^0-9.]/g, "");
    return sum + (parseFloat(cleaned) || 0);
  }, 0);

  const pendingRevenue = pending.reduce((sum: number, b: any) => {
    const cleaned = String(b.amount || "0").replace(/[^0-9.]/g, "");
    return sum + (parseFloat(cleaned) || 0);
  }, 0);

  // Simulated expenses (platform operational costs)
  const estimatedExpenses = Math.round(totalRevenue * 0.15);
  const netProfit = totalRevenue - estimatedExpenses;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18181b", margin: 0 }}>Accounting & Finance</h1>
        <p style={{ color: "#71717a", marginTop: "0.25rem", fontSize: "0.9rem" }}>
          Financial overview based on real booking data
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderLeft: "4px solid #10b981" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#71717a" }}>
            <ArrowUpRight size={18} color="#10b981" />
            <h3 style={{ fontSize: "0.875rem", fontWeight: 500, margin: 0 }}>Total Revenue (Confirmed)</h3>
          </div>
          <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18181b", margin: 0 }}>{formatCurrency(totalRevenue)}</p>
          <p style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.4rem" }}>{confirmed.length} confirmed bookings</p>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderLeft: "4px solid #f59e0b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#71717a" }}>
            <CreditCard size={18} color="#f59e0b" />
            <h3 style={{ fontSize: "0.875rem", fontWeight: 500, margin: 0 }}>Pending Revenue</h3>
          </div>
          <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18181b", margin: 0 }}>{formatCurrency(pendingRevenue)}</p>
          <p style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.4rem" }}>{pending.length} pending bookings</p>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderLeft: "4px solid #ef4444" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#71717a" }}>
            <ArrowDownRight size={18} color="#ef4444" />
            <h3 style={{ fontSize: "0.875rem", fontWeight: 500, margin: 0 }}>Est. Expenses (15%)</h3>
          </div>
          <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18181b", margin: 0 }}>{formatCurrency(estimatedExpenses)}</p>
          <p style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.4rem" }}>Platform operational costs</p>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderLeft: "4px solid #3b82f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#71717a" }}>
            <TrendingUp size={18} color="#3b82f6" />
            <h3 style={{ fontSize: "0.875rem", fontWeight: 500, margin: 0 }}>Net Profit</h3>
          </div>
          <p style={{ fontSize: "1.875rem", fontWeight: 700, color: netProfit >= 0 ? "#166534" : "#991b1b", margin: 0 }}>{formatCurrency(netProfit)}</p>
          <p style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.4rem" }}>After operational costs</p>
        </div>
      </div>

      {/* Booking Transactions */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5", overflow: "hidden" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #f4f4f5" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Booking Transactions</h2>
        </div>

        {bookings.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#a1a1aa" }}>
            <DollarSign size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.4, display: "block" }} />
            <p style={{ margin: 0, fontWeight: 500 }}>No transactions yet</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#fafafa", borderBottom: "1px solid #e4e4e7", color: "#71717a", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Booking ID</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Property</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Guest</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Dates</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Amount</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking: any) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid #f4f4f5" }}>
                    <td style={{ padding: "1rem 1.5rem", color: "#71717a", fontSize: "0.8rem", fontFamily: "monospace" }}>
                      #{String(booking.id).padStart(4, "0")}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: 500, fontSize: "0.875rem" }}>
                      {booking.propertyTitle}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ fontSize: "0.875rem" }}>{booking.guestName}</div>
                      <div style={{ fontSize: "0.75rem", color: "#71717a" }}>{booking.guestEmail}</div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", color: "#71717a", fontSize: "0.8rem" }}>
                      {booking.checkIn} → {booking.checkOut}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: 700, fontSize: "0.95rem", color: booking.status === "Confirmed" ? "#166534" : booking.status === "Rejected" ? "#991b1b" : "#854d0e" }}>
                      {booking.amount}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{
                        display: "inline-block",
                        backgroundColor: booking.status === "Confirmed" ? "#dcfce7" : booking.status === "Rejected" ? "#fee2e2" : "#fef9c3",
                        color: booking.status === "Confirmed" ? "#166534" : booking.status === "Rejected" ? "#991b1b" : "#854d0e",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
