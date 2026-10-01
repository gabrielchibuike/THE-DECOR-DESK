"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { stylesList } from "@/data/styles";

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
  const [roomsDropdownOpen, setRoomsDropdownOpen] = useState(false);
  const [stylesDropdownOpen, setStylesDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const pathname = usePathname();

  const dbRooms = categories ? categories.filter((c) => !c.type || c.type === 'room') : [];
  const rooms = dbRooms.length > 0 ? dbRooms : [
    { id: "r1", name: "Bathroom", slug: "bathrooms" },
    { id: "r2", name: "Bedroom", slug: "Bedroom-ideas" },
    { id: "r3", name: "Living Room", slug: "living-room-ideas" },
    { id: "r4", name: "Kitchen", slug: "kitchen-ideas" },
    { id: "r5", name: "Laundry", slug: "laundry-room-ideas" },
    { id: "r6", name: "Apartment", slug: "apartment-living-room-ideas" },
  ];

  const styles = stylesList;

  const shopCategories = [
    { name: "Bedroom Finds", href: "/shop-my-finds/bedroom-finds" },
    { name: "Living Room Finds", href: "/shop-my-finds/living-room-finds" },
    { name: "Bathroom Finds", href: "/shop-my-finds/bathroom-finds" },
    { name: "Kitchen Finds", href: "/shop-my-finds/kitchen-finds" },
    { name: "Lighting", href: "/shop-my-finds/lighting" },
    { name: "Organization", href: "/shop-my-finds/organization" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeAllDropdowns = () => {
    setRoomsDropdownOpen(false);
    setStylesDropdownOpen(false);
    setShopDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-taupe-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="group" onClick={closeAllDropdowns}>
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-black group-hover:text-brand-taupe-dark transition-colors duration-300">
                THE DECOR <span className="text-brand-taupe font-normal font-sans text-lg tracking-widest uppercase ml-1">DESK</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav: Home | Rooms | Styles | Shop My Finds | Free Resources | About */}
          <nav className="hidden md:flex space-x-7 items-center">
            <Link
              href="/"
              className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${
                isActive("/") && pathname === "/" ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"
              }`}
            >
              Home
            </Link>

            {/* Rooms Dropdown */}
            <div className="relative">
              <div className="flex items-center space-x-1">
                <Link
                  href="/rooms"
                  onClick={closeAllDropdowns}
                  className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${
                    isActive("/rooms") ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"
                  }`}
                >
                  Rooms
                </Link>
                <button
                  onClick={() => {
                    setRoomsDropdownOpen(!roomsDropdownOpen);
                    setStylesDropdownOpen(false);
                    setShopDropdownOpen(false);
                  }}
                  className="text-brand-charcoal/70 hover:text-brand-black focus:outline-none p-1"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${roomsDropdownOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {roomsDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeAllDropdowns} />
                  <div className="absolute left-0 mt-3 w-52 rounded-md shadow-xl bg-brand-warmwhite border border-brand-taupe-light z-20 py-2 origin-top-left">
                    <Link href="/rooms" onClick={closeAllDropdowns} className="block px-4 py-2 text-xs font-semibold text-brand-black bg-brand-cream border-b border-brand-taupe-light/50 mb-1">
                      All Rooms Overview
                    </Link>
                    {rooms.map((room) => (
                      <Link
                        key={room.id}
                        href={`/blog/${room.slug}`}
                        onClick={closeAllDropdowns}
                        className="block px-4 py-1.5 text-xs text-brand-charcoal hover:bg-brand-cream hover:text-brand-black transition-colors"
                      >
                        {room.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Styles Dropdown */}
            <div className="relative">
              <div className="flex items-center space-x-1">
                <Link
                  href="/styles"
                  onClick={closeAllDropdowns}
                  className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${
                    isActive("/styles") ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"
                  }`}
                >
                  Styles
                </Link>
                <button
                  onClick={() => {
                    setStylesDropdownOpen(!stylesDropdownOpen);
                    setRoomsDropdownOpen(false);
                    setShopDropdownOpen(false);
                  }}
                  className="text-brand-charcoal/70 hover:text-brand-black focus:outline-none p-1"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${stylesDropdownOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {stylesDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeAllDropdowns} />
                  <div className="absolute left-0 mt-3 w-52 rounded-md shadow-xl bg-brand-warmwhite border border-brand-taupe-light z-20 py-2 origin-top-left">
                    <Link href="/styles" onClick={closeAllDropdowns} className="block px-4 py-2 text-xs font-semibold text-brand-black bg-brand-cream border-b border-brand-taupe-light/50 mb-1">
                      All Design Styles
                    </Link>
                    {styles.map((style) => (
                      <Link
                        key={style.slug}
                        href={`/styles/${style.slug}`}
                        onClick={closeAllDropdowns}
                        className="block px-4 py-1.5 text-xs text-brand-charcoal hover:bg-brand-cream hover:text-brand-black transition-colors"
                      >
                        {style.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Shop My Finds Dropdown */}
            <div className="relative">
              <div className="flex items-center space-x-1">
                <Link
                  href="/shop-my-finds"
                  onClick={closeAllDropdowns}
                  className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${
                    isActive("/shop-my-finds") || isActive("/shop") ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"
                  }`}
                >
                  Shop My Finds
                </Link>
                <button
                  onClick={() => {
                    setShopDropdownOpen(!shopDropdownOpen);
                    setRoomsDropdownOpen(false);
                    setStylesDropdownOpen(false);
                  }}
                  className="text-brand-charcoal/70 hover:text-brand-black focus:outline-none p-1"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {shopDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeAllDropdowns} />
                  <div className="absolute left-0 mt-3 w-48 rounded-md shadow-xl bg-brand-warmwhite border border-brand-taupe-light z-20 py-2 origin-top-left">
                    <Link href="/shop-my-finds" onClick={closeAllDropdowns} className="block px-4 py-2 text-xs font-semibold text-brand-black bg-brand-cream border-b border-brand-taupe-light/50 mb-1">
                      View All Finds
                    </Link>
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={closeAllDropdowns}
                        className="block px-4 py-1.5 text-xs text-brand-charcoal hover:bg-brand-cream hover:text-brand-black transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link
              href="/free-resources"
              className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${
                isActive("/free-resources") ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"
              }`}
            >
              Free Resources
            </Link>

            <Link
              href="/about"
              className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 hover:text-brand-black ${
                isActive("/about") ? "text-brand-black border-b-2 border-brand-taupe pb-1" : "text-brand-charcoal/70"
              }`}
            >
              About
            </Link>
          </nav>

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
          <div className="px-4 pt-3 pb-6 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") && pathname === "/" ? "bg-brand-taupe-light text-brand-black" : "text-brand-charcoal hover:bg-brand-taupe-light/50"}`}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/rooms") ? "bg-brand-taupe-light text-brand-black" : "text-brand-charcoal hover:bg-brand-taupe-light/50"}`}
            >
              Rooms
            </Link>
            <Link
              href="/styles"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/styles") ? "bg-brand-taupe-light text-brand-black" : "text-brand-charcoal hover:bg-brand-taupe-light/50"}`}
            >
              Styles
            </Link>
            <Link
              href="/shop-my-finds"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/shop-my-finds") ? "bg-brand-taupe-light text-brand-black" : "text-brand-charcoal hover:bg-brand-taupe-light/50"}`}
            >
              Shop My Finds
            </Link>
            <Link
              href="/free-resources"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/free-resources") ? "bg-brand-taupe-light text-brand-black" : "text-brand-charcoal hover:bg-brand-taupe-light/50"}`}
            >
              Free Resources
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/about") ? "bg-brand-taupe-light text-brand-black" : "text-brand-charcoal hover:bg-brand-taupe-light/50"}`}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
