"use client";

import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { createBooking } from "@/app/actions";
import { differenceInDays } from "date-fns";

export default function BookingForm({ propertyId, propertyTitle, pricePerNight }: { propertyId: number, propertyTitle: string, pricePerNight: string }) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const numericPrice = Number(pricePerNight.replace(/[^0-9.-]+/g,""));
  const days = differenceInDays(date[0].endDate, date[0].startDate) || 1;
  const total = numericPrice * days;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await createBooking({
      propertyId,
      propertyTitle,
      guestName: name,
      guestEmail: email,
      checkIn: date[0].startDate.toISOString().split('T')[0],
      checkOut: date[0].endDate.toISOString().split('T')[0],
      amount: `$${total.toLocaleString()}`
    });

    setSuccess(true);
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div style={{ padding: "2rem", backgroundColor: "#f4f4f5", borderRadius: "12px", textAlign: "center" }}>
        <h3 style={{ color: "#166534", fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>Booking Requested!</h3>
        <p style={{ color: "#71717a", fontSize: "0.875rem" }}>Your request for {propertyTitle} has been sent to the host. You will receive an email confirmation once approved.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      <div style={{ padding: "1rem", border: "1px solid #e4e4e7", borderRadius: "8px", overflow: "hidden" }}>
        <p style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Select Dates</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DateRange
            editableDateInputs={true}
            onChange={(item: any) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
            rangeColors={["#C5A880"]}
            color="#C5A880"
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input 
          type="text" 
          placeholder="Full Name" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d4d4d8", outline: "none" }} 
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e4e4e7", paddingTop: "1rem" }}>
        <span style={{ fontWeight: 600 }}>Total ({days} {days === 1 ? 'night' : 'nights'})</span>
        <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>${total.toLocaleString()}</span>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{ 
          width: "100%", backgroundColor: "var(--primary)", color: "#fff", 
          padding: "1rem", borderRadius: "8px", border: "none", 
          fontWeight: 600, fontSize: "1rem", cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1
        }}
      >
        {isSubmitting ? "Processing..." : "Request to Book"}
      </button>
      <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#71717a" }}>You won't be charged yet</p>
    </form>
  );
}
