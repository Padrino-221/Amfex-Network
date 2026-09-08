import { getSiteSettings } from "@/lib/cms";
import { settingRow, settingValue } from "@/lib/settingsUtils";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard, PulsingIcon } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionComponents";
import { GraduationCap, Briefcase } from "lucide-react";

type EducationItem = {
  id?: string;
  institution?: string;
  degree?: string;
  org?: string;
  title?: string;
  period: string;
  description: string;
};

type WorkItem = {
  id?: string;
  company?: string;
  role?: string;
  org?: string;
  title?: string;
  period: string;
  description: string;
};

type JourneySetting = { education?: EducationItem[]; work?: WorkItem[] };

const defaultEducation: EducationItem[] = [
  { institution: "University of Energy and Natural Resources", degree: "BSc. Information Technology", period: "2016 - 2020", description: "First-class honors. Specialized in software development and IT management." },
  { institution: "Kwame Nkrumah University of Science and Technology", degree: "MSc. Computer Science", period: "2021 - 2023", description: "Postgraduate studies in artificial intelligence and educational technology." },
];

const defaultWork: WorkItem[] = [
  { company: "Amfex Network", role: "Founder & CEO", period: "2018 - Present", description: "Leading a technology consulting firm providing IT solutions, web development, and digital transformation." },
  { company: "University of Energy and Natural Resources", role: "Senior Technician", period: "2020 - Present", description: "Managing IT infrastructure and providing technical support for academic programs." },
  { company: "Generals' Hub", role: "Founder", period: "2019 - Present", description: "Educational technology platform for youth development and mentorship." },
];

export default async function Journey() {
  const settings = await getSiteSettings();
  const education = settingRow(settings, "journey_education", defaultEducation);
  const work = settingRow(settings, "journey_work", defaultWork);

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-premium">
        <Reveal>
          <SectionHeader
            kicker={settingValue(settings, "home_journey_kicker", "Experience")}
            heading={settingValue(settings, "home_journey_heading", "Where I've been.")}
            description={settingValue(settings, "home_journey_description", "Education and work experience shaping a career at the intersection of technology and purpose.")}
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="text-lg font-semibold text-charcoal mb-6 flex items-center gap-3">
                <AnimatedIcon hoverRotate={12} className="size-11 rounded-xl bg-red/10 flex items-center justify-center text-red">
                  <GraduationCap className="w-5 h-5" strokeWidth={1.75} />
                </AnimatedIcon>
                Education
              </h3>
            </Reveal>
            <RevealStagger className="space-y-4">
              {education.map((edu, index) => (
                <RevealItem key={edu.id || index} direction="up">
                  <LiftCard className="h-full">
                    <div className="card-premium p-6 h-full">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-base font-semibold text-charcoal">{edu.institution || edu.org}</h4>
                        <span className="pill-tag whitespace-nowrap shrink-0 text-[11px] py-1 px-3">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-charcoal/75 mb-2">{edu.degree || edu.title}</p>
                      <p className="text-sm text-charcoal/65 leading-relaxed">{edu.description}</p>
                    </div>
                  </LiftCard>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          <div>
            <Reveal>
              <h3 className="text-lg font-semibold text-charcoal mb-6 flex items-center gap-3">
                <AnimatedIcon hoverRotate={12} className="size-11 rounded-xl bg-gold/15 flex items-center justify-center text-gold-warm">
                  <Briefcase className="w-5 h-5" strokeWidth={1.75} />
                </AnimatedIcon>
                Work Experience
              </h3>
            </Reveal>
            <RevealStagger className="space-y-4">
              {work.map((item, index) => (
                <RevealItem key={item.id || index} direction="up">
                  <LiftCard className="h-full">
                    <div className="card-premium p-6 h-full">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-base font-semibold text-charcoal">{item.company || item.org}</h4>
                        <span className="pill-tag whitespace-nowrap shrink-0 text-[11px] py-1 px-3">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-charcoal/75 mb-2">{item.role || item.title}</p>
                      <p className="text-sm text-charcoal/65 leading-relaxed">{item.description}</p>
                    </div>
                  </LiftCard>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}