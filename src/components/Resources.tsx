import { getResources } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard } from "@/components/Motion";
import { FileDown, ArrowUpRight } from "lucide-react";

export default async function Resources() {
  const resources = await getResources();

  return (
    <section id="resources" className="section-padding bg-cream">
      <div className="container-premium">
        <Reveal>
          <div className="max-w-3xl mb-10">
            <span className="kicker">Resources</span>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.04em] leading-[0.9] text-charcoal mt-3">
              Downloadable <span className="text-red font-light italic">Resources</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-charcoal/70 mt-4">Tools, documents and materials — free & premium for students, entrepreneurs and leaders.</p>
          </div>
        </Reveal>

        <RevealStagger className="space-y-3 max-w-4xl">
          {resources.length === 0 && <p className="text-[16px] text-charcoal/70">No resources yet — add them in the admin.</p>}
          {resources.map((r, idx) => (
            <RevealItem key={r.id} direction="up">
              <LiftCard className="h-full">
                <div className="card-premium p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 group">
                  <AnimatedIcon hoverRotate={12} className="hidden md:grid w-12 h-12 place-items-center rounded bg-charcoal text-gold shrink-0">
                    <FileDown className="w-5 h-5" />
                  </AnimatedIcon>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-red">{r.type}</span>
                      <span className="text-charcoal/20">·</span>
                      <span className="text-[11px] text-charcoal/40">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-[18px] font-semibold leading-tight text-charcoal">{r.title}</h3>
                    <p className="text-[15px] leading-relaxed text-charcoal/70 mt-1 line-clamp-2">{r.description}</p>
                  </div>
                  <a href={r.fileUrl || "#"} className="shrink-0 inline-flex items-center justify-center gap-2 border border-charcoal text-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded w-full sm:w-auto">
                    Download <AnimatedIcon hoverRotate={12} className="inline-flex"><ArrowUpRight className="w-3.5 h-3.5" /></AnimatedIcon>
                  </a>
                </div>
              </LiftCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
