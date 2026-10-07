import Link from "next/link";
import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link href="/" className="brand">
        <span className="brand-mark">◆</span>
        <span>EventOne</span>
      </Link>

      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/#events" className="active">Events</Link>
        <Link href="/#communities">Communities</Link>
        <Link href="/#about">About</Link>
      </nav>

      <div className="nav-actions">
        <button aria-label="Search"><Search size={19} /></button>
        <button aria-label="Notifications"><Bell size={19} /></button>
        <button aria-label="Profile"><UserCircle size={27} /></button>
      </div>
    </header>
  );
}
