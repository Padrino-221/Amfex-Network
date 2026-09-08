import type { Service } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard, PulsingIcon } from "@/components/Motion";
import { ArrowUpRight, Code2, Palette, Briefcase } from "lucide-react";

const principles = ["Innovation", "Collaboration", "Accountability", "Excellence", "Impact"];

const serviceIcons = {
  "IT Solutions": Code2,
  "Creative Solutions": Palette,
  "IT Consultancy": Briefcase,
} as const;

export default function Business({ services = [] }: { services?: Service[] }) {
  return (
    <section id="business" className="section-padding bg-cream">
      <div className="container-premium">
        <Reveal>
          <div className="max-w-3xl mb-12">
            <span className="kicker mb-4">Amfex Network — est. 2017</span>
            <h2 className="text-[32px] md:text-[42px] font-bold tracking-[-0.04em] leading-[0.95] text-charcoal">
              Building <span className="text-red">Technology.</span> Creating <span className="italic font-light">Possibilities.</span>
            </h2>
            <p className="text-[18px] leading-relaxed text-charcoal/75 mt-5 max-w-2xl">
              From <strong className="font-semibold text-charcoal">Amfex Graphics (2017)</strong> to{" "}
              <strong className="font-semibold text-charcoal">Amfex Network (2019)</strong> — expanded from design into IT training,
              software, hardware and consultancy.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid md:grid-cols-3 gap-6">
          {services.length === 0 && <p className="text-[16px] text-charcoal/70">No services yet — add them in the admin.</p>}
          {services.map((service) => {
            const Icon = (serviceIcons as Record<string, typeof Code2>)[service.title] ?? Code2;
            return (
              <RevealItem key={service.id} direction="up">
                <LiftCard className="h-full">
                  <div className="card-premium p-7 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <span className="text-xs font-mono font-bold tracking-wide text-red">{service.number}</span>
                      <AnimatedIcon hoverRotate={12} className="w-10 h-10 rounded bg-gold/15 grid place-items-center text-gold">
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </AnimatedIcon>
                    </div>
                    <h3 className="text-[20px] font-bold leading-tight tracking-[-0.02em] text-charcoal">{service.title}</h3>
                    <p className="text-[15px] leading-relaxed text-charcoal/70 mt-3 flex-1">{service.description}</p>
                    <div className="mt-6 pt-4 border-t border-charcoal/5 flex flex-wrap gap-x-3 gap-y-1">
                      {(service.tags || []).map((tag) => (
                        <span key={tag} className="text-[10px] font-bold tracking-[0.08em] uppercase text-charcoal/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </LiftCard>
              </RevealItem>
            );
          })}
        </RevealStagger>

        <Reveal>
          <div className="grid md:grid-cols-[1.4fr_0.6fr] gap-6 mt-8">
            <LiftCard className="h-full">
              <div className="card-premium p-7 md:p-8 flex flex-col justify-center h-full">
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-red mb-3">Business Philosophy</p>
                <p className="text-[20px] md:text-[22px] font-medium leading-tight text-charcoal">
                  Not merely exchange — <span className="font-bold text-charcoal">solve problems and create measurable value.</span>
                </p>
              </div>
            </LiftCard>
            <LiftCard className="h-full">
              <div className="card-premium p-7 bg-charcoal text-cream flex flex-col justify-center h-full">
                <div className="flex flex-wrap gap-2">
                  {principles.map((p) => (
                    <span key={p} className="text-[11px] font-bold tracking-[0.08em] uppercase text-gold border border-gold/20 px-2.5 py-1 rounded">
                      {p}
                    </span>
                  ))}
                </div>
                <a href="https://amfexnetwork.com" target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 justify-center">
                  Visit Amfex Network <AnimatedIcon hoverRotate={12} className="inline-flex"><ArrowUpRight className="w-4 h-4" /></AnimatedIcon>
                </a>
              </div>
            </LiftCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
