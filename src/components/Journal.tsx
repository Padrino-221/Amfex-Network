import Link from "next/link";
import { getPosts } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard, PulsingIcon } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionComponents";

export default async function Journal() {
  const articles = await getPosts();

  return (
    <section id="journal" className="section-padding bg-cream">
      <div className="container-premium">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <SectionHeader
              kicker="Journal"
              heading={<>Ideas & <span className="font-light italic text-red">Reflections</span></>}
            />
            <Link href="/journal" className="btn-secondary shrink-0">
              View all articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <RevealStagger className="grid md:grid-cols-3 gap-6">
          {articles.length === 0 && <p className="text-sm text-charcoal/65">No articles yet — add them in the admin.</p>}
          {articles.map((article, idx) => (
            <RevealItem key={article.id} direction="up">
              <LiftCard className="h-full">
                <Link href={`/journal/${article.slug}`} className="card-premium group flex flex-col h-full p-6 no-underline">
                  <div className="flex items-center gap-2 mb-4">
                    <PulsingIcon className="w-1.5 h-1.5 bg-red shrink-0 grid place-items-center"><span className="w-1.5 h-1.5 bg-red block" /></PulsingIcon>
                    <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-red">{article.category}</span>
                    <span className="text-charcoal/15">—</span>
                    <span className="text-[11px] text-charcoal/65">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    <span className="ml-auto text-[11px] text-charcoal/80">{new Date(article.date).toLocaleDateString(undefined, { month: "short", year: "numeric" })} · {article.readTime}</span>
                  </div>
                  <h3 className="text-[22px] font-medium leading-snug text-charcoal group-hover:text-charcoal-deep transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/80 mt-3 line-clamp-3 flex-1">{article.excerpt}</p>
                  <div className="mt-6 flex items-center gap-2 text-[12px] font-bold tracking-[0.06em] uppercase text-charcoal border-t border-charcoal/5 pt-4">
                    <span>Read article</span>
                    <AnimatedIcon hoverRotate={12} className="w-6 h-px bg-charcoal/15 block"><span className="w-6 h-px bg-charcoal/15 block" /></AnimatedIcon>
                  </div>
                </Link>
              </LiftCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
