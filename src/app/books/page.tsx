import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Books from "@/components/Books";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Books & Store | The Emmanuel Amful Library — Emmanuel Amful Owusu",
  description:
    "Ideas Worth Reading. Thoughts Worth Sharing. Knowledge Worth Passing On.",
};

const related = [
  {
    label: "Journal",
    href: "/journal",
    description: "Articles, essays and reflections.",
  },
  {
    label: "SEDES Framework",
    href: "/sedes",
    description: "A framework for self-governance and leadership.",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Free & premium resources for growth.",
  },
];

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
        label="Content"
        title="The Emmanuel"
        highlight="Amful Library"
        description="Ideas Worth Reading. Thoughts Worth Sharing. Knowledge Worth Passing On."
        breadcrumbs={[{ label: "Books & Store", href: "/books" }]}
      />
      <Books />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}


export const dynamic = "force-dynamic";
