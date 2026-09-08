"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/admin-api";
import { PageHeader, Loading } from "@/components/admin/ui";
import { FolderKanban, Sparkles, PenLine, BookOpen, Images, FileArchive, Mail, Settings, ExternalLink } from "lucide-react";

const cards = [
  { label: "Projects", href: "/admin/projects", endpoint: "projects", icon: FolderKanban },
  { label: "Services", href: "/admin/services", endpoint: "services", icon: Sparkles },
  { label: "Journal", href: "/admin/posts", endpoint: "posts", icon: PenLine },
  { label: "Books", href: "/admin/books", endpoint: "books", icon: BookOpen },
  { label: "Gallery", href: "/admin/gallery", endpoint: "gallery", icon: Images },
  { label: "Resources", href: "/admin/resources", endpoint: "resources", icon: FileArchive },
  { label: "Messages", href: "/admin/messages", endpoint: "messages", icon: Mail },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const results = await Promise.all(
          cards.map((c) =>
            adminApi
              .listAll(c.endpoint)
              .then((rows) => [c.label, (rows as unknown[]).length] as const)
              .catch(() => [c.label, 0] as const)
          )
        );
        if (!active) return;
        setCounts(Object.fromEntries(results));
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your content. Select a section to edit." />

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <Link key={c.label} href={c.href} className="bg-white border border-charcoal/10 rounded-lg p-5 hover:border-charcoal/40 transition-colors no-underline">
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center text-gold-warm">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div className="text-3xl font-semibold text-charcoal">{counts[c.label] ?? 0}</div>
                  <div className="text-xs tracking-wide uppercase text-charcoal/65 mt-1">{c.label}</div>
                </Link>
              );
            })}
          </div>

          <div className="bg-white border border-charcoal/10 rounded-lg p-5 mt-6">
            <h3 className="text-sm font-semibold text-charcoal mb-1">Quick links</h3>
            <p className="text-xs text-charcoal/75 mb-3">Jump into editing or view the live site.</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/messages" className="inline-flex items-center gap-1.5 bg-cream border border-charcoal/10 px-3 py-2 text-xs font-medium hover:border-charcoal rounded no-underline text-charcoal">
                <Mail className="w-3.5 h-3.5" /> Messages
              </Link>
              <Link href="/admin/settings" className="inline-flex items-center gap-1.5 bg-cream border border-charcoal/10 px-3 py-2 text-xs font-medium hover:border-charcoal rounded no-underline text-charcoal">
                <Settings className="w-3.5 h-3.5" /> Site Settings
              </Link>
              <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-charcoal text-cream px-3 py-2 text-xs font-medium hover:bg-charcoal-deep rounded no-underline">
                <ExternalLink className="w-3.5 h-3.5" /> View live site
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
