import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard, PulsingIcon } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionComponents";

const highlights = [
  { label: "Programming", sub: "Python · JS/TS" },
  { label: "Artificial Intelligence", sub: "Applied AI" },
  { label: "Data Analysis", sub: "Research" },
  { label: "Multimedia", sub: "Design & Media" },
];

export default function Academia() {
  return (
    <section id="academia" className="section-padding bg-white">
      <div className="container-premium">
        <Reveal>
          <SectionHeader
            kicker="Academia"
            heading={<>University of Energy and <span className="text-red">Natural Resources</span></>}
            description="Senior Technician · ITDS-UENR — from theory to tangible systems."
          />
        </Reveal>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
          <Reveal>
            <LiftCard className="h-full">
              <div className="relative">
                <div className="card-premium p-8 md:p-10 bg-cream border-charcoal/10">
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-red mb-4">Philosophy</p>
                  <blockquote className="text-[28px] md:text-[34px] font-bold leading-[0.95] tracking-[-0.04em] text-charcoal">
                    “Education must <span className="text-red">move beyond</span> knowing to doing.”
                  </blockquote>
                  <p className="text-[16px] leading-relaxed text-charcoal/70 mt-6">
                    Industry asks <em className="font-semibold text-charcoal">“Can you build it?”</em> — Academia asks{" "}
                    <em className="font-semibold text-charcoal">“Do you understand it?”</em> The future belongs to those who can answer both.
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="h-1 flex-1 bg-gold" />
                  <span className="h-1 flex-1 bg-charcoal" />
                  <span className="h-1 flex-1 bg-red/60" />
                </div>
              </div>
            </LiftCard>
          </Reveal>

          <div className="space-y-5">
            <Reveal>
              <div className="card-premium p-6">
                <h3 className="text-[13px] font-bold tracking-[0.12em] uppercase text-charcoal mb-4">Areas of Engagement</h3>
                <RevealStagger className="grid grid-cols-2 gap-3">
                  {highlights.map((h) => (
                    <RevealItem key={h.label} direction="up">
                      <LiftCard className="h-full">
                        <div className="p-4 rounded bg-cream border border-charcoal/5 h-full">
                          <div className="flex items-center gap-2 mb-1">
                            <AnimatedIcon hoverRotate={12} className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 grid place-items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold block" />
                            </AnimatedIcon>
                            <p className="text-[13px] font-bold leading-tight text-charcoal">{h.label}</p>
                          </div>
                          <p className="text-xs text-charcoal/50 mt-1">{h.sub}</p>
                        </div>
                      </LiftCard>
                    </RevealItem>
                  ))}
                </RevealStagger>
              </div>
            </Reveal>
            <Reveal>
              <LiftCard className="h-full">
                <div className="card-premium p-6 bg-charcoal text-cream h-full">
                  <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold mb-3">Next Generation</h3>
                  <p className="text-[16px] leading-relaxed text-cream/85">Young people must move from consumers → <strong className="text-cream">creators</strong>.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                    <LiftCard className="py-3 rounded bg-cream/5 border border-cream/10">
                      <div>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-cream/40">Learners</p>
                        <PulsingIcon className="text-gold text-lg mt-1 grid place-items-center"><span>→</span></PulsingIcon>
                        <p className="text-sm font-bold text-cream">Builders</p>
                      </div>
                    </LiftCard>
                    <LiftCard className="py-3 rounded bg-cream/5 border border-cream/10">
                      <div>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-cream/40">Knowledge</p>
                        <PulsingIcon className="text-gold text-lg mt-1 grid place-items-center"><span>→</span></PulsingIcon>
                        <p className="text-sm font-bold text-cream">Application</p>
                      </div>
                    </LiftCard>
                  </div>
                </div>
              </LiftCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
