"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavGroup {
  label: string;
  children?: { label: string; href: string }[];
  href?: string;
}

const navGroups: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "What I Do",
    children: [
      { label: "Business", href: "/business" },
      { label: "Academia", href: "/academia" },
      { label: "Ministry", href: "/ministry" },
    ],
  },
  { label: "SEDES", href: "/sedes" },
  {
    label: "Content",
    children: [
      { label: "Books & Store", href: "/books" },
      { label: "Journal", href: "/journal" },
      { label: "Resources", href: "/resources" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-charcoal/95 backdrop-blur-xl border-b border-cream/10">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Emmanuel Amful Owusu home">
            <div className="w-10 h-10 rounded flex items-center justify-center">
              <Image src="/logo.png" alt="Emmanuel Amful Owusu logo" width={40} height={40} priority className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-lg font-bold tracking-wide text-cream uppercase leading-none">AMFEX</span>
              <span className="text-[10px] font-bold tracking-[0.18em] text-cream/85 uppercase mt-1">NETWORK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-cream/85 lg:flex" aria-label="Primary navigation">
            {navGroups.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="inline-flex items-center gap-1 py-1 transition-colors hover:text-gold">
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-3 z-50">
                      <div className="bg-charcoal-deep border border-cream/10 py-2 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-cream/70 hover:text-gold hover:bg-white/5 transition-colors no-underline"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.label} href={item.href!} className="py-1 border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors no-underline">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 border border-cream/40 text-cream text-sm font-bold uppercase tracking-[0.06em] px-5 py-2.5 transition-all hover:bg-gold hover:border-gold hover:text-charcoal no-underline"
            >
              Contact Me
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="grid size-10 place-items-center border border-cream/20 text-cream lg:hidden"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M4 5h16" />
                    <path d="M4 12h16" />
                    <path d="M4 19h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-charcoal-deep px-5 pb-8 text-cream lg:hidden overflow-y-auto">
          <nav className="flex min-h-full flex-col">
            <div className="flex flex-col">
              {navGroups.map((item, index) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="w-full border-b border-cream/10 py-4 text-left text-2xl font-medium tracking-tight flex items-center justify-between"
                    >
                      <span>
                        <span className="mr-3 text-xs text-gold">{String(index + 1).padStart(2, "0")}</span>
                        {item.label}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-8 pb-2">
                        {item.children.map((child) => (
                          <Link key={child.label} href={child.href} onClick={() => setIsMenuOpen(false)} className="block py-3 text-lg text-cream/85 hover:text-gold transition-colors no-underline">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.label} href={item.href!} onClick={() => setIsMenuOpen(false)} className="border-b border-cream/10 py-4 text-2xl font-medium tracking-tight no-underline text-cream">
                    <span className="mr-3 text-xs text-gold">{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                )
              )}
            </div>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-8 bg-gold px-6 py-4 text-center font-bold uppercase tracking-[0.06em] text-charcoal no-underline">
              Contact Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}