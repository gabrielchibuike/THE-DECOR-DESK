import fs from "fs";
import path from "path";

export interface PostFrontmatter {
  title: string;
  slug: string;
  category: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  publishDate: string;
  updatedDate: string;
  featured: boolean;
}

export interface BlogPost {
  frontmatter: PostFrontmatter;
  content: string;
}

const POSTS_DIRECTORY = path.join(process.cwd(), "src/data/posts");

export function parseFrontmatter(fileContent: string): { data: PostFrontmatter; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Invalid frontmatter format");
  }

  const yamlContent = match[1];
  const bodyContent = match[2];

  const data: Partial<PostFrontmatter> = {
    featured: false,
    keywords: []
  };

  const lines = yamlContent.split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes if present
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    if (key === "featured") {
      data.featured = val === "true";
    } else if (key === "keywords") {
      // Parse array e.g., [laundry room, organizing, shelving] or list format
      const cleanVal = val.replace(/[\[\]]/g, "");
      data.keywords = cleanVal.split(",").map(s => s.trim()).filter(Boolean);
    } else {
      (data as any)[key] = val;
    }
  }

  return {
    data: data as PostFrontmatter,
    content: bodyContent
  };
}

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(POSTS_DIRECTORY)) {
      return [];
    }
    const filenames = fs.readdirSync(POSTS_DIRECTORY);
    const posts = filenames
      .filter(name => name.endsWith(".mdx") || name.endsWith(".md"))
      .map(name => {
        const filePath = path.join(POSTS_DIRECTORY, name);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = parseFrontmatter(fileContent);
        return { frontmatter: data, content };
      });

    // Sort by publication date descending
    return posts.sort((a, b) => new Date(b.frontmatter.publishDate).getTime() - new Date(a.frontmatter.publishDate).getTime());
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find(p => p.frontmatter.slug === slug) || null;
}

export interface ContentSection {
  type: "markdown" | "product";
  content: string; // The raw markdown or the product ID
}

export function parsePostContent(content: string): ContentSection[] {
  const regex = /\[product:([\w-]+)\]/g;
  const sections: ContentSection[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const textBefore = content.substring(lastIndex, match.index);
    if (textBefore.trim()) {
      sections.push({ type: "markdown", content: textBefore });
    }
    sections.push({ type: "product", content: match[1] });
    lastIndex = regex.lastIndex;
  }

  const textAfter = content.substring(lastIndex);
  if (textAfter.trim()) {
    sections.push({ type: "markdown", content: textAfter });
  }

  return sections;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractH2s(markdown: string): { text: string; id: string }[] {
  const h2Regex = /^##\s+(.*)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;

  while ((match = h2Regex.exec(markdown)) !== null) {
    const text = match[1].trim();
    headings.push({
      text,
      id: slugify(text),
    });
  }

  return headings;
}

import { marked } from "marked";

export function renderMarkdown(markdown: string): string {
  // Parse standard markdown using marked
  let html = marked.parse(markdown) as string;

  // Post-process HTML to add IDs to H2 headings matching our slugify system
  const h2Regex = /<h2>(.*?)<\/h2>/g;
  html = html.replace(h2Regex, (match, headingText) => {
    // Strip inner HTML tags from heading text
    const cleanText = headingText.replace(/<[^>]*>/g, "");
    const id = slugify(cleanText);
    return `<h2 id="${id}" class="scroll-mt-24 font-serif text-2xl font-semibold mt-10 mb-4 text-brand-black">${headingText}</h2>`;
  });

  // Style lists, paragraphs, and links to fit the luxury magazine aesthetic
  html = html.replace(/<p>/g, '<p class="text-brand-charcoal/90 text-sm md:text-base leading-relaxed mb-6">');
  html = html.replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-2 mb-6 text-brand-charcoal/90 text-sm md:text-base">');
  html = html.replace(/<ol>/g, '<ol class="list-decimal pl-6 space-y-2 mb-6 text-brand-charcoal/90 text-sm md:text-base">');
  html = html.replace(/<li>/g, '<li class="leading-relaxed">');
  html = html.replace(/<a /g, '<a class="text-brand-taupe-dark font-medium underline hover:text-brand-black transition-colors duration-150" ');

  return html;
}

