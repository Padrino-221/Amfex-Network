import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgresql://postgres:1234567890@localhost:5432/emmanuel_portfolio?schema=public" });

async function seed() {
  console.log("Seeding...");

  // Clear
  await pool.query(`TRUNCATE "Project","Service","Post","Book","GalleryImage","Resource" CASCADE`);

  // Projects
  const projects = [
    { title: "Amfex Network Platform", category: "Business", description: "Full-stack web platform for IT solutions and digital services.", tags: ["Next.js","React","Node.js"], image: "/GEN AMFUL.png", featured: true, order: 1 },
    { title: "Generals' Hub", category: "Education", description: "Educational technology platform connecting students and mentors.", tags: ["EdTech","Web App","Community"], image: "/GEN AMFUL.png", featured: true, order: 2 },
    { title: "SEDES Framework", category: "Leadership", description: "Purpose-driven leadership framework and digital resources.", tags: ["Framework","Leadership","Purpose"], image: "/GEN AMFUL.png", featured: true, order: 3 },
  ];
  for (const p of projects) {
    await pool.query(`INSERT INTO "Project" (id, title, category, description, tags, image, featured, "order", "createdAt","updatedAt") VALUES (gen_random_uuid(),$1,$2,$3,$4,$5,$6,$7,NOW(),NOW())`, [p.title,p.category,p.description,p.tags,p.image,p.featured,p.order]);
  }

  // Services (Business)
  const services = [
    { number: "01", title: "IT Solutions", description: "Software development, web and mobile applications, digital systems and technology infrastructure.", tags: ["Software Dev","Web Apps","Mobile Apps","Infrastructure"], order: 1 },
    { number: "02", title: "Creative Solutions", description: "Branding, graphic design, photography, videography and digital content creation.", tags: ["Branding","Graphic Design","Photography","Video"], order: 2 },
    { number: "03", title: "IT Consultancy", description: "Technology strategy, digital transformation, IT project management and innovation consulting.", tags: ["Strategy","Digital Transform","Project Mgmt","Innovation"], order: 3 },
  ];
  for (const s of services) {
    await pool.query(`INSERT INTO "Service" (id, number, title, description, tags, "order","createdAt","updatedAt") VALUES (gen_random_uuid(),$1,$2,$3,$4,$5,NOW(),NOW())`, [s.number,s.title,s.description,s.tags,s.order]);
  }

  // Posts (Journal)
  const posts = [
    { slug: "why-every-student-should-learn-to-code", title: "Why Every Student Should Learn to Code", excerpt: "Coding is not just about building software. It is about developing a way of thinking.", content: "# Why Every Student Should Learn to Code\n\nCoding is not just about building software. It is about developing a way of thinking. In this article we explore how computational thinking transforms learning.", category: "Education", date: "2025-04-07", readTime: "5 min read", cover: null },
    { slug: "intersection-technology-ministry", title: "The Intersection of Technology and Ministry", excerpt: "How digital tools are reshaping the way we share messages and build communities.", content: "Technology and ministry are converging. Digital tools amplify the gospel...", category: "Ministry", date: "2025-03-20", readTime: "4 min read", cover: null },
    { slug: "building-solutions-that-last", title: "Building Solutions That Last", excerpt: "True innovation is not about building fast. It is about building things that endure.", content: "True innovation endures. We examine principles behind lasting systems.", category: "Technology", date: "2025-02-15", readTime: "6 min read", cover: null },
  ];
  for (const p of posts) {
    await pool.query(`INSERT INTO "Post" (id, slug, title, excerpt, content, category, date, "readTime", cover, published,"createdAt","updatedAt") VALUES (gen_random_uuid(),$1,$2,$3,$4,$5,$6,$7,$8,true,NOW(),NOW())`, [p.slug,p.title,p.excerpt,p.content,p.category,p.date,p.readTime,p.cover]);
  }

  // Books
  const books = [
    { slug: "leadership-foundations", title: "Leadership Foundations", category: "Leadership", description: "Ideas for leaders, emerging leaders and people preparing to influence others.", cover: null, price: null },
    { slug: "identity-purpose", title: "Identity & Purpose", category: "Identity & Purpose", description: "Resources for understanding identity, discovering purpose and living intentionally.", cover: null, price: null },
    { slug: "technology-innovation", title: "Technology & Innovation", category: "Technology", description: "Practical knowledge around technology, digital transformation and innovation.", cover: null, price: null },
  ];
  for (const b of books) {
    await pool.query(`INSERT INTO "Book" (id, slug, title, category, description, cover, price, published,"createdAt","updatedAt") VALUES (gen_random_uuid(),$1,$2,$3,$4,$5,$6,true,NOW(),NOW())`, [b.slug,b.title,b.category,b.description,b.cover,b.price]);
  }

  // Gallery - use illustrations as placeholders since /gallery folder missing
  const gallery = [
    { src: "/illustrations/designer-workspace.svg", title: "Professional Workspace", category: "Business" },
    { src: "/illustrations/designer-creative.svg", title: "Creative Session", category: "Events" },
    { src: "/illustrations/laptop-study.svg", title: "Study & Build", category: "Lifestyle" },
    { src: "/GEN AMFUL.png", title: "Portrait", category: "Events" },
    { src: "/illustrations/working-laptop.svg", title: "Shipping Products", category: "Business" },
    { src: "/illustrations/designer-social.svg", title: "Community", category: "Ministry" },
  ];
  for (const g of gallery) {
    await pool.query(`INSERT INTO "GalleryImage" (id, src, title, category,"createdAt","updatedAt") VALUES (gen_random_uuid(),$1,$2,$3,NOW(),NOW())`, [g.src,g.title,g.category]);
  }

  // Resources
  const resources = [
    { title: "Branding Toolkit", description: "Logo variations, color palette, typography rules and usage guidelines.", type: "PDF", fileUrl: null },
    { title: "Technical Skills Assessment", description: "Overview of competencies across programming, systems, AI, data and multimedia.", type: "PDF", fileUrl: null },
    { title: "Curriculum Vitae", description: "Professional resume with education, experience, skills and contact information.", type: "PDF", fileUrl: null },
    { title: "Media Kit", description: "Official photographs, social media banners and visual assets.", type: "ZIP", fileUrl: null },
  ];
  for (const r of resources) {
    await pool.query(`INSERT INTO "Resource" (id, title, description, type, "fileUrl","createdAt","updatedAt") VALUES (gen_random_uuid(),$1,$2,$3,$4,NOW(),NOW())`, [r.title,r.description,r.type,r.fileUrl]);
  }

  console.log("Seed done");
  await pool.end();
}

seed().catch(e => { console.error(e); process.exit(1); });
