import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Sedes from "@/components/Sedes";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SEDES Framework | Leadership Begins with Self-Governance — Emmanuel Amful Owusu",
  description:
    "A framework for understanding the self, leadership, development and impact. Leadership begins with the governance of the self.",
};

const related = [
  {
    label: "Ministry",
    href: "/ministry",
    description: "Generals' Hub — Developing People and Purpose.",
  },
  {
    label: "Academia",
    href: "/academia",
    description: "Practical technology education at UENR.",
  },
  {
    label: "Books & Store",
    href: "/books",
    description: "Written works on leadership and identity.",
  },
];

export default function SedesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
                label="Frameworks"
        title="The SEDES"
        highlight="Framework"
        description="A Framework for Understanding the Self, Leadership, Development and Impact."
        breadcrumbs={[{ label: "SEDES", href: "/sedes" }]}
      />
      <Sedes />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}
