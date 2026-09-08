import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";
import { getSiteSetting } from "@/lib/cms";

export const metadata = {
  title: "Contact | Get in Touch — Emmanuel Amful Owusu",
  description:
    "Let's Connect. Build. Transform. Get in touch for business, academia, ministry or speaking engagements.",
};

const related = [
  {
    label: "Business",
    href: "/business",
    description: "Amfex Network — IT Solutions and Consultancy.",
  },
  {
    label: "Ministry",
    href: "/ministry",
    description: "Generals' Hub — Developing People and Purpose.",
  },
  {
    label: "SEDES Framework",
    href: "/sedes",
    description: "A framework for self-governance and leadership.",
  },
];

export default async function ContactPage() {
  const info = (await getSiteSetting<{ email?: string; phone?: string; location?: string }>("contact")) ?? {};
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
        label="Contact"
        title="Get in"
        highlight="Touch"
        description="Let's Connect. Build. Transform."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <Contact info={info} />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}


export const dynamic = "force-dynamic";
