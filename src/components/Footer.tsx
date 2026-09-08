"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Business", href: "/business" },
  { label: "Academia", href: "/academia" },
  { label: "Ministry", href: "/ministry" },
  { label: "SEDES Framework", href: "/sedes" },
  { label: "Gallery", href: "/gallery" },
];

const contentLinks = [
  { label: "Books & Store", href: "/books" },
  { label: "Journal", href: "/journal" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

import type { SiteSettings } from "@/lib/cms";
import { settingValue } from "@/lib/settingsUtils";
import { getSocialLinks } from "@/lib/socials";

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
  const ctaBadge = settingValue(settings ?? null, "footer_cta_badge", "Ready to build something great?");
  const ctaHeading = settingValue(settings ?? null, "footer_cta_heading", "Let's work together.");
  const ctaBody = settingValue(settings ?? null, "footer_cta_body", "A project, a collaboration, or simply a conversation — I'd love to hear from you.");
  const tagline = settingValue(
    settings ?? null,
    "footer_tagline",
    "Founder & CEO of Amfex Network. Technology, knowledge, leadership and purpose — building systems that empower people and organizations across Ghana and beyond."
  );
  const copyright = settingValue(settings ?? null, "footer_copyright", `© ${new Date().getFullYear()} Emmanuel Amful Owusu. All rights reserved.`);
  const email = settingValue(settings ?? null, "email", "emmanuelamful@gmail.com");
  const phone = settingValue(settings ?? null, "phone", "+233 2494 58849");
  const location = settingValue(settings ?? null, "location", "Sunyani, Ghana · Working worldwide");
  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream">
      {/* Subtle decorative orbs */}
      <div className="absolute -top-32 -right-24 w-[26rem] h-[26rem] bg-gold/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] bg-red/5 rounded-full blur-3xl pointer-events-none" />

      {/* Big statement CTA */}
      <div className="container-premium relative pt-16 lg:pt-24">
        <span className="kicker-light">{ctaBadge}</span>
        <Link
          href="/contact"
          className="group mt-8 flex flex-wrap items-center gap-4 no-underline sm:gap-6"
        >
          <span className="text-[clamp(2.6rem,10vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-cream transition-colors group-hover:text-gold">
            {ctaHeading}
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gold text-charcoal transition-transform duration-300 group-hover:rotate-45 md:size-20">
            <ArrowUpRight className="w-6 h-6 md:w-9 md:h-9" strokeWidth={2} />
          </span>
        </Link>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/85 md:text-base">{ctaBody}</p>
      </div>

      {/* Link grid */}
      <div className="container-premium relative mt-16 grid gap-12 border-t border-cream/10 pt-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        {/* Brand */}
        <div className="lg:col-span-5">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-12 h-12 rounded flex items-center justify-center shrink-0">
              <Image src="/logo.png" alt="Emmanuel Amful Owusu logo" width={48} height={48} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-lg font-bold text-white uppercase leading-none tracking-wide">AMFEX</span>
              <span className="text-[10px] font-bold tracking-[0.18em] text-cream/85 uppercase mt-1">NETWORK</span>
            </div>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">{tagline}</p>
        </div>

        {/* Explore — numbered lists echoing the header */}
        <div className="lg:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream/70 mb-5">
            Explore
          </p>
          <ul className="space-y-1">
            {quickLinks.map((link, i) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-3 border-b border-cream/8 py-2.5 text-cream/70 transition-colors hover:text-gold no-underline"
                >
                  <span className="text-[10px] font-semibold text-gold/60 tabular-nums group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto self-center opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream/70 mb-5">
            Connect
          </p>
          <ul className="space-y-1">
            {contentLinks.map((link, i) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-3 border-b border-cream/8 py-2.5 text-cream/70 transition-colors hover:text-gold no-underline"
                >
                  <span className="text-[10px] font-semibold text-gold/60 tabular-nums group-hover:text-gold">
                    {String(quickLinks.length + i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto self-center opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact details */}
          <div className="mt-7 space-y-3 text-sm">
            <a href={`mailto:${email}`} className="flex items-center gap-2.5 text-cream/85 hover:text-gold transition-colors">
              <Mail className="w-4 h-4 text-gold" strokeWidth={2} /> {email}
            </a>
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2.5 text-cream/85 hover:text-gold transition-colors">
              <Phone className="w-4 h-4 text-gold" strokeWidth={2} /> {phone}
            </a>
            <div className="flex items-start gap-2.5 text-cream/85">
              <MapPin className="w-4 h-4 text-gold mt-0.5" strokeWidth={2} />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-premium relative mt-14 flex flex-col gap-4 border-t border-cream/10 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-cream/35">{copyright}</p>
        <div className="flex items-center gap-6">
          <div className="flex gap-5 text-xs text-cream/35">
            <Link href="/" className="hover:text-cream/70 transition-colors no-underline">Privacy</Link>
            <Link href="/" className="hover:text-cream/70 transition-colors no-underline">Terms</Link>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-11 h-11 inline-flex items-center justify-center border border-cream/20 text-cream/70 hover:bg-gold hover:text-charcoal hover:border-gold transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
}