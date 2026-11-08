import { getBookings, updateBookingStatus } from "@/app/actions";
import { CheckCircle, XCircle, Clock, CalendarDays, DollarSign } from "lucide-react";

export default async function AdminBookings() {
  const bookings = await getBookings();
  
  // Sort by newest first
  bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b: any) => b.status === "Pending").length;
  const confirmedCount = bookings.filter((b: any) => b.status === "Confirmed").length;
  const rejectedCount = bookings.filter((b: any) => b.status === "Rejected").length;

  const confirmedRevenue = bookings
    .filter((b: any) => b.status === "Confirmed")
    .reduce((sum: number, b: any) => {
      const num = parseFloat((b.amount || "").replace(/[^0-9.-]+/g, "")) || 0;
      return sum + num;
    }, 0);

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#18181b", margin: 0 }}>Manage Bookings</h1>
        <p style={{ color: "#71717a", marginTop: "0.25rem", fontSize: "0.95rem" }}>
          Review and approve booking reservations from guests
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        <div style={{ backgroundColor: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #f4f4f5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#71717a", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <CalendarDays size={16} color="#3b82f6" /> Total Bookings
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#18181b" }}>{totalCount}</div>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #f4f4f5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#71717a", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <Clock size={16} color="#eab308" /> Pending Requests
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: pendingCount > 0 ? "#ca8a04" : "#18181b" }}>
            {pendingCount}
          </div>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #f4f4f5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#71717a", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <CheckCircle size={16} color="#16a34a" /> Confirmed
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#166534" }}>{confirmedCount}</div>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #f4f4f5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#71717a", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <DollarSign size={16} color="#16a34a" /> Confirmed Revenue
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#18181b" }}>
            ${confirmedRevenue.toLocaleString()}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#fafafa", borderBottom: "1px solid #e4e4e7", color: "#71717a", textAlign: "left", fontSize: "0.85rem" }}>
              <th style={{ padding: "1rem 1.5rem" }}>Property</th>
              <th style={{ padding: "1rem 1.5rem" }}>Guest</th>
              <th style={{ padding: "1rem 1.5rem" }}>Dates</th>
              <th style={{ padding: "1rem 1.5rem" }}>Amount</th>
              <th style={{ padding: "1rem 1.5rem" }}>Status</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#71717a" }}>No bookings found.</td>
              </tr>
            )}
            {bookings.map((booking: any) => (
              <tr key={booking.id} style={{ borderBottom: "1px solid #f4f4f5", fontSize: "0.9rem" }}>
                <td style={{ padding: "1.25rem 1.5rem", fontWeight: 500 }}>{booking.propertyTitle}</td>
                <td style={{ padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontWeight: 500 }}>{booking.guestName}</div>
                  <div style={{ fontSize: "0.75rem", color: "#71717a" }}>{booking.guestEmail}</div>
                </td>
                <td style={{ padding: "1.25rem 1.5rem", color: "#71717a" }}>
                  {booking.checkIn} to {booking.checkOut}
                </td>
                <td style={{ padding: "1.25rem 1.5rem", fontWeight: 600 }}>{booking.amount}</td>
                <td style={{ padding: "1.25rem 1.5rem" }}>
                  <span style={{ 
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    backgroundColor: booking.status === "Confirmed" ? "#dcfce7" : booking.status === "Rejected" ? "#fee2e2" : "#fef08a", 
                    color: booking.status === "Confirmed" ? "#166534" : booking.status === "Rejected" ? "#991b1b" : "#854d0e", 
                    padding: "0.3rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600
                  }}>
                    {booking.status === "Confirmed" && <CheckCircle size={13} />}
                    {booking.status === "Rejected" && <XCircle size={13} />}
                    {booking.status === "Pending" && <Clock size={13} />}
                    {booking.status}
                  </span>
                </td>
                <td style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>
                  {booking.status === "Pending" && (
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <form action={async () => {
                        "use server";
                        await updateBookingStatus(booking.id, "Confirmed");
                      }}>
                        <button type="submit" style={{ padding: "0.45rem 0.9rem", backgroundColor: "#166534", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Approve</button>
                      </form>
                      <form action={async () => {
                        "use server";
                        await updateBookingStatus(booking.id, "Rejected");
                      }}>
                        <button type="submit" style={{ padding: "0.45rem 0.9rem", backgroundColor: "#fff", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Reject</button>
                      </form>
                    </div>
                  )}
                  {booking.status !== "Pending" && (
                    <span style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
