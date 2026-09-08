import { Reveal, RevealStagger, RevealItem } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionComponents";

const dimensions = [
  { k: "01 — IDENTITY", t: "Who you are beyond labels and circumstance." },
  { k: "02 — PURPOSE", t: "Why you exist and how your gifts serve a greater good." },
  { k: "03 — DEVELOPMENT", t: "Grow intellectually, spiritually and professionally." },
  { k: "04 — IMPACT", t: "From discovery to contribution that outlives you." },
];

export default function Ministry() {
  return (
    <section id="ministry" className="section-padding bg-cream">
      <div className="container-premium">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="kicker justify-center">Ministry</span>
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.04em] leading-[0.9] text-charcoal mt-4">
              Generals’ Hub — <span className="text-red font-light italic">Developing People</span>
            </h2>
            <p className="text-[18px] leading-relaxed text-charcoal/70 mt-5 max-w-2xl mx-auto">
              Not gathering — <strong className="text-charcoal">developing</strong>. Identity, purpose and formation for young people.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="card-premium p-8 md:p-10 max-w-3xl mx-auto text-center bg-white">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-red mb-3">The Generals’ Vision</p>
            <p className="text-[20px] md:text-[24px] font-medium leading-tight text-charcoal">
              To raise a generation who know who they are, why they exist, and use what’s within them to <span className="text-red">transform their world.</span>
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid md:grid-cols-4 gap-4 mt-8">
          {dimensions.map((d) => (
            <RevealItem key={d.k} direction="up">
              <div className="card-premium p-6 h-full">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-gold">{d.k}</p>
                <p className="text-[15px] leading-relaxed text-charcoal/75 mt-3">{d.t}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <p className="text-center text-xs italic text-charcoal/40 mt-8">Inspiration starts the journey — formation sustains it.</p>
      </div>
    </section>
  );
}
