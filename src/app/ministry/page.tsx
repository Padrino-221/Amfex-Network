import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Ministry from "@/components/Ministry";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ministry | Generals' Hub — Emmanuel Amful Owusu",
  description:
    "Developing People. Awakening Purpose. Raising Generations through Generals' Hub.",
};

const related = [
  {
    label: "SEDES Framework",
    href: "/sedes",
    description: "A framework for self-governance and leadership.",
  },
  {
    label: "Journal",
    href: "/journal",
    description: "Thoughts on faith, ministry and leadership.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch for ministry partnerships.",
  },
];

export default function MinistryPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
                label="Ministry"
        title="Generals' Hub"
        description="Developing People. Awakening Purpose. Raising Generations."
        breadcrumbs={[{ label: "Ministry", href: "/ministry" }]}
      />
      <Ministry />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}
