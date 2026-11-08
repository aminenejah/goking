"use client";

import { useState, useRef } from "react";
import { Star } from "lucide-react";
import { addReview } from "@/app/actions";
import styles from "./Reviews.module.css";

interface Review {
  id: number;
  client: string;
  property: string;
  rating: number;
  date: string;
  comment: string;
  status: string;
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const approved = reviews.filter((r) => r.status === "Approved");

  // ---- Submit form state ----
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    await addReview({
      client: fd.get("client") as string,
      property: fd.get("property") as string,
      rating,
      comment: fd.get("comment") as string,
    });
    setSubmitting(false);
    setSuccess(true);
    formRef.current?.reset();
    setRating(5);
    setTimeout(() => setSuccess(false), 4000);
  }

  return (
    <section className={styles.section} id="reviews">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Testimonials</span>
          <h2 className={styles.title}>What Our Clients Say</h2>
          <p className={styles.subtitle}>
            Real experiences from guests who have stayed in our premium properties worldwide.
          </p>
        </div>

        {/* Cards carousel */}
        {approved.length > 0 ? (
          <div className={styles.track}>
            {approved.map((review) => (
              <div key={review.id} className={styles.card}>
                {/* Stars */}
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "#fbbf24" : "none"}
                      color={i < review.rating ? "#fbbf24" : "#d4d4d8"}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className={styles.quote}>"{review.comment}"</p>

                {/* Client */}
                <div className={styles.clientRow}>
                  <div className={styles.avatar}>
                    {review.client.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.clientInfo}>
                    <strong>{review.client}</strong>
                    <span>{review.property} · {review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#71717a", marginBottom: "2rem" }}>
            No approved reviews yet. Be the first!
          </p>
        )}

        {/* Submit form */}
        <div className={styles.formWrap}>
          <p className={styles.formTitle}>Share Your Experience</p>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <input
                id="review-client"
                className={styles.input}
                name="client"
                placeholder="Your name"
                required
              />
              <input
                id="review-property"
                className={styles.input}
                name="property"
                placeholder="Property you stayed at"
                required
              />
            </div>

            <div className={styles.ratingRow}>
              <span className={styles.ratingLabel}>Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  id={`star-${star}`}
                  className={styles.starBtn}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    size={22}
                    fill={(hovered || rating) >= star ? "#fbbf24" : "none"}
                    color={(hovered || rating) >= star ? "#fbbf24" : "#d4d4d8"}
                  />
                </button>
              ))}
            </div>

            <textarea
              id="review-comment"
              className={styles.textarea}
              name="comment"
              placeholder="Tell us about your experience…"
              required
            />

            <button
              id="submit-review"
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit Review"}
            </button>

            {success && (
              <p className={styles.successMsg}>
                ✅ Thank you! Your review is pending approval.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
