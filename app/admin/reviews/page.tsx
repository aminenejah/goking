"use client";

import { useEffect, useState, useTransition } from "react";
import { Star, CheckCircle, Trash2, Clock } from "lucide-react";
import { getReviews, updateReviewStatus, deleteReview } from "@/app/actions";

interface Review {
  id: number;
  client: string;
  property: string;
  rating: number;
  date: string;
  comment: string;
  status: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isPending, startTransition] = useTransition();

  function reload() {
    startTransition(async () => {
      const data = await getReviews();
      setReviews(data);
    });
  }

  useEffect(() => { reload(); }, []);

  async function handleApprove(id: number) {
    await updateReviewStatus(id, "Approved");
    reload();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this review?")) return;
    await deleteReview(id);
    reload();
  }

  const pending = reviews.filter((r) => r.status === "Pending");
  const approved = reviews.filter((r) => r.status === "Approved");
  const ordered = [...pending, ...approved];

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Client Reviews</h1>
      <p style={{ color: "#71717a", marginBottom: "2rem" }}>
        {pending.length} pending · {approved.length} approved
      </p>

      {isPending && (
        <p style={{ color: "#71717a", marginBottom: "1rem", fontSize: "0.875rem" }}>Refreshing…</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {ordered.length === 0 && (
          <p style={{ color: "#71717a", textAlign: "center", padding: "3rem" }}>No reviews yet.</p>
        )}

        {ordered.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              borderLeft: review.status === "Pending" ? "4px solid #fbbf24" : "4px solid #10b981",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{review.client}</h3>
                <p style={{ fontSize: "0.875rem", color: "#71717a" }}>
                  Reviewed <strong>{review.property}</strong> on {review.date}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "#fbbf24" : "none"}
                    color={i < review.rating ? "#fbbf24" : "#d4d4d8"}
                  />
                ))}
              </div>
            </div>

            <p style={{ color: "#3f3f46", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              "{review.comment}"
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f4f4f5", paddingTop: "1rem" }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  backgroundColor: review.status === "Approved" ? "#dcfce7" : "#fef9c3",
                  color: review.status === "Approved" ? "#166534" : "#854d0e",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {review.status === "Pending" ? <Clock size={12} /> : <CheckCircle size={12} />}
                {review.status}
              </span>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                {review.status === "Pending" && (
                  <button
                    onClick={() => handleApprove(review.id)}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review.id)}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
