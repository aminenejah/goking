"use client";

import React, { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="btn-secondary"
      aria-label="Toggle theme"
      title="Toggle theme"
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "999px",
        background: "var(--color-surface)",
        color: "var(--primary)",
        border: "1px solid rgba(197,168,128,.25)",
        fontSize: "18px",
        transition: "0.25s",
        cursor: "pointer",
        backdropFilter: "blur(10px)"
      }}
    >
      {dark ? "☾" : "☼"}
    </button>
  );
}
