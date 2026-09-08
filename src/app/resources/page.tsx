import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Resources from "@/components/Resources";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Resources | The Amful Resource Centre — Emmanuel Amful Owusu",
  description:
    "Free & premium resources for students, entrepreneurs, leaders, ministers and creators.",
};

const related = [
  {
    label: "Books & Store",
    href: "/books",
    description: "Written works and publications.",
  },
  {
    label: "Academia",
    href: "/academia",
    description: "Practical technology education at UENR.",
  },
  {
    label: "Journal",
    href: "/journal",
    description: "Articles, essays and reflections.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
        label="Resources"
        title="The Amful"
        highlight="Resource Centre"
        description="Free & Premium Resources for People Who Want to Grow."
        breadcrumbs={[{ label: "Resources", href: "/resources" }]}
      />
      <Resources />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}


export const dynamic = "force-dynamic";
