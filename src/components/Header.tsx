"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  type?: 'room' | 'style';
}

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [decorDropdownOpen, setDecorDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shopping Guides", href: "/shopping-guides" },
    { name: "Free Resources", href: "/free-resources" },
    { name: "Digital Products", href: "/digital-products" },
    { name: "About", href: "/about" },
  ];

  const shopCategories = [
    { name: "Bedroom Finds", href: "/shop-my-finds/bedroom-finds" },
    { name: "Living Room Finds", href: "/shop-my-finds/living-room-finds" },
    { name: "Bathroom Finds", href: "/shop-my-finds/bathroom-finds" },
    { name: "Kitchen Finds", href: "/shop-my-finds/kitchen-finds" },
    { name: "Lighting", href: "/shop-my-finds/lighting" },
    { name: "Organization", href: "/shop-my-finds/organization" },
  ];

  // Static room/style lists matching the actual DB slugs — no DB migration required
  const rooms = [
    { id: "r1", name: "Bathroom",    slug: "bathroom-ideas" },
    { id: "r2", name: "Bedroom",     slug: "bedroom-ideas" },
    { id: "r3", name: "Living Room", slug: "living-room-ideas" },
    { id: "r4", name: "Kitchen",     slug: "kitchen-ideas" },
    { id: "r5", name: "Laundry",     slug: "laundry-room-ideas" },
    { id: "r6", name: "Apartment",   slug: "apartment-living-room-ideas" },
  ];

  const styles = categories.filter(c => c.type === 'style');

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
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link, idx) => {
              if (idx === 1) { // Insert dropdowns after Home
                return (
                  <div key="dropdowns" className="flex items-center space-x-6">
                    {/* Decor Ideas Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => { setDecorDropdownOpen(!decorDropdownOpen); setShopDropdownOpen(false); }}
                        className="flex items-center space-x-1 text-[13px] font-medium tracking-wide uppercase text-brand-charcoal/70 hover:text-brand-black transition-colors duration-200 focus:outline-none"
                      >
                        <span>Decor Ideas</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${decorDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {decorDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setDecorDropdownOpen(false)} />
                          <div className="absolute left-0 mt-3 w-[400px] rounded-md shadow-xl bg-brand-warmwhite border border-brand-taupe-light z-20 p-4 origin-top-left flex gap-6">
                            <div className="flex-1">
                              <h4 className="text-[10px] font-semibold text-brand-taupe-dark uppercase tracking-widest mb-2 border-b border-brand-taupe-light/50 pb-1">By Room</h4>
                              {rooms.map((cat) => (
                                <Link key={cat.id} href={`/blog/${cat.slug}`} onClick={() => setDecorDropdownOpen(false)} className="block py-1.5 text-xs text-brand-charcoal hover:text-brand-black transition-colors">
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-[10px] font-semibold text-brand-taupe-dark uppercase tracking-widest mb-2 border-b border-brand-taupe-light/50 pb-1">By Style</h4>
                              {styles.map((cat) => (
                                <Link key={cat.id} href={`/blog/${cat.slug}`} onClick={() => setDecorDropdownOpen(false)} className="block py-1.5 text-xs text-brand-charcoal hover:text-brand-black transition-colors">
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {/* Shop My Finds Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => { setShopDropdownOpen(!shopDropdownOpen); setDecorDropdownOpen(false); }}
                        className="flex items-center space-x-1 text-[13px] font-medium tracking-wide uppercase text-brand-charcoal/70 hover:text-brand-black transition-colors duration-200 focus:outline-none"
                      >
                        <span>Shop My Finds</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {shopDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShopDropdownOpen(false)} />
                          <div className="absolute left-0 mt-3 w-48 rounded-md shadow-xl bg-brand-warmwhite border border-brand-taupe-light z-20 py-2 origin-top-left">
                            <Link href="/shop-my-finds" onClick={() => setShopDropdownOpen(false)} className="block px-4 py-2 text-xs font-semibold text-brand-black bg-brand-cream border-b border-brand-taupe-light/50 mb-1">
                              View All Finds
                            </Link>
                            {shopCategories.map((cat) => (
                              <Link key={cat.name} href={cat.href} onClick={() => setShopDropdownOpen(false)} className="block px-4 py-1.5 text-xs text-brand-charcoal hover:bg-brand-cream hover:text-brand-black transition-colors">
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <Link
                      href={link.href}
                      className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${isActive(link.href) ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"}`}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${isActive(link.href) ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"}`}
                >
                  {link.name}
                </Link>
              );
            })}
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
              <span className="px-3 text-[10px] font-semibold text-brand-taupe-dark uppercase tracking-widest block mb-1 mt-2">By Room</span>
              {rooms.map((cat) => (
                <Link key={cat.id} href={`/blog/${cat.slug}`} onClick={() => setIsOpen(false)} className="block px-6 py-1.5 text-sm text-brand-charcoal hover:bg-brand-taupe-light/50 rounded-md">
                  {cat.name}
                </Link>
              ))}
              <span className="px-3 text-[10px] font-semibold text-brand-taupe-dark uppercase tracking-widest block mb-1 mt-4">By Style</span>
              {styles.map((cat) => (
                <Link key={cat.id} href={`/blog/${cat.slug}`} onClick={() => setIsOpen(false)} className="block px-6 py-1.5 text-sm text-brand-charcoal hover:bg-brand-taupe-light/50 rounded-md">
                  {cat.name}
                </Link>
              ))}
              <span className="px-3 text-[10px] font-semibold text-brand-taupe-dark uppercase tracking-widest block mb-1 mt-4">Shop My Finds</span>
              {shopCategories.map((cat) => (
                <Link key={cat.name} href={cat.href} onClick={() => setIsOpen(false)} className="block px-6 py-1.5 text-sm text-brand-charcoal hover:bg-brand-taupe-light/50 rounded-md">
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
