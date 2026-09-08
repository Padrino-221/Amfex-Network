import { getServices } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionComponents";
import { Zap, Code2, Palette, Presentation, Users, Settings2, Brain, Briefcase, Rocket } from "lucide-react";

const icons = [Zap, Code2, Presentation, Users, Settings2, Brain, Briefcase, Rocket];

function getServiceIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes("it solutions")) return Code2;
  if (t.includes("creative")) return Palette;
  if (t.includes("consultancy")) return Briefcase;
  return icons[index % icons.length];
}

export default async function Services() {
  const services = await getServices();

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-premium">
        <Reveal>
          <SectionHeader
            kicker="Services"
            heading="What I can do for your organization."
            description="No fluff, just output — practical technology and leadership solutions."
          />
        </Reveal>

        <RevealStagger className="grid md:grid-cols-3 gap-6 mt-8">
          {services.length === 0 && <p className="text-sm text-charcoal/65">No services yet — add them in the admin.</p>}
          {services.map((service, i) => {
            const Icon = getServiceIcon(service.title, i);
            return (
              <RevealItem key={service.id} direction="up">
                <LiftCard className="h-full">
                  <div className="card-premium group p-7 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <AnimatedIcon hoverRotate={12} className="w-12 h-12 grid place-items-center rounded bg-charcoal text-gold group-hover:bg-gold group-hover:text-charcoal transition-colors">
                        <Icon className="w-6 h-6" strokeWidth={1.75} />
                      </AnimatedIcon>
                      <span className="text-[11px] font-bold tracking-[0.12em] text-gold border border-gold/20 px-2 py-1 rounded">{service.number}</span>
                    </div>
                    <h3 className="text-lg font-semibold leading-tight text-charcoal">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal/60 mt-3 flex-1">{service.description}</p>
                    <div className="mt-5 pt-4 border-t border-charcoal/5 flex flex-wrap gap-1.5">
                      {(service.tags || []).slice(0, 4).map((tag) => (
                        <span key={tag} className="text-[10px] font-bold tracking-[0.06em] uppercase text-charcoal/65 group-hover:text-charcoal/60 transition-colors">
                          {tag} {i < (service.tags?.length ?? 0) - 1 ? "·" : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </LiftCard>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
