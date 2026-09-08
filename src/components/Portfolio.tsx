import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionComponents";

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <section id="work" className="overflow-hidden bg-cream py-16 md:py-24">
      <div className="container-premium">
        <Reveal>
          <SectionHeader
            kicker="Work showcase"
            heading="Projects that deliver results."
            description="Selected work across software, consultancy and digital transformation."
          />
        </Reveal>

        <RevealStagger className="grid md:grid-cols-3 gap-6">
          {projects.length === 0 && <p className="text-sm text-charcoal/65">No projects yet — add them in the admin.</p>}
          {projects.map((project, idx) => (
            <RevealItem key={project.id} direction="up">
              <LiftCard className="h-full">
                <Link href="/business" className="card-premium overflow-hidden h-full group flex flex-col no-underline">
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                    <Image
                      src={project.image || "/GEN AMFUL.png"}
                      alt={project.title}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-[11px] font-bold tracking-[0.12em] text-red uppercase">{String(idx + 1).padStart(2, "0")} — {project.category}</span>
                      <span className="h-px flex-1 bg-charcoal/10" />
                    </div>
                    <h3 className="text-[22px] font-medium leading-tight text-charcoal group-hover:text-charcoal-deep transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal/60 mt-3 line-clamp-2 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {(project.tags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="pill-tag !py-1 !px-2 !text-[10px] !bg-cream !border-charcoal/10 !text-charcoal/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-[13px] font-bold tracking-[0.06em] uppercase text-charcoal group-hover:text-gold transition-colors">
                      <span>View project</span>
                      <AnimatedIcon hoverRotate={12} className="w-5 h-px bg-charcoal/20 block"><span className="w-5 h-px bg-charcoal/20 block" /></AnimatedIcon>
                    </div>
                  </div>
                </Link>
              </LiftCard>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-10 text-center">
          <Link href="/business" className="btn-secondary inline-flex">
            See all projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
