import { getBooks } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard } from "@/components/Motion";
import { BookOpen } from "lucide-react";

export default async function Books() {
  const books = await getBooks();

  return (
    <section id="books" className="section-padding bg-cream">
      <div className="container-premium">
        <Reveal>
          <div className="max-w-3xl mb-10">
            <span className="kicker">Library</span>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.04em] leading-[0.9] text-charcoal mt-3">
              The Emmanuel <span className="text-red font-light italic">Amful Library</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-charcoal/70 mt-4 max-w-2xl">
              Ideas worth reading, thoughts worth sharing — documenting ideas that can develop people.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid md:grid-cols-3 gap-6">
          {books.length === 0 && <p className="text-[16px] text-charcoal/70">No books yet — add them in the admin.</p>}
          {books.map((book, idx) => (
            <RevealItem key={book.id} direction="up">
              <LiftCard className="h-full">
                <div className="card-premium p-7 h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-5">
                    <AnimatedIcon hoverRotate={12} className="w-10 h-10 rounded bg-red text-white grid place-items-center">
                      <BookOpen className="w-5 h-5" />
                    </AnimatedIcon>
                    <span className="text-[11px] font-bold tracking-[0.12em] text-red">0{idx + 1}</span>
                  </div>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-gold">{book.category}</p>
                  <h3 className="text-[22px] font-bold leading-tight text-charcoal mt-2">{book.title}</h3>
                  <p className="text-[15px] leading-relaxed text-charcoal/70 mt-3 flex-1">{book.description}</p>
                  <span className="mt-6 text-[12px] font-bold tracking-[0.06em] uppercase text-charcoal flex items-center gap-2">
                    Explore <AnimatedIcon hoverRotate={12} className="w-5 h-px bg-charcoal/20 block"><span className="w-5 h-px bg-charcoal/20 block" /></AnimatedIcon>
                  </span>
                </div>
              </LiftCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
