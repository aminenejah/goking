"use client";

import { useState } from "react";
import { saveContent } from "@/app/actions";
import { Plus, Trash2, GripVertical, CheckCircle } from "lucide-react";

export default function ContentForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    await saveContent(data);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleHeroChange = (key: string, value: string) => {
    setData({ ...data, hero: { ...data.hero, [key]: value } });
  };

  const addCategory = () => {
    const newCat = { id: `c${Date.now()}`, name: "New Category", icon: "Star" };
    setData({ ...data, categories: [...data.categories, newCat] });
  };

  const updateCategory = (index: number, key: string, value: string) => {
    const newCats = [...data.categories];
    newCats[index][key] = value;
    setData({ ...data, categories: newCats });
  };

  const removeCategory = (index: number) => {
    const newCats = [...data.categories];
    newCats.splice(index, 1);
    setData({ ...data, categories: newCats });
  };

  const addService = () => {
    const newSvc = { id: `s${Date.now()}`, title: "New Service", description: "Description here", icon: "Star" };
    setData({ ...data, services: [...data.services, newSvc] });
  };

  const updateService = (index: number, key: string, value: string) => {
    const newSvcs = [...data.services];
    newSvcs[index][key] = value;
    setData({ ...data, services: newSvcs });
  };

  const removeService = (index: number) => {
    const newSvcs = [...data.services];
    newSvcs.splice(index, 1);
    setData({ ...data, services: newSvcs });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* Hero Section */}
      <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.5rem" }}>Homepage Hero Text</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "#71717a" }}>Title Part 1</label>
              <input value={data.hero.title1} onChange={(e) => handleHeroChange("title1", e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "#71717a" }}>Title Part 2 (Highlight)</label>
              <input value={data.hero.title2} onChange={(e) => handleHeroChange("title2", e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "#71717a" }}>Title Part 3</label>
              <input value={data.hero.title3} onChange={(e) => handleHeroChange("title3", e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "#71717a" }}>Subtitle</label>
            <input value={data.hero.subtitle} onChange={(e) => handleHeroChange("subtitle", e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Property Categories</h2>
          <button onClick={addCategory} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1px solid #d4d4d8", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem" }}>
            <Plus size={16} /> Add Category
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {data.categories.map((cat: any, index: number) => (
            <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "#f4f4f5", padding: "1rem", borderRadius: "8px" }}>
              <GripVertical size={20} color="#a1a1aa" />
              <input value={cat.name} onChange={(e) => updateCategory(index, "name", e.target.value)} placeholder="Category Name" style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              <input value={cat.icon} onChange={(e) => updateCategory(index, "icon", e.target.value)} placeholder="Lucide Icon Name (e.g. Castle)" style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              <button onClick={() => removeCategory(index)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "0.5rem" }}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Luxury Services</h2>
          <button onClick={addService} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1px solid #d4d4d8", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem" }}>
            <Plus size={16} /> Add Service
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {data.services.map((svc: any, index: number) => (
            <div key={svc.id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", backgroundColor: "#f4f4f5", padding: "1.5rem", borderRadius: "8px", position: "relative" }}>
              <button onClick={() => removeService(index)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
                <Trash2 size={18} />
              </button>
              <label style={{ fontSize: "0.75rem", color: "#71717a" }}>Service Title</label>
              <input value={svc.title} onChange={(e) => updateService(index, "title", e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
              <label style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.5rem" }}>Description</label>
              <textarea value={svc.description} onChange={(e) => updateService(index, "description", e.target.value)} rows={2} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none", resize: "none" }} />
              <label style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.5rem" }}>Icon Name</label>
              <input value={svc.icon} onChange={(e) => updateService(index, "icon", e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", bottom: "2rem", backgroundColor: "#fff", padding: "1rem 2rem", borderRadius: "12px", boxShadow: "0 -4px 20px rgba(0,0,0,0.1)", zIndex: 10 }}>
        <div style={{ color: "#166534", display: "flex", alignItems: "center", gap: "0.5rem", opacity: saved ? 1 : 0, transition: "opacity 0.3s" }}>
          <CheckCircle size={20} /> All content saved successfully!
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          style={{ 
            backgroundColor: "var(--primary)", color: "#fff", 
            padding: "0.75rem 3rem", borderRadius: "8px", 
            border: "none", fontWeight: 600, cursor: isSaving ? "not-allowed" : "pointer",
            opacity: isSaving ? 0.7 : 1, fontSize: "1rem"
          }}
        >
          {isSaving ? "Saving..." : "Save All Content"}
        </button>
      </div>

    </div>
  );
}
