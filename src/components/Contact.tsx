"use client";

import { useState } from "react";
import { Reveal, RevealStagger, RevealItem, AnimatedIcon, LiftCard } from "@/components/Motion";
import { Mail, MapPin, Phone } from "lucide-react";

type ContactInfo = {
  email?: string;
  phone?: string;
  location?: string;
};

export default function Contact({ info = {} }: { info?: ContactInfo }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const details = [
    { label: "Email", value: info.email || "emmanuelamful@gmail.com", Icon: Mail, href: `mailto:${info.email || "emmanuelamful@gmail.com"}` },
    { label: "Location", value: info.location || "Sunyani, Ghana", Icon: MapPin },
    { label: "Phone", value: info.phone || "+233 2494 58849", Icon: Phone, href: `tel:${(info.phone || "+233 2494 58849").replace(/[^0-9+]/g, "")}` },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-premium">
        <Reveal>
          <div className="mb-12">
            <span className="kicker mb-4">Contact</span>
            <h2 className="section-title-dark">
              Let&apos;s <span className="italic font-light text-red">Connect</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <Reveal>
              <p className="text-charcoal/80 leading-relaxed max-w-md border-l-2 border-gold pl-4 mb-8">
                Whether you want to discuss a project, explore collaboration, or simply connect — I&apos;d love to hear from you.
              </p>
            </Reveal>

            <RevealStagger className="space-y-3">
              {details.map((c) => {
                const Icon = c.Icon;
                const inner = (
                  <>
                    <AnimatedIcon hoverRotate={12} className="w-11 h-11 border border-charcoal/10 bg-white grid place-items-center text-red shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </AnimatedIcon>
                    <div>
                      <p className="text-[10px] tracking-[0.14em] uppercase text-charcoal/80">{c.label}</p>
                      <p className="text-sm font-medium text-charcoal">{c.value}</p>
                    </div>
                  </>
                );
                return (
                  <RevealItem key={c.label} direction="up">
                    <LiftCard>
                      {c.href ? (
                        <a href={c.href} className="card-premium flex items-center gap-4 p-4 no-underline">
                          {inner}
                        </a>
                      ) : (
                        <div className="card-premium flex items-center gap-4 p-4">{inner}</div>
                      )}
                    </LiftCard>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </div>

          <Reveal direction="right">
            <div className="card-premium p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-[0.14em] uppercase font-semibold text-charcoal/75 mb-1.5 block">First name</label>
                    <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} type="text" className="w-full px-4 py-3 bg-white border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:border-charcoal placeholder:text-charcoal/75" placeholder="John" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.14em] uppercase font-semibold text-charcoal/75 mb-1.5 block">Last name</label>
                    <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} type="text" className="w-full px-4 py-3 bg-white border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:border-charcoal placeholder:text-charcoal/75" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.14em] uppercase font-semibold text-charcoal/75 mb-1.5 block">Email</label>
                  <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className="w-full px-4 py-3 bg-white border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:border-charcoal placeholder:text-charcoal/75" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.14em] uppercase font-semibold text-charcoal/75 mb-1.5 block">Message</label>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full px-4 py-3 bg-white border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:border-charcoal resize-none placeholder:text-charcoal/75" placeholder="Tell me about your project..." />
                </div>

                {status === "success" && <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded">Message sent — I&apos;ll reply soon.</p>}
                {status === "error" && <p className="text-sm text-red bg-red/5 border border-red/10 px-3 py-2 rounded">{error}</p>}

                <button type="submit" disabled={status === "loading"} className="w-full btn-primary">
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}