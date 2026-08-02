"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Posts", href: "/blog" },
    { name: "About", href: "/about" },
    // { name: "Newsletter", href: "/newsletter" },
    // { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-taupe-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-black group-hover:text-brand-taupe-dark transition-colors duration-300">
                THE DECOR <span className="text-brand-taupe font-normal font-sans text-lg tracking-widest uppercase ml-1">DESK</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${isActive(link.href) ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-sm font-medium tracking-wide uppercase text-brand-charcoal/70 hover:text-brand-black transition-colors duration-200 focus:outline-none"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-3 w-64 rounded-md shadow-xl bg-brand-warmwhite border border-brand-taupe-light z-20 py-2 origin-top-right">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/blog/${cat.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-black transition-colors duration-150"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* <div className="hidden md:flex items-center space-x-4">
            <button aria-label="Search" className="text-brand-charcoal/70 hover:text-brand-black transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
          </div> */}

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-charcoal hover:text-brand-black focus:outline-none" aria-label="Toggle Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-taupe-light bg-brand-cream">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.href) ? "bg-brand-taupe-light text-brand-black" : "text-brand-charcoal hover:bg-brand-taupe-light/50"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-brand-taupe-light/50 my-2 pt-2">
              <span className="px-3 text-xs font-semibold text-brand-taupe-dark uppercase tracking-widest block mb-2">Categories</span>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-2 text-sm text-brand-charcoal hover:bg-brand-taupe-light/50 rounded-md"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
