import { getSiteSettings } from "@/lib/cms";
import { settingValue, settingRow } from "@/lib/settingsUtils";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard, PulsingIcon } from "@/components/Motion";

export default async function About() {
  const settings = await getSiteSettings();
  const title = settingValue(settings, "home_about_heading", "Technology, education, and leadership — united.");
  const description = settingValue(
    settings,
    "home_about_description",
    "I'm the Founder and CEO of Amfex Network, a Senior Technician at the University of Energy and Natural Resources, and the creator of the SEDES Framework. My work sits at the crossroads of technology, education, leadership, and purpose — building systems that empower people and organizations across Ghana and beyond."
  );
  const stats = settingRow(settings, "home_stats", [
    { v: "8+", l: "years in the field" },
    { v: "200+", l: "projects delivered" },
    { v: "1000+", l: "lives touched" },
  ]);

  return (
    <section className="bg-charcoal py-16 md:py-24 text-cream relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-premium relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left — Circular Design */}
        <Reveal direction="left">
          <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-full bg-gold">
            <div className="absolute inset-[12%] rounded-full border-2 border-charcoal/20" />
            <div className="absolute inset-[27%] rounded-full bg-charcoal" />
            <div className="absolute left-1/2 top-0 h-full w-px rotate-45 bg-charcoal/20" />
            <p className="absolute inset-[27%] z-10 grid place-items-center text-center text-[clamp(1.3rem,6vw,3rem)] font-semibold leading-[.9] tracking-[-0.055em] text-gold">
              Purpose<br />driven.
            </p>
          </div>
        </Reveal>

        {/* Right — Content */}
        <Reveal direction="right">
          <span className="kicker-light mb-6">{settingValue(settings, "home_about_kicker", "About me")}</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-[0.95] tracking-[-0.04em] mb-6 sm:mb-8">{title}</h2>
          <p className="mb-8 max-w-2xl text-[17px] leading-relaxed text-cream/85 sm:text-lg">{description}</p>

          <RevealStagger className="grid grid-cols-3 gap-6 border-t border-cream/15 pt-10 text-center">
            {stats.map((stat) => (
              <RevealItem key={stat.l} direction="up">
                <LiftCard>
                  <div>
                    <PulsingIcon className="block">
                      <strong className="block text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gold mb-2">{stat.v}</strong>
                    </PulsingIcon>
                    <span className="text-xs uppercase tracking-widest text-cream/85">{stat.l}</span>
                  </div>
                </LiftCard>
              </RevealItem>
            ))}
          </RevealStagger>
        </Reveal>
      </div>
    </section>
  );
}