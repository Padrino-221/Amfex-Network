import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Academia from "@/components/Academia";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Academia | University of Energy and Natural Resources — Emmanuel Amful Owusu",
  description:
    "Practical technology education at UENR. From consumers to creators, knowledge to application.",
};

const related = [
  {
    label: "Business",
    href: "/business",
    description: "Amfex Network — IT Solutions and Consultancy.",
  },
  {
    label: "SEDES Framework",
    href: "/sedes",
    description: "A framework for self-governance and leadership.",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Free & premium resources for students.",
  },
];

export default function AcademiaPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
                label="Academia"
        title="University of Energy and"
        highlight="Natural Resources"
        description="Practical technology education. From consumers to creators, learners to builders, knowledge to application."
        breadcrumbs={[{ label: "Academia", href: "/academia" }]}
      />
      <Academia />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}
