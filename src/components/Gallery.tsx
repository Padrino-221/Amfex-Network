"use client";

import { useState } from "react";
import type { GalleryImage } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard } from "@/components/Motion";

export default function Gallery({ images = [] }: { images?: GalleryImage[] }) {
  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filtered = activeCategory === "All" ? images : images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-premium">
        <Reveal>
          <div className="max-w-3xl mb-8">
            <span className="kicker">Gallery</span>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.04em] leading-[0.9] text-charcoal mt-3">
              Moments & <span className="text-red font-light italic">Experiences</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-charcoal/70 mt-4">A visual journey — people, projects, places, moments.</p>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <AnimatedIcon key={cat} hoverScale={1.05} hoverRotate={0} className="inline-flex">
              <button onClick={() => setActiveCategory(cat)} className={`pill-tag ${activeCategory === cat ? "pill-tag-active" : ""}`}>
                {cat}
              </button>
            </AnimatedIcon>
          ))}
        </div>

        {images.length === 0 && <p className="text-[16px] text-charcoal/70">No gallery images yet — add them in the admin.</p>}

        <RevealStagger className="grid grid-cols-12 gap-3 auto-rows-[160px]">
          {filtered.map((img, i) => {
            const span = i === 0 ? "col-span-12 md:col-span-8 row-span-2" : i === 1 ? "col-span-12 sm:col-span-6 md:col-span-4 row-span-1" : i === 2 ? "col-span-12 sm:col-span-6 md:col-span-4 row-span-1" : "col-span-12 sm:col-span-6 md:col-span-3 row-span-1";
            return (
              <RevealItem key={img.id || i} direction="up" className={span}>
                <LiftCard className="h-full">
                  <div
                    className="group relative overflow-hidden rounded bg-cream border border-charcoal/5 cursor-pointer h-full"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div>
                        <p className="text-white text-[13px] font-semibold">{img.title}</p>
                        <p className="text-white/60 text-[11px] uppercase tracking-wide">{img.category}</p>
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.12em] uppercase bg-white/90 text-charcoal px-2 py-1 rounded">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </LiftCard>
              </RevealItem>
            );
          })}
        </RevealStagger>

        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-5" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 grid place-items-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[85vh] rounded object-contain" />
          </div>
        )}
      </div>
    </section>
  );
}
