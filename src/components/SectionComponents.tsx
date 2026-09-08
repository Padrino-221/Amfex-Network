import { ReactNode } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════
   Shared section/card components — Yedent-style patterns
   restyled with the Amfex brand palette.
   ═══════════════════════════════════════════════════════ */

interface SectionHeaderProps {
  kicker: string;
  heading: ReactNode;
  description?: string;
  light?: boolean; // renders on dark charcoal backgrounds
  className?: string;
}

export function SectionHeader({ kicker, heading, description, light = false, className }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 ${className || ""}`}>
      <div>
        <span className={`kicker mb-5 ${light ? "kicker-light" : ""}`}>{kicker}</span>
        <h2 className={`text-[30px] md:text-[40px] font-bold leading-[0.95] tracking-[-0.04em] max-w-2xl ${light ? "text-cream" : "text-charcoal"}`}>
          {heading}
        </h2>
      </div>
      {description && (
        <p className={`leading-relaxed max-w-[420px] text-[17px] font-normal lg:text-right ${light ? "text-cream/85" : "text-charcoal/75"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={`card-premium p-8 ${className || ""}`}>{children}</div>;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  subtitle: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, subtitle, title, description, className }: FeatureCardProps) {
  return (
    <div className={`card-premium overflow-hidden h-full flex flex-col ${className || ""}`}>
      <div className="flex flex-col flex-1 p-6">
        <div className="w-12 h-12 rounded bg-gold/15 flex items-center justify-center mb-4 text-gold-warm">
          {icon}
        </div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal/60 font-bold mb-2">{subtitle}</p>
        <h3 className="text-[22px] font-bold tracking-[-0.02em] text-charcoal mb-3 leading-tight">{title}</h3>
        <p className="text-[15px] text-charcoal/80 leading-relaxed flex-1">{description}</p>
      </div>
    </div>
  );
}

/** Arrow link — shifts and tints gold on hover (Yedent pattern). */
export function ArrowLink({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
        light ? "text-cream/80 hover:text-gold" : "text-charcoal hover:text-red"
      } ${className}`}
    >
      <span className="transition-all group-hover:gap-4 inline-flex items-center gap-2">
        {children}
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-gold"
      >
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </Link>
  );
}

/** Standalone arrow icon used inside card CTAs. */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}