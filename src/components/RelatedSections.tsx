import Link from "next/link";
import { Reveal, RevealStagger, RevealItem } from "@/components/Motion";
import { ArrowIcon } from "@/components/SectionComponents";

interface RelatedItem {
  label: string;
  href: string;
  description: string;
}

interface RelatedSectionsProps {
  title?: string;
  items: RelatedItem[];
}

export default function RelatedSections({ title = "Explore More", items }: RelatedSectionsProps) {
  return (
    <section className="section-padding bg-cream">
      <div className="container-premium">
        <Reveal>
          <span className="kicker">{title}</span>
          <h2 className="section-title-dark mt-3 mb-10">Keep exploring.</h2>
        </Reveal>

        <RevealStagger className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <RevealItem key={item.label} direction="up">
              <Link
                href={item.href}
                className="card-premium group block p-8 h-full no-underline"
              >
                <h3 className="text-2xl font-medium text-charcoal mb-2 group-hover:text-red transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-charcoal/70 mb-6 leading-relaxed">{item.description}</p>
                <span className="inline-flex items-center gap-2 text-charcoal font-semibold text-sm">
                  Learn more
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:text-gold" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}