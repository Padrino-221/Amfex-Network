export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "toggle"
  | "image"
  | "date"
  | "tags";

export interface ResourceField {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  help?: string;
  placeholder?: string;
  span?: 1 | 2;
}

export type ColumnKind = "text" | "number" | "date" | "badge";

export interface ResourceColumn {
  key: string;
  label: string;
  kind?: ColumnKind;
  /** When kind === "badge", render value directly. */
  badgeValue?: (row: Record<string, unknown>) => string;
}

export interface ResourceConfig {
  slug: string;
  table: string;
  label: string;
  singular: string;
  description: string;
  orderBy: string;
  fields: ResourceField[];
  columns: ResourceColumn[];
  searchFields: string[];
  hasPublished?: boolean;
  /** Field whose value is stored as a Postgres array (sent as JSON array). */
  arrayFields?: string[];
  /** Field whose value is stored as a Postgres float. */
  floatFields?: string[];
  icon: string;
}

export const resources: Record<string, ResourceConfig> = {
  projects: {
    slug: "projects",
    table: "Project",
    label: "Projects",
    singular: "Project",
    description: "Selected work across software, consultancy and digital transformation.",
    orderBy: '"order" ASC, "createdAt" DESC',
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "Business", label: "Business" },
          { value: "Education", label: "Education" },
          { value: "Leadership", label: "Leadership" },
        ],
      },
      { name: "description", label: "Description", type: "textarea", span: 2 },
      { name: "tags", label: "Tags (comma separated)", type: "tags", span: 2, placeholder: "Next.js, React, Node.js" },
      { name: "image", label: "Cover image", type: "image", span: 2 },
      { name: "featured", label: "Featured", type: "toggle" },
      { name: "order", label: "Sort order", type: "number" },
    ],
    columns: [
      { key: "title", label: "Title", kind: "text" },
      { key: "category", label: "Category", kind: "badge" },
      { key: "featured", label: "Featured", kind: "badge" },
      { key: "order", label: "Order", kind: "number" },
    ],
    searchFields: ["title", "category", "description"],
    hasPublished: false,
    arrayFields: ["tags"],
    icon: "folder",
  },
  services: {
    slug: "services",
    table: "Service",
    label: "Services",
    singular: "Service",
    description: "The capabilities offered through Amfex Network.",
    orderBy: '"order" ASC',
    fields: [
      { name: "number", label: "Number", type: "text", placeholder: "01" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", span: 2 },
      { name: "tags", label: "Tags (comma separated)", type: "tags", span: 2, placeholder: "Software Dev, Web Apps" },
      { name: "order", label: "Sort order", type: "number" },
    ],
    columns: [
      { key: "number", label: "No.", kind: "text" },
      { key: "title", label: "Title", kind: "text" },
    ],
    searchFields: ["title", "description"],
    hasPublished: false,
    arrayFields: ["tags"],
    icon: "sparkles",
  },
  posts: {
    slug: "posts",
    table: "Post",
    label: "Journal",
    singular: "Journal Post",
    description: "Blog posts and articles in the journal.",
    orderBy: 'date DESC',
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Leave empty to auto-generate from the title." },
      { name: "category", label: "Category", type: "text", placeholder: "Education" },
      { name: "excerpt", label: "Excerpt", type: "textarea", span: 2 },
      { name: "content", label: "Content", type: "textarea", span: 2, help: "Supports Markdown." },
      { name: "date", label: "Date", type: "date" },
      { name: "readTime", label: "Read time", type: "text", placeholder: "5 min read" },
      { name: "cover", label: "Cover image", type: "image", span: 2 },
      { name: "published", label: "Published", type: "toggle" },
    ],
    columns: [
      { key: "title", label: "Title", kind: "text" },
      { key: "category", label: "Category", kind: "badge" },
      { key: "date", label: "Date", kind: "date" },
      { key: "published", label: "Status", kind: "badge" },
    ],
    searchFields: ["title", "category", "excerpt"],
    hasPublished: true,
    icon: "pen",
  },
  books: {
    slug: "books",
    table: "Book",
    label: "Books",
    singular: "Book",
    description: "Books, publications and store items.",
    orderBy: '"createdAt" DESC',
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Leave empty to auto-generate from the title." },
      { name: "category", label: "Category", type: "text", placeholder: "Leadership" },
      { name: "description", label: "Description", type: "textarea", span: 2 },
      { name: "cover", label: "Cover image", type: "image", span: 2 },
      { name: "price", label: "Price", type: "number" },
      { name: "link", label: "External link", type: "text", span: 2, placeholder: "https://…" },
      { name: "published", label: "Published", type: "toggle" },
    ],
    columns: [
      { key: "title", label: "Title", kind: "text" },
      { key: "category", label: "Category", kind: "badge" },
      { key: "published", label: "Status", kind: "badge" },
    ],
    searchFields: ["title", "category", "description"],
    hasPublished: true,
    floatFields: ["price"],
    icon: "book",
  },
  gallery: {
    slug: "gallery",
    table: "GalleryImage",
    label: "Gallery",
    singular: "Gallery Image",
    description: "Images shown in the gallery.",
    orderBy: '"createdAt" DESC',
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "src", label: "Image", type: "image", span: 2 },
      { name: "category", label: "Category", type: "text", placeholder: "Events" },
    ],
    columns: [
      { key: "title", label: "Title", kind: "text" },
      { key: "category", label: "Category", kind: "badge" },
    ],
    searchFields: ["title", "category"],
    hasPublished: false,
    icon: "images",
  },
  resources: {
    slug: "resources",
    table: "Resource",
    label: "Resources",
    singular: "Resource",
    description: "Downloadable resources — PDFs, ZIPs and media kits.",
    orderBy: '"createdAt" DESC',
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", span: 2 },
      { name: "type", label: "Type", type: "text", placeholder: "PDF, ZIP" },
      { name: "fileUrl", label: "File URL", type: "text", span: 2, placeholder: "https://… or /files/…" },
      { name: "icon", label: "Icon", type: "text", span: 2, help: "Optional icon identifier." },
    ],
    columns: [
      { key: "title", label: "Title", kind: "text" },
      { key: "type", label: "Type", kind: "badge" },
    ],
    searchFields: ["title", "description", "type"],
    hasPublished: false,
    icon: "archive",
  },
};

export function getResource(slug: string): ResourceConfig | null {
  return resources[slug] ?? null;
}

export function resourceList(): ResourceConfig[] {
  return Object.values(resources);
}

/** Allowed writable columns for a resource (safe to interpolate into SQL). */
export function allowedColumns(config: ResourceConfig): string[] {
  return config.fields.map((f) => f.name);
}
