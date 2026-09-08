"use client";

import { useRef, useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import { uploadFile } from "@/lib/admin-api";
import { Dropdown } from "./dropdown";
import { AlertTriangle, Check, ChevronLeft, ChevronRight, Upload, Trash2 } from "lucide-react";

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-charcoal">{title}</h1>
        {description && <p className="text-charcoal/60 mt-1 text-sm max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed rounded";
  const variants: Record<string, string> = {
    primary: "bg-charcoal text-cream hover:bg-charcoal-deep",
    secondary: "border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream",
    danger: "bg-red text-cream hover:bg-red-deep",
    ghost: "text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: "neutral" | "green" | "red" | "amber" | "gold"; className?: string }) {
  const tones: Record<string, string> = {
    neutral: "bg-charcoal/5 text-charcoal/70",
    green: "bg-green-100 text-green-800",
    red: "bg-red/10 text-red",
    amber: "bg-amber-100 text-amber-800",
    gold: "bg-gold/15 text-gold-warm",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide rounded ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function Loading() {
  return (
    <div className="py-16 flex items-center justify-center gap-3 text-charcoal/75">
      <span className="w-5 h-5 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
      <span className="text-sm">Loading…</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="py-16 text-center">
      <AlertTriangle className="w-8 h-8 mx-auto text-red mb-3" />
      <p className="text-charcoal/70 mb-4">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="py-16 text-center border border-dashed border-charcoal/20 rounded-lg">
      <p className="text-charcoal/75 mb-4">{message}</p>
      {action}
    </div>
  );
}

export function Field({ label, help, required, children }: { label: string; help?: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-charcoal mb-1.5">
        {label}
        {required && <span className="text-red ml-0.5">*</span>}
      </span>
      {children}
      {help && <span className="block text-xs text-charcoal/75 mt-1.5">{help}</span>}
    </label>
  );
}

export const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-charcoal bg-white border border-charcoal/20 rounded focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 placeholder:text-charcoal/75";

export function TextInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

export function NumberInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="number" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

export function TextArea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return <textarea value={value} rows={rows} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={`${inputClass} resize-y`} />;
}

export function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  const selected = options.find((o) => o.value === value);
  return (
    <Dropdown
      block
      caret
      align="left"
      label="Select option"
      width="trigger"
      trigger={<span className={`${inputClass} inline-flex items-center justify-between gap-2 text-left`}><span className="truncate">{selected?.label ?? "Select…"}</span></span>}
      items={options.map((o) => ({ label: o.label, onClick: () => onChange(o.value) }))}
    />
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="inline-flex items-center gap-3 group" aria-pressed={checked}>
      <span className={`w-11 h-6 rounded-full relative ${checked ? "bg-gold" : "bg-charcoal/20"}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white ${checked ? "left-[22px]" : "left-0.5"}`} />
      </span>
      {label && <span className="text-sm text-charcoal/70 group-hover:text-charcoal">{label}</span>}
    </button>
  );
}

function UploadButton({ onUpload, accept, label }: { onUpload: (url: string) => void; accept: string; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  async function handle(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onUpload(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-gold/15 text-gold-warm rounded hover:bg-gold/25 disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        {uploading ? "Uploading…" : label}
      </button>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handle} />
    </>
  );
}

export function ImageInput({ value, onChange, help }: { value: string; onChange: (v: string) => void; help?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <input type="text" value={value} placeholder="https://… or /uploads/…" onChange={(e) => onChange(e.target.value)} className={inputClass} />
          {help && <span className="block text-xs text-charcoal/75 mt-1">{help}</span>}
        </div>
        <UploadButton onUpload={onChange} accept="image/*" label="Upload" />
      </div>
      {value && (
        <div className="relative w-40 h-28 bg-charcoal/5 rounded overflow-hidden border border-charcoal/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange("")} className="absolute top-1.5 right-1.5 w-7 h-7 bg-white/90 rounded border border-charcoal/10 flex items-center justify-center text-red hover:bg-white" aria-label="Remove image">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function VideoInput({ value, onChange, help }: { value: string; onChange: (v: string) => void; help?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <input type="text" value={value} placeholder="https://… or /uploads/…" onChange={(e) => onChange(e.target.value)} className={inputClass} />
          {help && <span className="block text-xs text-charcoal/75 mt-1">{help}</span>}
        </div>
        <UploadButton onUpload={onChange} accept="video/*" label="Upload" />
      </div>
      {value && (
        <div className="space-y-1.5">
          <video src={value} controls muted playsInline className="w-48 h-28 bg-charcoal/5 rounded border border-charcoal/10 object-cover" />
          <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1.5 text-xs text-red hover:text-red-deep">
            <Trash2 className="w-4 h-4" /> Remove video
          </button>
        </div>
      )}
    </div>
  );
}

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "toggle" | "image" | "video" | "date" | "tags";
  options?: { value: string; label: string }[];
  required?: boolean;
  help?: string;
  placeholder?: string;
  span?: 1 | 2;
}

export interface SchemaFormProps {
  fields: FieldDef[];
  initial: Record<string, unknown>;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  submitLabel?: string;
  onCancel?: () => void;
}

export function SchemaForm({ fields, initial, onSubmit, submitLabel = "Save", onCancel }: SchemaFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const f of fields) {
      const v = initial[f.name];
      if (f.type === "toggle") out[f.name] = v ? "true" : "false";
      else if (f.type === "number") out[f.name] = v == null ? "" : String(v);
      else out[f.name] = v == null ? "" : String(v);
    }
    return out;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function set(name: string, v: string) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  function buildPayload(): Record<string, unknown> {
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const raw = values[f.name] ?? "";
      if (f.type === "toggle") payload[f.name] = raw === "true";
      else if (f.type === "number") payload[f.name] = raw === "" ? null : Number(raw);
      else if (f.type === "tags") payload[f.name] = raw === "" ? [] : raw.split(",").map((s) => s.trim()).filter(Boolean);
      else payload[f.name] = raw === "" ? null : raw;
    }
    return payload;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !values[f.name]?.trim()) {
        setError(`${f.label} is required`);
        return;
      }
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit(buildPayload());
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  function renderField(f: FieldDef) {
    const value = values[f.name] ?? "";
    switch (f.type) {
      case "textarea":
        return <TextArea value={value} onChange={(v) => set(f.name, v)} placeholder={f.placeholder} rows={5} />;
      case "number":
        return <NumberInput value={value} onChange={(v) => set(f.name, v)} placeholder={f.placeholder} />;
      case "select":
        return <SelectInput value={value} onChange={(v) => set(f.name, v)} options={f.options ?? []} />;
      case "toggle":
        return <Toggle checked={value === "true"} onChange={(v) => set(f.name, v ? "true" : "false")} label={value === "true" ? "Published" : "Draft"} />;
      case "image":
        return <ImageInput value={value} onChange={(v) => set(f.name, v)} help={f.help} />;
      case "video":
        return <VideoInput value={value} onChange={(v) => set(f.name, v)} help={f.help} />;
      case "date":
        return <TextInput type="date" value={value} onChange={(v) => set(f.name, v)} />;
      case "tags":
        return <TextInput value={value} onChange={(v) => set(f.name, v)} placeholder={f.placeholder} />;
      default:
        return <TextInput value={value} onChange={(v) => set(f.name, v)} placeholder={f.placeholder} />;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>}
      {saved && (
        <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded flex items-center gap-2">
          <Check className="w-4 h-4" /> Saved successfully
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((f) => (
          <div key={f.name} className={f.span === 2 ? "md:col-span-2" : ""}>
            <Field label={f.label} help={f.type !== "image" && f.type !== "toggle" && f.type !== "video" ? f.help : undefined} required={f.required}>
              {renderField(f)}
            </Field>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving} variant="primary">
          {saving ? "Saving…" : submitLabel}
        </Button>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: { page: number; pageSize: number; total: number; onPageChange: (page: number) => void; onPageSizeChange?: (size: number) => void }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  if (total === 0) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pages: number[] = [];
  const start = Math.max(1, Math.min(page - 2, pageCount - 4));
  for (let i = start; i <= Math.min(pageCount, start + 4); i++) pages.push(i);
  const btn = "inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium border disabled:opacity-40 disabled:cursor-not-allowed";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-charcoal/10">
      <p className="text-xs text-charcoal/75">
        Showing <span className="font-semibold text-charcoal/70">{from}–{to}</span> of <span className="font-semibold text-charcoal/70">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <Dropdown
            align="right"
            label="Rows per page"
            trigger={<span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-charcoal bg-white border border-charcoal/20 rounded">{pageSize} / page</span>}
            items={[10, 25, 50, 100].map((n) => ({ label: `${n} / page`, onClick: () => onPageSizeChange(n) }))}
          />
        )}
        <button className={`${btn} border-charcoal/15 text-charcoal/60 hover:text-charcoal disabled:opacity-40`} onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {pages.map((p) => (
          <button key={p} onClick={() => onPageChange(p)} className={`${btn} ${p === page ? "bg-charcoal text-cream border-charcoal" : "border-charcoal/15 text-charcoal/60 hover:text-charcoal hover:border-charcoal/40"}`}>
            {p}
          </button>
        ))}
        <button className={`${btn} border-charcoal/15 text-charcoal/60 hover:text-charcoal disabled:opacity-40`} onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
