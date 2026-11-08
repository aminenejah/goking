"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="glass-card fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 bg-white bg-opacity-70 backdrop-blur-md">

      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          priority
        />

        <span
          className="text-xl font-semibold"
          style={{ color: "var(--primary)" }}
        >
          Imm
        </span>
      </Link>

      <nav className="flex gap-6 text-sm font-medium">
        <Link href="/search">Search</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <ThemeToggle />
    </header>
  );
}