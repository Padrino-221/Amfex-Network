import { Reveal, RevealStagger, RevealItem } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionComponents";

const flow = [
  { n: "01", label: "Self", sub: "Governance within" },
  { n: "02", label: "Deposit", sub: "What’s within" },
  { n: "03", label: "Development", sub: "Becoming" },
  { n: "04", label: "Expression", sub: "How you show up" },
  { n: "05", label: "Impact", sub: "What outlives you" },
];

export default function Sedes() {
  return (
    <section id="sedes" className="section-padding bg-white">
      <div className="container-premium">
        <Reveal>
          <SectionHeader
            kicker="Framework"
            heading={<>SEDES — <span className="font-light italic text-red">Inside Out</span></>}
            description="Leadership begins with governance of the self. Order within → intentional influence without."
          />
        </Reveal>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {flow.map((s, i) => (
            <RevealItem key={s.label} direction="up">
              <div className="card-premium p-5 text-center h-full relative">
                <span className="text-[10px] font-bold tracking-[0.12em] text-gold">{s.n}</span>
                <p className="text-[16px] font-bold text-charcoal mt-1">{s.label}</p>
                <p className="text-xs text-charcoal/50 mt-1">{s.sub}</p>
                {i < flow.length - 1 && <span className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-gold/40 text-lg">→</span>}
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal>
          <div className="mt-8 card-premium p-7 bg-cream">
            <p className="text-[18px] md:text-[22px] font-medium leading-tight text-charcoal text-center">
              “You cannot <span className="text-red">sustainably build outward</span> what you have refused to build inward.”
            </p>
            <p className="text-xs text-charcoal/40 text-center mt-3">Central message — occupy the seat of governance within yourself first.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
