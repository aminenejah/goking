import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | Aveneo Real Estate",
  description: "Administration dashboard for Aveneo Real Estate platform.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f4f5" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem 3rem", overflowY: "auto", color: "#1c1c1c" }}>
        {children}
      </main>
    </div>
  );
}
