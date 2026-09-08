import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import RelatedSections from "@/components/RelatedSections";
import Footer from "@/components/Footer";
import { getGalleryImages } from "@/lib/cms";

export const metadata = {
  title: "Gallery | The Journey in Pictures — Emmanuel Amful Owusu",
  description:
    "People. Projects. Places. Moments. The visual story behind Emmanuel's work.",
};

const related = [
  {
    label: "Business",
    href: "/business",
    description: "Amfex Network projects and engagements.",
  },
  {
    label: "Academia",
    href: "/academia",
    description: "Teaching and training at UENR.",
  },
  {
    label: "Ministry",
    href: "/ministry",
    description: "Generals' Hub events and programs.",
  },
];

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <PageHero
        label="Gallery"
        title="The Journey"
        highlight="in Pictures"
        description="People. Projects. Places. Moments."
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }]}
      />
      <Gallery images={images} />
      <RelatedSections title="Explore More" items={related} />
      <Footer />
    </main>
  );
}


export const dynamic = "force-dynamic";
