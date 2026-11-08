import { getSettings, saveSettings } from "@/app/actions";

export default async function AdminSettings() {
  const settings = await getSettings();

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>Platform Settings</h1>

      <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", maxWidth: "800px" }}>
        
        <form action={async (formData: FormData) => {
          "use server";
          await saveSettings(formData);
        }}>
          <div style={{ padding: "2rem", borderBottom: "1px solid #e4e4e7" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>General Information</h2>
            <p style={{ color: "#71717a", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Update your platform name, contact email, and support details. These changes will instantly reflect on the public website.</p>
            
            <div style={{ display: "grid", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>Platform Name</label>
                <input type="text" name="platformName" defaultValue={settings.platformName} required style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>Support Email</label>
                <input type="email" name="supportEmail" defaultValue={settings.supportEmail} required style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>Phone Number</label>
                <input type="text" name="phone" defaultValue={settings.phone} required style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>Office Address</label>
                <input type="text" name="address" defaultValue={settings.address} required style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              </div>
            </div>
          </div>

          <div style={{ padding: "2rem", borderBottom: "1px solid #e4e4e7" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>Security</h2>
            <p style={{ color: "#71717a", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Update your admin password and security preferences.</p>
            
            <div style={{ display: "grid", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>Current Password</label>
                <input type="password" style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>New Password</label>
                <input type="password" style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              </div>
            </div>
          </div>

          <div style={{ padding: "2rem", display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" style={{ 
              backgroundColor: "var(--primary)", color: "#fff", 
              padding: "0.75rem 2rem", borderRadius: "8px", 
              border: "none", fontWeight: 600, cursor: "pointer" 
            }}>
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
