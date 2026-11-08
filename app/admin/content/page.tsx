import { getContent } from "@/app/actions";
import ContentForm from "./ContentForm";

export default async function AdminContent() {
  const content = await getContent();

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>Site Content Manager</h1>
      <p style={{ color: "#71717a", marginBottom: "2rem" }}>Manage all the text, categories, and services displayed on your website.</p>
      
      <ContentForm initialData={content} />
    </div>
  );
}
