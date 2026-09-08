const marqueeItems = [
  "IT Solutions",
  "Web Development",
  "Consulting",
  "Academic Tech",
  "Leadership",
  "SEDES Framework",
  "Digital Transformation",
  "Youth Mentorship",
  "Full-Stack Dev",
  "Cloud & Infrastructure",
];

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-charcoal bg-gold py-4 text-charcoal" aria-label="Capabilities">
      <div className="capability-marquee-track">
        <div className="shrink-0 pr-8">
          <p className="flex items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.16em]">
            {marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                {item}
                <span>✦</span>
              </span>
            ))}
          </p>
        </div>
        <div className="shrink-0 pr-8" aria-hidden="true">
          <p className="flex items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.16em]">
            {marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                {item}
                <span>✦</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
