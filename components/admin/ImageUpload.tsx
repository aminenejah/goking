"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, X, Loader2 } from "lucide-react";

export function SingleImageUpload({ name, defaultValue }: { name: string; defaultValue?: string | null }) {
    const [url, setUrl] = useState(defaultValue || "");
    const [uploading, setUploading] = useState(false);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const { error } = await supabase.storage.from("property-images").upload(fileName, file);
        if (error) {
            alert("Upload failed: " + error.message);
            setUploading(false);
            return;
        }
        const { data } = supabase.storage.from("property-images").getPublicUrl(fileName);
        setUrl(data.publicUrl);
        setUploading(false);
    };

    return (
        <div>
            <input type="hidden" name={name} value={url} />
            {url && (
                <img src={url} alt="preview" style={{ width: "160px", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.75rem", display: "block" }} />
            )}
            <label style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.6rem 1rem", border: "1px solid #d4d4d8", borderRadius: "6px",
                cursor: "pointer", fontSize: "0.875rem", backgroundColor: "#fafafa"
            }}>
                {uploading ? <Loader2 size={16} /> : <Upload size={16} />}
                {uploading ? "Uploading..." : url ? "Change Image" : "Choose Image from PC"}
                <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} disabled={uploading} />
            </label>
        </div>
    );
}

export function GalleryImageUpload({ name, defaultValue }: { name: string; defaultValue?: string[] | null }) {
    const [urls, setUrls] = useState<string[]>(defaultValue || []);
    const [uploading, setUploading] = useState(false);

    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploading(true);
        const newUrls: string[] = [];
        for (const file of Array.from(files)) {
            const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
            const { error } = await supabase.storage.from("property-images").upload(fileName, file);
            if (error) {
                alert("Upload failed: " + error.message);
                continue;
            }
            const { data } = supabase.storage.from("property-images").getPublicUrl(fileName);
            newUrls.push(data.publicUrl);
        }
        setUrls((prev) => [...prev, ...newUrls]);
        setUploading(false);
    };

    const removeImage = (index: number) => {
        setUrls((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <input type="hidden" name={name} value={urls.join(",")} />
            {urls.length > 0 && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    {urls.map((u, i) => (
                        <div key={i} style={{ position: "relative" }}>
                            <img src={u} alt={`gallery-${i}`} style={{ width: "90px", height: "70px", objectFit: "cover", borderRadius: "6px" }} />
                            <button type="button" onClick={() => removeImage(i)} style={{
                                position: "absolute", top: "-6px", right: "-6px", background: "#ef4444", color: "#fff",
                                border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <label style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.6rem 1rem", border: "1px solid #d4d4d8", borderRadius: "6px",
                cursor: "pointer", fontSize: "0.875rem", backgroundColor: "#fafafa"
            }}>
                {uploading ? <Loader2 size={16} /> : <Upload size={16} />}
                {uploading ? "Uploading..." : "Add Gallery Images"}
                <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} disabled={uploading} />
            </label>
        </div>
    );
}