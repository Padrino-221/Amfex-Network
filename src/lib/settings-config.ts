export interface SettingField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image'
  help?: string
  placeholder?: string
}

export interface RowField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image'
  placeholder?: string
}

export interface RowDef {
  key: string
  label: string
  addLabel: string
  emptyText: string
  fields: RowField[]
}

export interface SectionDef {
  id: string
  title: string
  description?: string
  fields?: SettingField[]
  rows?: RowDef[]
}

export interface PageDef {
  id: string
  title: string
  description: string
  sections: SectionDef[]
}

export const pages: PageDef[] = [
  {
    id: 'global',
    title: 'Global',
    description: 'Brand identity and contact details rendered on every page — header, footer, and SEO.',
    sections: [
      {
        id: 'brand',
        title: 'Brand',
        description: 'Header logo text, footer brand block and browser tab. Name appears in Hero (“Hello, I’m …”) and title tag.',
        fields: [
          { key: 'company_name', label: 'Company / Person name', type: 'text', help: 'Header left + footer brand. e.g. Emmanuel' },
          { key: 'tagline', label: 'Tagline', type: 'text', help: 'Footer under brand and meta. Keep short.' },
          { key: 'about_summary', label: 'Short bio / about summary', type: 'textarea', help: 'Used only if About section falls back — rarely shown.' },
          { key: 'site_logo_url', label: 'Site logo URL', type: 'image', help: 'Header & footer logo. Upload PNG/SVG or paste /uploads/... URL. Shown at 40×40.' },
        ],
      },
      {
        id: 'contact',
        title: 'Contact details',
        description: 'Footer “Contact” column and Contact page info cards. Phone/email are clickable links.',
        fields: [
          { key: 'email', label: 'Email', type: 'text', help: 'Footer mailto: and Contact page. e.g. emmanuelamful@gmail.com' },
          { key: 'phone', label: 'Phone', type: 'text', help: 'Footer tel: and Contact page. e.g. +233 2494 58849' },
          { key: 'location', label: 'Location', type: 'text', help: 'Footer and Contact page. e.g. Sunyani, Ghana · Working worldwide' },
          { key: 'website', label: 'Website', type: 'text', help: 'Footer optional link. https://...' },
        ],
      },
      {
        id: 'social',
        title: 'Social media',
        description: 'Footer “Connect” icons + Contact share. Each URL must start with https://. Icon auto-detected from platform name.',
        rows: [
          {
            key: 'social_links',
            label: 'Social links',
            addLabel: 'Add social link',
            emptyText: 'No social links yet — footer will hide icons.',
            fields: [
              { key: 'platform', label: 'Platform', type: 'text', placeholder: 'LinkedIn' },
              { key: 'url', label: 'URL', type: 'text', placeholder: 'https://linkedin.com/in/...' },
            ],
          },
        ],
      },
      {
        id: 'shared-cta',
        title: 'Shared CTA',
        description: 'Large dark CTA band that appears above the footer on Home (“Ready to build… Let’s work together”).',
        fields: [
          { key: 'cta_kicker', label: 'Kicker (small gold label)', type: 'text', help: 'Above CTA heading' },
          { key: 'cta_heading', label: 'Heading', type: 'text', help: 'Big statement line' },
          { key: 'cta_body', label: 'Body', type: 'textarea', help: 'One sentence under heading' },
          { key: 'cta_primary_label', label: 'Primary button', type: 'text', help: 'Links to /contact' },
          { key: 'cta_secondary_label', label: 'Secondary button', type: 'text', help: 'Links to portfolio' },
        ],
      },
    ],
  },
  {
    id: 'home',
    title: 'Home',
    description: 'Homepage sections in order: Hero → About → Stats → Journey → Portfolio → SEO. URLs: /',
    sections: [
      {
        id: 'home-hero',
        title: 'Hero (first screen)',
        description: 'Full-viewport dark section at top of /. Name is gold, photo is right card.',
        fields: [
          { key: 'hero_name', label: 'Hero name (gold)', type: 'text', help: 'After “Hello, I’m”. e.g. Emmanuel' },
          { key: 'hero_tagline', label: 'Tagline (large white)', type: 'textarea', help: 'Main promise line under name' },
          { key: 'hero_subtagline', label: 'Subtagline (muted)', type: 'text', help: 'Small roles line: IT Consultant · …' },
          { key: 'hero_photo', label: 'Portrait image', type: 'image', help: 'Right card 4:5, object-cover. /GEN AMFUL.png or uploaded URL' },
          { key: 'hero_cta_primary', label: 'Primary CTA', type: 'text', help: 'Gold button → #work' },
          { key: 'hero_cta_secondary', label: 'Secondary CTA', type: 'text', help: 'Outline button → /contact' },
        ],
      },
      {
        id: 'home-about',
        title: 'About preview',
        description: 'Charcoal “About me” block below hero: left gold circle, right text + 3 stats.',
        fields: [
          { key: 'home_about_kicker', label: 'Kicker', type: 'text', help: 'Small gold label above heading' },
          { key: 'home_about_heading', label: 'Heading', type: 'text', help: 'Large white heading' },
          { key: 'home_about_description', label: 'Description', type: 'textarea', help: 'Paragraph under heading, cream/60' },
        ],
        rows: [
          {
            key: 'home_stats',
            label: 'Statistics (3 columns)',
            addLabel: 'Add stat',
            emptyText: 'No stats — will show defaults 8+ / 200+ / 1000+.',
            fields: [
              { key: 'v', label: 'Value', type: 'text', placeholder: '8+' },
              { key: 'l', label: 'Label', type: 'text', placeholder: 'years in the field' },
            ],
          },
        ],
      },
      {
        id: 'home-journey',
        title: 'Experience preview',
        description: 'Preview of creams “Where I’ve been” section (education + work). Full page at /#journey.',
        fields: [
          { key: 'home_journey_kicker', label: 'Kicker', type: 'text' },
          { key: 'home_journey_heading', label: 'Heading', type: 'text' },
          { key: 'home_journey_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'home-portfolio',
        title: 'Portfolio showcase',
        description: '“Selected projects” grid. Titles come from Projects table — this controls only the section copy.',
        fields: [
          { key: 'home_portfolio_kicker', label: 'Kicker', type: 'text' },
          { key: 'home_portfolio_heading', label: 'Heading', type: 'text' },
          { key: 'home_portfolio_description', label: 'Description', type: 'textarea' },
          { key: 'home_portfolio_cta', label: 'CTA label', type: 'text', help: 'Bottom link → /business' },
        ],
      },
      {
        id: 'home-meta',
        title: 'Metadata',
        description: 'Browser tab SEO for https://…/. Not visible on page, used by Google.',
        fields: [{ key: 'home_meta_description', label: 'Meta description', type: 'textarea', help: '~150 chars for search snippet' }],
      },
    ],
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Content for /business — Amfex Network services. hero + services + principles.',
    sections: [
      {
        id: 'business-hero',
        title: 'Hero',
        description: 'Top of /business, below header.',
        fields: [
          { key: 'business_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'business_hero_heading', label: 'Heading', type: 'text' },
          { key: 'business_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'business-services',
        title: 'Services',
        description: 'Card list. Each card title/text maps from schemas/business.ts services[].',
        rows: [
          {
            key: 'business_services',
            label: 'Services',
            addLabel: 'Add service',
            emptyText: 'No services — section hidden.',
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'text', label: 'Text', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'business-principles',
        title: 'Principles',
        rows: [
          {
            key: 'business_principles',
            label: 'Principles',
            addLabel: 'Add principle',
            emptyText: 'No principles yet.',
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'text', label: 'Text', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'business-meta',
        title: 'Metadata',
        fields: [{ key: 'business_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'academia',
    title: 'Academia',
    description: 'Content for /academia — institution, philosophy, expertise.',
    sections: [
      {
        id: 'academia-hero',
        title: 'Hero',
        fields: [
          { key: 'academia_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'academia_hero_heading', label: 'Heading', type: 'text' },
          { key: 'academia_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'academia-philosophy',
        title: 'Philosophy',
        description: 'Centered quote card.',
        fields: [{ key: 'academia_philosophy', label: 'Philosophy', type: 'textarea' }],
      },
      {
        id: 'academia-expertise',
        title: 'Expertise',
        rows: [
          {
            key: 'academia_expertise',
            label: 'Expertise items',
            addLabel: 'Add item',
            emptyText: 'No items — chips hidden.',
            fields: [{ key: 'value', label: 'Value', type: 'text', placeholder: 'Curriculum Design' }],
          },
        ],
      },
      {
        id: 'academia-meta',
        title: 'Metadata',
        fields: [{ key: 'academia_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'ministry',
    title: 'Ministry',
    description: 'Content for /ministry — vision, mission, dimensions.',
    sections: [
      {
        id: 'ministry-hero',
        title: 'Hero',
        fields: [
          { key: 'ministry_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'ministry_hero_heading', label: 'Heading', type: 'text' },
          { key: 'ministry_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'ministry-dimensions',
        title: 'Dimensions',
        rows: [
          {
            key: 'ministry_dimensions',
            label: 'Dimensions',
            addLabel: 'Add dimension',
            emptyText: 'No dimensions — grid hidden.',
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'text', label: 'Text', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'ministry-meta',
        title: 'Metadata',
        fields: [{ key: 'ministry_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'sedes',
    title: 'SEDES',
    description: 'Content for /sedes — foundational principle + flow steps.',
    sections: [
      {
        id: 'sedes-hero',
        title: 'Hero',
        fields: [
          { key: 'sedes_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'sedes_hero_heading', label: 'Heading', type: 'text' },
          { key: 'sedes_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'sedes-steps',
        title: 'Flow steps',
        description: 'Horizontal stepper. Label is short code, text is explanation.',
        rows: [
          {
            key: 'sedes_flowSteps',
            label: 'Flow steps',
            addLabel: 'Add step',
            emptyText: 'No steps — stepper hidden.',
            fields: [
              { key: 'label', label: 'Label', type: 'text', placeholder: 'S — See' },
              { key: 'text', label: 'Text', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'sedes-meta',
        title: 'Metadata',
        fields: [{ key: 'sedes_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'books',
    title: 'Books',
    description: 'Content for /books — hero + category. Book cards themselves come from Books table.',
    sections: [
      {
        id: 'books-hero',
        title: 'Hero',
        fields: [
          { key: 'books_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'books_hero_heading', label: 'Heading', type: 'text' },
          { key: 'books_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'books-meta',
        title: 'Metadata',
        fields: [{ key: 'books_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'journal',
    title: 'Journal',
    description: 'Content for /journal — hero. Posts come from Posts table.',
    sections: [
      {
        id: 'journal-hero',
        title: 'Hero',
        fields: [
          { key: 'journal_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'journal_hero_heading', label: 'Heading', type: 'text' },
          { key: 'journal_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'journal-meta',
        title: 'Metadata',
        fields: [{ key: 'journal_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'gallery',
    title: 'Gallery',
    description: 'Content for /gallery — hero with category filter. Images from Gallery table.',
    sections: [
      {
        id: 'gallery-hero',
        title: 'Hero',
        fields: [
          { key: 'gallery_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'gallery_hero_heading', label: 'Heading', type: 'text' },
          { key: 'gallery_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'gallery-meta',
        title: 'Metadata',
        fields: [{ key: 'gallery_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Content for /resources — hero. Files from Resources table.',
    sections: [
      {
        id: 'resources-hero',
        title: 'Hero',
        fields: [
          { key: 'resources_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'resources_hero_heading', label: 'Heading', type: 'text' },
          { key: 'resources_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'resources-meta',
        title: 'Metadata',
        fields: [{ key: 'resources_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Content for /contact — hero + form copy. Form posts to /api/contact and appears in Messages.',
    sections: [
      {
        id: 'contact-hero',
        title: 'Hero',
        fields: [
          { key: 'contact_hero_kicker', label: 'Kicker', type: 'text' },
          { key: 'contact_hero_heading', label: 'Heading', type: 'text' },
          { key: 'contact_hero_description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'contact-form',
        title: 'Contact form',
        description: 'Labels shown above inputs. Keep them short.',
        fields: [
          { key: 'contact_form_heading', label: 'Form heading', type: 'text' },
          { key: 'contact_form_submit', label: 'Submit label', type: 'text', help: 'Button text, e.g. Send Message' },
        ],
      },
      {
        id: 'contact-meta',
        title: 'Metadata',
        fields: [{ key: 'contact_meta_description', label: 'Meta description', type: 'textarea' }],
      },
    ],
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'Homepage “Where I’ve been” — two columns. Shown on / and dedicated section.',
    sections: [
      {
        id: 'education',
        title: 'Education',
        description: 'Left column — school cards. Maps to schemas/academia.ts',
        rows: [
          {
            key: 'journey_education',
            label: 'Education',
            addLabel: 'Add education',
            emptyText: 'No education — will show defaults (UENR / KNUST).',
            fields: [
              { key: 'institution', label: 'Institution', type: 'text' },
              { key: 'degree', label: 'Degree', type: 'text' },
              { key: 'period', label: 'Period', type: 'text', placeholder: '2016 - 2020' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'work',
        title: 'Work',
        description: 'Right column — role cards. Uses company/role/period/description.',
        rows: [
          {
            key: 'journey_work',
            label: 'Work',
            addLabel: 'Add work',
            emptyText: 'No work — will show defaults (Amfex / UENR / Generals Hub).',
            fields: [
              { key: 'company', label: 'Company', type: 'text' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'period', label: 'Period', type: 'text', placeholder: '2018 - Present' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'footer',
    title: 'Footer',
    description: 'Dark site-wide footer present on every page — CTA band + brand + links.',
    sections: [
      {
        id: 'footer-cta',
        title: 'CTA band',
        description: 'Large statement above footer grid. Badge is small gold kicker.',
        fields: [
          { key: 'footer_cta_badge', label: 'Badge', type: 'text', help: 'Kicker-light above heading' },
          { key: 'footer_cta_heading', label: 'Heading', type: 'text', help: 'Big cream → gold on hover. Can be two lines.' },
          { key: 'footer_cta_body', label: 'Body', type: 'textarea', help: 'One sentence under heading, cream/50' },
        ],
      },
      {
        id: 'footer-info',
        title: 'Footer info',
        description: 'Brand column + SEO defaults.',
        fields: [
          { key: 'footer_tagline', label: 'Tagline (brand column)', type: 'text', help: 'Under logo, cream/55' },
          { key: 'footer_copyright', label: 'Copyright (bottom bar)', type: 'text', help: '© line, cream/35. Use {year} will be auto.' },
          { key: 'seo_title', label: 'Default SEO title', type: 'text', help: 'Fallback <title> when page meta missing' },
          { key: 'seo_description', label: 'Default SEO description', type: 'textarea', help: 'Fallback meta description ~150 chars' },
        ],
      },
    ],
  },
]

export const allSettingKeys: string[] = (() => {
  const keys: string[] = []
  for (const page of pages) {
    for (const section of page.sections) {
      for (const f of section.fields ?? []) keys.push(f.key)
      for (const r of section.rows ?? []) keys.push(r.key)
    }
  }
  return keys
})()

export const allRowKeys: string[] = (() => {
  const keys: string[] = []
  for (const page of pages) {
    for (const section of page.sections) {
      for (const r of section.rows ?? []) keys.push(r.key)
    }
  }
  return keys
})()

export const settingDefaults: Record<string, string> = {
  company_name: "Emmanuel Amful Owusu",
  tagline: "Technology. Knowledge. Leadership. Purpose.",
  site_logo_url: "/logo.png",
  email: "emmanuelamful@gmail.com",
  phone: "+233 2494 58849",
  location: "Sunyani, Ghana",
  website: "https://emmanuelamful.com",
  cta_kicker: "Ready to build something great?",
  cta_heading: "Let's work together.",
  cta_body: "A project, a collaboration, or simply a conversation — I'd love to hear from you.",
  cta_primary_label: "Contact Me",
  cta_secondary_label: "Explore my work",
  hero_name: "Emmanuel",
  hero_tagline: "Turning vision into digital solutions that move businesses forward.",
  hero_subtagline: "IT Consultant · Academic Technologist · Author · Leadership Mentor",
  hero_photo: "/GEN AMFUL.png",
  hero_cta_primary: "Explore my work",
  hero_cta_secondary: "Start a conversation",
  home_about_kicker: "About me",
  home_about_heading: "Technology, education, and leadership — united.",
  home_about_description: "I'm the Founder and CEO of Amfex Network, Senior Technician at UENR, creator of the SEDES Framework.",
  home_journey_kicker: "Experience",
  home_journey_heading: "Where I've been.",
  home_journey_description: "Education and work experience shaping a career at the intersection of technology and purpose.",
  home_portfolio_kicker: "Work showcase",
  home_portfolio_heading: "Projects that deliver results.",
  home_portfolio_description: "Selected work across software, consultancy and digital transformation.",
  home_portfolio_cta: "See all projects",
  home_stats: JSON.stringify([{ v: "8+", l: "years in the field" }, { v: "200+", l: "projects delivered" }, { v: "1000+", l: "lives touched" }]),
  social_links: JSON.stringify([
    { platform: "LinkedIn", url: "https://linkedin.com/in/emmanuel-amful" },
    { platform: "X", url: "https://twitter.com/amful_" },
    { platform: "Instagram", url: "https://instagram.com/emmanuel_amful" },
  ]),
  business_hero_kicker: "What I do",
  business_hero_heading: "Business",
  business_hero_description: "Technology solutions for organizations.",
  business_services: JSON.stringify([{ title: "IT Solutions", text: "Software development, web and mobile apps." }]),
  academia_hero_heading: "Academia",
  ministry_hero_heading: "Ministry",
  sedes_hero_heading: "SEDES",
  books_hero_heading: "Books & Store",
  journal_hero_heading: "Journal",
  gallery_hero_heading: "Gallery",
  resources_hero_heading: "Resources",
  contact_hero_heading: "Contact",
  contact_form_heading: "Send a message",
  contact_form_submit: "Send Message",
  footer_cta_badge: "Ready to build something great?",
  footer_cta_heading: "Let's work together.",
  footer_cta_body: "A project, a collaboration, or simply a conversation — I'd love to hear from you.",
  footer_tagline: "Ready to build something great?",
  footer_copyright: "Emmanuel Amful Owusu. All rights reserved.",
  seo_title: "Emmanuel Amful Owusu | Technology. Knowledge. Leadership. Purpose.",
  seo_description: "IT Consultant | Entrepreneur | Academic Technologist | Author | Leadership Mentor.",
  journey_education: JSON.stringify([
    { institution: "University of Energy and Natural Resources", degree: "BSc. Information Technology", period: "2016 - 2020", description: "First-class honors." },
    { institution: "Kwame Nkrumah University of Science and Technology", degree: "MSc. Computer Science", period: "2021 - 2023", description: "AI and educational technology." },
  ]),
  journey_work: JSON.stringify([
    { company: "Amfex Network", role: "Founder & CEO", period: "2018 - Present", description: "Technology consulting firm." },
    { company: "University of Energy and Natural Resources", role: "Senior Technician", period: "2020 - Present", description: "IT infrastructure." },
  ]),
}
