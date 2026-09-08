import Link from "next/link";
import { Reveal, Parallax } from "@/components/Motion";

interface PageHeroProps {
  label: string;
  title: string;
  highlight?: string;
  description: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageHero({
  label,
  title,
  highlight,
  description,
  breadcrumbs = [],
}: PageHeroProps) {
  return (
    <section className="relative min-h-[50svh] overflow-hidden bg-charcoal px-5 pt-36 pb-16 text-cream md:px-12 md:pt-44 md:pb-20 lg:px-16 xl:px-20">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(243,232,207,1) 1px, transparent 1px), linear-gradient(90deg, rgba(243,232,207,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <Parallax from={-20} to={20} className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[80px] pointer-events-none" >
        <div className="w-full h-full" />
      </Parallax>
      <Parallax from={20} to={-20} className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-red/[0.05] blur-[80px] pointer-events-none">
        <div className="w-full h-full" />
      </Parallax>

      <div className="relative z-10 mx-auto max-w-[1480px]">
        {breadcrumbs.length > 0 && (
          <Reveal delay={0} direction="down">
            <nav className="flex items-center gap-1.5 mb-10 text-xs">
              <Link href="/" className="text-cream/85 hover:text-gold transition-colors no-underline">
                Home
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/20">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-cream/85 font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-cream/85 hover:text-gold transition-colors no-underline">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <div className="max-w-3xl">
          <Reveal delay={0.05}><span className="kicker-light mb-6 inline-block">{label}</span></Reveal>
          <Reveal delay={0.12}>
            <h1 className="text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[0.9] tracking-[-0.05em] mb-5">
              {title}{" "}
              {highlight && <span className="text-gold">{highlight}</span>}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[18px] md:text-[19px] font-normal text-cream/85 max-w-xl leading-relaxed">
              {description}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
