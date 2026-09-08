import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Journal from "@/components/Journal";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Journal | The Amful Journal — Emmanuel Amful Owusu",
  description:
    "Thoughts. Ideas. Lessons. Perspectives on technology, leadership, business, faith and everyday life.",
};

const related = [
  {
    label: "Books & Store",
    href: "/books",
    description: "Written works and publications.",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Free & premium resources for growth.",
  },
  {
    label: "Ministry",
    href: "/ministry",
    description: "Generals' Hub — Faith and Leadership.",
  },
];

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
        label="Blog"
        title="The Amful"
        highlight="Journal"
        description="Thoughts. Ideas. Lessons. Perspectives."
        breadcrumbs={[{ label: "Journal", href: "/journal" }]}
      />
      <Journal />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}


export const dynamic = "force-dynamic";
