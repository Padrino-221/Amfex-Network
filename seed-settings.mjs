import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:1234567890@localhost:5432/emmanuel_portfolio?schema=public' });
const flat = {
  company_name: "Emmanuel Amful Owusu",
  tagline: "Technology. Knowledge. Leadership. Purpose.",
  hero_name: "Emmanuel",
  hero_tagline: "Turning vision into digital solutions that move businesses forward.",
  hero_subtagline: "IT Consultant · Academic Technologist · Author · Leadership Mentor",
  hero_photo: "/GEN AMFUL.png",
  home_about_kicker: "About me",
  home_about_heading: "Technology, education, and leadership — united.",
  home_about_description: "Founder and CEO of Amfex Network, Senior Technician at UENR, creator of SEDES Framework.",
  home_stats: JSON.stringify([{v:"8+", l:"years in the field"}, {v:"200+", l:"projects delivered"}, {v:"1000+", l:"lives touched"}]),
  home_journey_kicker: "Experience",
  home_journey_heading: "Where I've been.",
  home_journey_description: "Education and work experience shaping a career at the intersection of technology and purpose.",
  email: "emmanuelamful@gmail.com",
  phone: "+233 2494 58849",
  location: "Sunyani, Ghana",
  social_links: JSON.stringify([{platform:"LinkedIn", url:"https://linkedin.com/in/emmanuel-amful"}, {platform:"X", url:"https://twitter.com/amful_"}, {platform:"Instagram", url:"https://instagram.com/emmanuel_amful"}]),
  seo_title: "Emmanuel Amful Owusu | Technology. Knowledge. Leadership. Purpose.",
  seo_description: "IT Consultant | Entrepreneur | Academic Technologist | Author | Leadership Mentor.",
  footer_tagline: "Ready to build something great?",
  footer_copyright: "Emmanuel Amful Owusu. All rights reserved.",
  footer_location: "Accra, Ghana · Working worldwide",
  footer_cta_badge: "Ready to build something great?",
  footer_cta_heading: "Let's work together.",
  footer_cta_body: "A project, a collaboration, or simply a conversation — I'd love to hear from you.",
  journey_education: JSON.stringify([{ institution: "UENR", degree: "BSc. IT", period:"2016-2020", description:"First-class honors."}, { institution: "KNUST", degree: "MSc. Computer Science", period:"2021-2023", description:"AI and educational technology." }]),
  journey_work: JSON.stringify([{ company:"Amfex Network", role:"Founder & CEO", period:"2018-Present", description:"Technology consulting firm."}, { company:"University of Energy and Natural Resources", role:"Senior Technician", period:"2020-Present", description:"IT infrastructure."}]),
};
for (const [key, value] of Object.entries(flat)) {
  await pool.query(`INSERT INTO "SiteSettings" (id, key, value, "updatedAt") VALUES (gen_random_uuid(), $1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value=$2, "updatedAt"=NOW()`, [key, value]);
  console.log(`seeded ${key}`);
}
await pool.end();
console.log("done");
