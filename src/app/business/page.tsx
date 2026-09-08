import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Business from "@/components/Business";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";
import { getServices } from "@/lib/cms";

export const metadata = {
  title: "Business | Amfex Network — Emmanuel Amful Owusu",
  description:
    "IT Solutions, Creative Solutions, and IT Consultancy through Amfex Network. Technology-driven solutions for lasting value.",
};

const related = [
  {
    label: "Academia",
    href: "/academia",
    description: "Practical technology education at UENR.",
  },
  {
    label: "SEDES Framework",
    href: "/sedes",
    description: "A framework for self-governance and leadership.",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Free & premium resources for entrepreneurs.",
  },
];

export default async function BusinessPage() {
  const services = await getServices();
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
                label="Business"
        title="Amfex Network"
        description="IT Solutions, Creative Solutions, and IT Consultancy. Building technology-driven solutions for lasting value."
        breadcrumbs={[{ label: "Business", href: "/business" }]}
      />
      <Business services={services} />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}


export const dynamic = "force-dynamic";
