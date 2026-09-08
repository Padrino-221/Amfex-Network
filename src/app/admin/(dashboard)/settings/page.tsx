"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, AuthError } from "@/lib/admin-api";
import { useToast } from "@/lib/toast";
import { PageHeader, Button, Loading, ErrorState, Field, TextInput, TextArea, inputClass } from "@/components/admin/ui";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { pages, allSettingKeys, allRowKeys, settingDefaults, type PageDef, type SectionDef, type RowDef } from "@/lib/settings-config";
import { uploadFile } from "@/lib/admin-api";

export default function SettingsPage() {
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [rowValues, setRowValues] = useState<Record<string, Record<string, string>[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<PageDef>(pages[0]);
  const [openSection, setOpenSection] = useState<string>(pages[0].sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const openSections = useMemo(() => new Set(openSection === "" ? [] : [openSection]), [openSection]);

  const load = useCallback(async () => {
    setError(null);
    try {
      const rows = await adminApi.getSettings();
      const map: Record<string, string> = {};
      rows.forEach((r) => {
        map[r.key] = r.value ?? "";
      });
      const next: Record<string, string> = {};
      for (const key of allSettingKeys) next[key] = map[key] ?? settingDefaults[key] ?? "";
      setValues(next);
      const rowMap: Record<string, Record<string, string>[]> = {};
      for (const key of allRowKeys) {
        const raw = map[key] ?? settingDefaults[key] ?? null;
        rowMap[key] = [];
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) rowMap[key] = parsed as Record<string, string>[];
          } catch {
            rowMap[key] = [];
          }
        }
      }
      setRowValues(rowMap);
    } catch (err) {
      if (err instanceof AuthError) {
        router.replace("/admin/login");
        return;
      }
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  function selectPage(page: PageDef) {
    setActivePage(page);
    setOpenSection(page.sections[0]?.id ?? "");
  }

  function toggleSection(id: string) {
    setOpenSection((prev) => (prev === id ? "" : id));
    requestAnimationFrame(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function saveSection(section: SectionDef) {
    setSavingSection(section.id);
    setError(null);
    try {
      const payload: Record<string, string | null> = {};
      for (const f of section.fields ?? []) {
        payload[f.key] = (values[f.key] ?? "").trim() === "" ? null : values[f.key];
      }
      for (const r of section.rows ?? []) {
        const rows = rowValues[r.key] ?? [];
        const clean = rows.filter((row) => Object.values(row).some((v) => (v ?? "").trim() !== ""));
        payload[r.key] = clean.length ? JSON.stringify(clean) : null;
      }
      await adminApi.saveSettings(payload);
      toast.success(`${section.title} saved`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      setError(message);
      toast.error(message);
    } finally {
      setSavingSection(null);
    }
  }

  function updateRow(rowKey: string, index: number, patch: Record<string, string>) {
    setRowValues((prev) => {
      const rows = prev[rowKey] ?? [];
      const next = rows.map((r, i) => (i === index ? { ...r, ...patch } : r));
      return { ...prev, [rowKey]: next };
    });
  }

  function addRow(rowKey: string, rowDef: RowDef) {
    const blank: Record<string, string> = {};
    for (const f of rowDef.fields) blank[f.key] = "";
    setRowValues((prev) => ({ ...prev, [rowKey]: [...(prev[rowKey] ?? []), blank] }));
  }

  function removeRow(rowKey: string, index: number) {
    setRowValues((prev) => ({ ...prev, [rowKey]: (prev[rowKey] ?? []).filter((_, i) => i !== index) }));
  }

  if (loading) return <Loading />;
  if (error && Object.keys(values).length === 0) return <ErrorState message={error} onRetry={load} />;

  return (
    <div>
      <PageHeader title="Site Settings" description="Every piece of static content — pick a page on the left, edit its sections on the right." />
      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 items-start">
        <aside className="lg:sticky lg:top-6 bg-white border border-charcoal/10 rounded-lg p-2 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <p className="px-3 pt-2 pb-2 text-xs font-bold uppercase tracking-wide text-charcoal/70">Website Pages</p>
          <nav className="space-y-0.5">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => selectPage(page)}
                className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${activePage.id === page.id ? "bg-gold/15 text-charcoal font-semibold" : "text-charcoal/65 hover:bg-charcoal/5 hover:text-charcoal"}`}
              >
                {page.title}
              </button>
            ))}
          </nav>
        </aside>

        <div>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-charcoal">{activePage.title}</h2>
              <p className="text-sm text-charcoal/75">{activePage.description}</p>
            </div>
            <a
              href={activePage.id === "global" ? "/" : activePage.id === "home" ? "/" : `/${activePage.id}`}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-charcoal/60 border border-charcoal/15 px-3 py-1.5 rounded hover:border-charcoal hover:text-charcoal bg-white"
            >
              View live →
            </a>
          </div>
          <p className="mb-3 text-xs text-charcoal/65">Editing <span className="font-semibold text-charcoal">{Object.keys(values).filter((k) => activePage.sections.some((s) => s.fields?.some((f) => f.key === k) || s.rows?.some((r) => r.key === k))).length}</span> keys — empty fields will fall back to site defaults on save.</p>

          <div className="space-y-4">
            {activePage.sections.map((section) => {
              const isOpen = openSections.has(section.id);
              return (
                <div key={section.id} ref={(el) => { sectionRefs.current[section.id] = el; }} className="bg-white border border-charcoal/10 rounded-lg scroll-mt-6">
                  <button onClick={() => toggleSection(section.id)} className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left" aria-expanded={isOpen}>
                    <div>
                      <h3 className="text-base font-bold text-charcoal">{section.title}</h3>
                      {section.description && <p className="text-sm text-charcoal/75">{section.description}</p>}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-charcoal/65 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-charcoal/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                        {(section.fields ?? []).map((f) => (
                          <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
                            <Field label={f.label} help={f.help}>
                              {f.type === "textarea" ? (
                                <TextArea value={values[f.key] ?? ""} onChange={(v) => setValues((prev) => ({ ...prev, [f.key]: v }))} rows={3} />
                              ) : f.type === "image" ? (
                                <ImageField value={values[f.key] ?? ""} onChange={(v) => setValues((prev) => ({ ...prev, [f.key]: v }))} />
                              ) : (
                                <TextInput value={values[f.key] ?? ""} onChange={(v) => setValues((prev) => ({ ...prev, [f.key]: v }))} />
                              )}
                            </Field>
                          </div>
                        ))}
                      </div>

                      {(section.rows ?? []).map((rowDef) => {
                        const rows = rowValues[rowDef.key] ?? [];
                        return (
                          <div key={rowDef.key} className="mt-5">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-sm font-semibold text-charcoal">{rowDef.label}</p>
                              <Button variant="secondary" className="!px-3 !py-1.5 !text-xs" onClick={() => addRow(rowDef.key, rowDef)}>
                                <Plus className="w-3.5 h-3.5" /> {rowDef.addLabel}
                              </Button>
                            </div>
                            {rows.length === 0 && <p className="text-sm text-charcoal/75 border border-dashed border-charcoal/20 rounded p-4 text-center">{rowDef.emptyText}</p>}
                            <div className="space-y-3">
                              {rows.map((row, i) => (
                                <RowEditor key={i} row={row} index={i} rowDef={rowDef} onChange={updateRow} onRemove={removeRow} />
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      <div className="mt-5 flex items-center gap-3">
                        <Button onClick={() => saveSection(section)} disabled={savingSection === section.id}>
                          {savingSection === section.id ? "Saving…" : "Save section"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RowEditor({
  row,
  index,
  rowDef,
  onChange,
  onRemove,
}: {
  row: Record<string, string>;
  index: number;
  rowDef: RowDef;
  onChange: (rowKey: string, index: number, patch: Record<string, string>) => void;
  onRemove: (rowKey: string, index: number) => void;
}) {
  return (
    <div className="bg-cream/70 border border-charcoal/10 rounded p-3 grid grid-cols-1 gap-3 items-start">
      {rowDef.fields.map((f) => (
        <div key={f.key} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 items-start">
          <label className="text-xs font-semibold text-charcoal/80 md:pt-2.5">{f.label}</label>
          {f.type === "textarea" ? (
            <textarea
              value={row[f.key] ?? ""}
              placeholder={f.placeholder}
              rows={2}
              onChange={(e) => onChange(rowDef.key, index, { [f.key]: e.target.value })}
              className={`${inputClass} resize-y`}
            />
          ) : f.type === "image" ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={row[f.key] ?? ""}
                  placeholder={f.placeholder ?? "/uploads/... or https://..."}
                  onChange={(e) => onChange(rowDef.key, index, { [f.key]: e.target.value })}
                  className={`${inputClass} flex-1`}
                />
                <UploadMini onUploaded={(url) => onChange(rowDef.key, index, { [f.key]: url })} />
              </div>
              {row[f.key] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={row[f.key]} alt="" className="w-32 h-20 object-cover rounded border border-charcoal/10" />
              )}
            </div>
          ) : (
            <input
              type="text"
              value={row[f.key] ?? ""}
              placeholder={f.placeholder}
              onChange={(e) => onChange(rowDef.key, index, { [f.key]: e.target.value })}
              className={inputClass}
            />
          )}
        </div>
      ))}
      <button type="button" onClick={() => onRemove(rowDef.key, index)} className="p-2 text-charcoal/65 hover:text-red-600 self-start" aria-label={`Remove ${rowDef.label.toLowerCase()}`}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input type="text" value={value} placeholder="/uploads/... or https://..." onChange={(e) => onChange(e.target.value)} className={`${inputClass} flex-1`} />
        <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-charcoal/15 rounded text-xs font-medium text-charcoal hover:bg-cream cursor-pointer">
          <input type="file" accept="image/*,video/*" className="hidden" onChange={onFile} disabled={uploading} />
          {uploading ? "Uploading…" : "Upload"}
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="w-40 h-24 object-cover rounded border border-charcoal/10" />
      )}
    </div>
  );
}

function UploadMini({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadFile(file);
      onUploaded(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <label className="inline-flex items-center gap-1 px-2 py-2 bg-white border border-charcoal/15 rounded text-xs text-charcoal hover:bg-cream cursor-pointer">
      <input type="file" accept="image/*,video/*" className="hidden" onChange={onFile} disabled={busy} />
      {busy ? "…" : "Upload"}
    </label>
  );
}
