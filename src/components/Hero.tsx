import Image from "next/image";
import { getSiteSettings } from "@/lib/cms";
import { settingValue } from "@/lib/settingsUtils";
import { Reveal, AnimatedIcon } from "@/components/Motion";
import { HeroOrbs, AnimatedGoldName } from "@/components/HeroMotion";

export default async function Hero() {
  const settings = await getSiteSettings();
  const rawName = settingValue(settings, "hero_name", "Emmanuel");
  const tagline = settingValue(settings, "hero_tagline", "Turning vision into digital solutions that move businesses forward.");
  const subtagline = settingValue(settings, "hero_subtagline", "IT Consultant · Academic Technologist · Author · Leadership Mentor");
  const photo = settingValue(settings, "hero_photo", "/GEN AMFUL.png");
  const displayName = rawName.includes("Amful") ? rawName.trim() : `${rawName.trim()} Amful Owusu`;
  const heroFirstName = displayName.split(" ")[0];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-charcoal px-5 pb-14 pt-32 text-cream sm:pb-16 md:px-12 md:pt-40 lg:px-16 lg:pb-12 xl:px-20">
      <HeroOrbs />

      <div className="relative z-10 mx-auto grid w-full max-w-[1480px] gap-12 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div className="self-center lg:pb-10">
          <Reveal delay={0} direction="up">
            <h1 className="max-w-4xl text-[clamp(2.5rem,10vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.06em]">
              Hello, I&apos;m <AnimatedGoldName>{heroFirstName}</AnimatedGoldName>
            </h1>
          </Reveal>

          <Reveal delay={0.08} direction="up">
            <h2 className="mt-5 max-w-3xl text-[clamp(1.5rem,6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {tagline}
            </h2>
          </Reveal>

          <Reveal delay={0.16} direction="up">
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg">
              {subtagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#work" className="btn-gold group">
                <span>Explore my work</span>
                <AnimatedIcon hoverRotate={12} hoverScale={1.2}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </AnimatedIcon>
              </a>
              <a href="/contact" className="btn-outline-light group">
                <span>Start a conversation</span>
                <AnimatedIcon>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </AnimatedIcon>
              </a>
              <AnimatedIcon>
                <a href="#work" className="btn-icon-circle" aria-label="Scroll to work">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </a>
              </AnimatedIcon>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} direction="up" className="self-center">
          <figure className="group relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[1.75rem] border border-cream/10 bg-charcoal-deep sm:aspect-square sm:rounded-[2rem] lg:ml-auto">
                <Image
                  src={photo}
                  alt={displayName}
                  width={1667}
                  height={2048}
                  priority
                  className="h-full w-full object-cover object-[center_22%] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/20" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:gap-6 sm:p-6 md:p-8">
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.035em]">{displayName}</p>
                    <p className="mt-1 text-sm text-cream/85">Founder · Amfex Network</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-charcoal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </span>
                </figcaption>
              </figure>
        </Reveal>
      </div>
    </section>
  );
}
