"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface HeadingItem {
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-brand-warmwhite border border-brand-taupe-light p-6 rounded-lg mb-8">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-brand-taupe-light/50">
        <List className="w-4 h-4 text-brand-taupe-dark" />
        <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-black">
          Table of Contents
        </h3>
      </div>
      <nav>
        <ul className="space-y-2.5">
          {headings.map((heading) => (
            <li key={heading.id} className="text-sm">
              <a
                href={`#${heading.id}`}
                className={`transition-colors duration-150 block py-0.5 hover:text-brand-black ${
                  activeId === heading.id
                    ? "text-brand-black font-semibold border-l-2 border-brand-taupe pl-3"
                    : "text-brand-charcoal/70 pl-3 border-l border-brand-taupe-light/30"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
