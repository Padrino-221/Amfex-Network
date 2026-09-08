"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/admin-auth";
import { Dropdown } from "./dropdown";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  PenLine,
  BookOpen,
  Images,
  FileArchive,
  Mail,
  Settings,
  Users,
  LogOut,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const nav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Services", href: "/admin/services", icon: Sparkles },
  { name: "Journal", href: "/admin/posts", icon: PenLine },
  { name: "Books", href: "/admin/books", icon: BookOpen },
  { name: "Gallery", href: "/admin/gallery", icon: Images },
  { name: "Resources", href: "/admin/resources", icon: FileArchive },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "Users", href: "/admin/users", icon: Users, adminOnly: true },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  const initials = (user.full_name || user.email)
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-cream/10">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <div className="w-9 h-9 rounded flex items-center justify-center shrink-0">
            <Image src="/logo.png" alt="Amfex logo" width={36} height={36} className="w-full h-full object-contain" />
          </div>
          <div className="leading-none">
            <p className="text-cream font-bold text-sm leading-none uppercase tracking-wide">Amfex CMS</p>
            <p className="text-cream/85 text-[11px] leading-none mt-[2px]">Content Management</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav
          .filter((item) => !item.adminOnly || isAdmin)
          .map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium ${
                  active ? "bg-gold text-charcoal font-semibold" : "text-cream/75 hover:text-cream hover:bg-cream/10"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
                {item.name}
              </Link>
            );
          })}
      </nav>

      <div className="px-3 py-4 border-t border-cream/10">
        <Dropdown
          align="left"
          side="top"
          label="User menu"
          trigger={
            <span className="w-full flex items-center gap-3 px-1.5 py-2 rounded hover:bg-cream/10">
              <span className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-charcoal font-bold text-xs shrink-0">{initials}</span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-cream text-sm font-semibold truncate">{user.full_name}</span>
                <span className="block text-cream/85 text-xs capitalize">{user.role}</span>
              </span>
              <ChevronDown className="w-4 h-4 text-cream/70 shrink-0" />
            </span>
          }
          items={[
            { label: "View live site", icon: <ExternalLink className="w-4 h-4" />, onClick: () => window.open("/", "_blank") },
            { divider: true },
            { label: "Sign out", icon: <LogOut className="w-4 h-4" />, danger: true, onClick: logout },
          ]}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-charcoal z-40">{sidebar}</aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-charcoal">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        <div className="lg:hidden sticky top-0 z-30 bg-charcoal text-cream px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="font-bold uppercase tracking-wide text-sm">
            Amfex CMS
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5" aria-label="Toggle menu">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <main className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
