import { Users, UserCheck, Mail, CalendarDays } from "lucide-react";
import { getBookings } from "@/app/actions";

export default async function AdminUsersPage() {
  const bookings = await getBookings();

  // Extract unique users from bookings
  const userMap = new Map<string, { name: string; email: string; bookings: number; lastBooking: string }>();

  for (const booking of bookings as any[]) {
    const key = booking.guestEmail;
    if (!userMap.has(key)) {
      userMap.set(key, {
        name: booking.guestName,
        email: booking.guestEmail,
        bookings: 1,
        lastBooking: booking.createdAt,
      });
    } else {
      const existing = userMap.get(key)!;
      existing.bookings += 1;
      if (new Date(booking.createdAt) > new Date(existing.lastBooking)) {
        existing.lastBooking = booking.createdAt;
      }
    }
  }

  const users = Array.from(userMap.values()).sort(
    (a, b) => new Date(b.lastBooking).getTime() - new Date(a.lastBooking).getTime()
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18181b", margin: 0 }}>Users & Guests</h1>
        <p style={{ color: "#71717a", marginTop: "0.25rem", fontSize: "0.9rem" }}>
          Guests extracted from booking history
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#71717a" }}>
            <Users size={18} color="#3b82f6" />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Total Guests</span>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 700, color: "#18181b", margin: 0 }}>{users.length}</p>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#71717a" }}>
            <UserCheck size={18} color="#10b981" />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Repeat Guests</span>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 700, color: "#18181b", margin: 0 }}>
            {users.filter(u => u.bookings > 1).length}
          </p>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#71717a" }}>
            <CalendarDays size={18} color="#f59e0b" />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Total Bookings</span>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 700, color: "#18181b", margin: 0 }}>{bookings.length}</p>
        </div>
      </div>

      {/* Users table */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f4f4f5", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f4f4f5" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Guest Directory</h2>
        </div>

        {users.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#a1a1aa" }}>
            <Users size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.4, display: "block" }} />
            <p style={{ margin: 0, fontWeight: 500 }}>No guests yet</p>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem" }}>Guests will appear here once bookings are made.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#fafafa", borderBottom: "1px solid #e4e4e7", color: "#71717a", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Guest</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Email</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Bookings</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Last Activity</th>
                  <th style={{ padding: "0.875rem 1.5rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.email} style={{ borderBottom: "1px solid #f4f4f5" }}>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          backgroundColor: `hsl(${(user.name.charCodeAt(0) * 40) % 360}, 60%, 60%)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: "0.875rem", flexShrink: 0
                        }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#71717a", fontSize: "0.875rem" }}>
                        <Mail size={14} />
                        {user.email}
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{
                        display: "inline-block",
                        backgroundColor: user.bookings > 1 ? "#dbeafe" : "#f4f4f5",
                        color: user.bookings > 1 ? "#1e40af" : "#52525b",
                        padding: "0.2rem 0.6rem", borderRadius: "999px",
                        fontSize: "0.8rem", fontWeight: 600
                      }}>
                        {user.bookings} booking{user.bookings !== 1 ? "s" : ""}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", color: "#71717a", fontSize: "0.8rem" }}>
                      {user.lastBooking
                        ? new Date(user.lastBooking).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "—"}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{
                        display: "inline-block",
                        backgroundColor: user.bookings > 1 ? "#dcfce7" : "#f4f4f5",
                        color: user.bookings > 1 ? "#166534" : "#71717a",
                        padding: "0.2rem 0.6rem", borderRadius: "4px",
                        fontSize: "0.75rem", fontWeight: 600
                      }}>
                        {user.bookings > 1 ? "Repeat Guest" : "Guest"}
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
