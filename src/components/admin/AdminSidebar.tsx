"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, FileText, Package, Tags, Users, BarChart3,
  LogOut, ExternalLink, Sparkles, Menu, X
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Subscribers", href: "/admin/subscribers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-brand-warmwhite border-b border-brand-taupe-light shrink-0">
        <Link href="/admin" className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-taupe-dark" />
          <div>
            <p className="font-serif text-sm font-bold text-brand-black leading-tight">THE DECOR DESK</p>
            <p className="text-[9px] font-sans uppercase tracking-widest text-brand-taupe">Admin Panel</p>
          </div>
        </Link>
        <button onClick={() => setIsOpen(true)} className="p-2 -mr-2 text-brand-charcoal hover:text-brand-black">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 bg-brand-warmwhite border-r border-brand-taupe-light flex flex-col shrink-0
        transition-transform duration-300 ease-in-out transform 
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-brand-taupe-light flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Sparkles className="w-4 h-4 text-brand-taupe-dark" />
            <div>
              <p className="font-serif text-sm font-bold text-brand-black leading-tight">THE DECOR DESK</p>
              <p className="text-[9px] font-sans uppercase tracking-widest text-brand-taupe">Admin Panel</p>
            </div>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-brand-charcoal hover:text-brand-black">
            <X className="w-5 h-5" />
          </button>
        </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
              isActive(href)
                ? "bg-brand-black text-brand-cream"
                : "text-brand-charcoal/70 hover:bg-brand-cream hover:text-brand-black"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-brand-taupe-light space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-brand-charcoal/60 hover:text-brand-black transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Live Site
        </Link>
        <div className="text-[10px] text-brand-charcoal/40 truncate">{userEmail}</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-brand-charcoal/60 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
    </>
  );
}
