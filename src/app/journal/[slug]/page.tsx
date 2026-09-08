import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPostBySlug } from "@/lib/cms";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <section className="bg-charcoal text-cream px-5 pt-36 pb-14 md:px-12 md:pt-44 lg:px-16 xl:px-20">
        <div className="relative z-10 mx-auto max-w-[900px]">
          <div className="flex items-center gap-3 mb-5">
            <span className="pill-tag-dark text-[11px]">{post.category}</span>
            <span className="text-xs text-cream/85">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <h1 className="font-display text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-cream/85 max-w-2xl">{post.excerpt}</p>
        </div>
      </section>

      <article className="mx-auto max-w-[900px] px-6 md:px-10 py-14">
        <div className="prose prose-charcoal max-w-none text-charcoal/80 leading-relaxed">
          {post.content.split("\n").map((line, i) => (
            line.trim() ? <p key={i} className="mb-4">{line}</p> : null
          ))}
        </div>
        <div className="mt-12 border-t border-charcoal/10 pt-6">
          <Link href="/journal" className="btn-secondary inline-flex">← Back to Journal</Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
