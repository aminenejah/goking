"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [isEvent, setIsEvent] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (startDate) params.append("start", startDate.toISOString());
    if (endDate) params.append("end", endDate.toISOString());
    params.append("guests", guests.toString());
    if (isEvent) params.append("category", "event");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="btn-primary"
        style={{ flex: "1 1 200px" }}
      />
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(dates: [Date | null, Date | null]) => {
          setStartDate(dates[0]);
          setEndDate(dates[1]);
        }}
        placeholderText="Select dates"
        className="btn-primary"
        wrapperClassName="date-picker-wrapper"
      />
      <select
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
        className="btn-primary"
        style={{ width: "80px" }}
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} Guest{ i > 0 ? "s" : "" }
          </option>
        ))}
      </select>
      <label style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <input
          type="checkbox"
          checked={isEvent}
          onChange={() => setIsEvent(!isEvent)}
        />
        Event space
      </label>
      <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
        Search
      </button>
    </form>
  );
}
