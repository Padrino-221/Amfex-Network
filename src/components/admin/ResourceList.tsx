"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthError } from "@/lib/admin-api";
import { useToast } from "@/lib/toast";
import { PageHeader, Button, Loading, ErrorState, EmptyState, Badge, Pagination } from "./ui";
import { Dropdown } from "./dropdown";
import { ConfirmDialog } from "./overlays";
import type { ResourceColumn } from "@/lib/admin-resources";
import { Plus, Pencil, Trash2, MoreVertical, CheckCircle, Circle } from "lucide-react";

export interface ResourceListProps<T extends { id: string }> {
  title: string;
  description?: string;
  newHref: string;
  columns: ResourceColumn[];
  fetcher: () => Promise<T[]>;
  deleter: (id: string) => Promise<void>;
  editHref: (row: T) => string;
  searchText: (row: T) => string;
  publishable?: {
    isPublished: (row: T) => boolean;
    toggle: (row: T) => Promise<void>;
  };
  onChanged?: () => void;
}

function formatDate(v: unknown): string {
  if (!v) return "—";
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function ResourceList<T extends { id: string }>({
  title,
  description,
  newHref,
  columns,
  fetcher,
  deleter,
  editHref,
  searchText,
  publishable,
  onChanged,
}: ResourceListProps<T>) {
  const router = useRouter();
  const toast = useToast();
  const [rows, setRows] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const load = useCallback(async () => {
    setError(null);
    try {
      setRows(await fetcher());
    } catch (err) {
      if (err instanceof AuthError) {
        router.replace("/admin/login");
        return;
      }
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }, [fetcher, router]);

  useEffect(() => {
    Promise.resolve().then(() => load());
  }, [load]);

  const filtered = useMemo(() => {
    if (!rows) return rows;
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => searchText(row).toLowerCase().includes(q));
  }, [rows, query, searchText]);

  const pageCount = filtered ? Math.max(1, Math.ceil(filtered.length / pageSize)) : 1;
  const safePage = Math.min(page, pageCount);

  const pageRows = useMemo(() => {
    if (!filtered) return null;
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  async function handleToggle(row: T) {
    if (!publishable) return;
    setTogglingId(row.id);
    try {
      await publishable.toggle(row);
      toast.success(`${publishable.isPublished(row) ? "Published" : "Moved to drafts"}`);
      await load();
      onChanged?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
      toast.error(message);
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(row: T) {
    setDeleting(true);
    try {
      await deleter(row.id);
      toast.success("Deleted successfully");
      await load();
      onChanged?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setError(message);
      toast.error(message);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  function renderCell(col: ResourceColumn, row: T) {
    const v = (row as Record<string, unknown>)[col.key];
    switch (col.kind) {
      case "number":
        return <span className="font-mono text-charcoal/70">{String(v ?? "")}</span>;
      case "date":
        return <span className="text-charcoal/60">{formatDate(v)}</span>;
      case "badge":
        if (typeof v === "boolean") {
          if (col.key === "published") {
            return v ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Draft</Badge>;
          }
          if (col.key === "featured") {
            return v ? <Badge tone="gold">Featured</Badge> : <Badge tone="neutral">Standard</Badge>;
          }
          return v ? <Badge tone="green">Yes</Badge> : <Badge tone="neutral">No</Badge>;
        }
        return <Badge tone="neutral">{String(v ?? "")}</Badge>;
      default:
        return <span className={col.key === "title" ? "font-semibold text-charcoal" : "text-charcoal/70"}>{String(v ?? "")}</span>;
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <Link href={newHref}>
            <Button>
              <Plus className="w-4 h-4" /> New
            </Button>
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="w-full max-w-xs px-3.5 py-2 text-sm text-charcoal bg-white border border-charcoal/20 rounded focus:outline-none focus:border-charcoal placeholder:text-charcoal/75"
        />
      </div>

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>}

      {!rows && !error && <Loading />}
      {error && !rows && <ErrorState message={error} onRetry={load} />}

      {rows && filtered && filtered.length === 0 && (
        <EmptyState
          message={query ? `No matches for “${query}”.` : "Nothing here yet."}
          action={
            !query ? (
              <Link href={newHref}>
                <Button>
                  <Plus className="w-4 h-4" /> Add your first item
                </Button>
              </Link>
            ) : undefined
          }
        />
      )}

      {rows && filtered && filtered.length > 0 && (
        <div className="bg-white border border-charcoal/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-charcoal text-cream text-left">
                  {columns.map((c) => (
                    <th key={c.key} className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {(pageRows ?? []).map((row) => (
                  <tr key={row.id} className="hover:bg-cream/60">
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-3 align-middle max-w-[260px] truncate">
                        {renderCell(c, row)}
                      </td>
                    ))}
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center justify-end gap-2">
                        {publishable && (
                          <span className="mr-1">
                            {publishable.isPublished(row) ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Draft</Badge>}
                          </span>
                        )}
                        <Dropdown
                          label={`Actions for ${String((row as Record<string, unknown>).title ?? row.id)}`}
                          trigger={
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded border border-charcoal/15 text-charcoal/60 hover:text-charcoal hover:border-charcoal/40">
                              <MoreVertical className="w-4 h-4" />
                            </span>
                          }
                          items={[
                            {
                              label: publishable?.isPublished(row) ? "Move to draft" : "Publish",
                              icon: publishable?.isPublished(row) ? <Circle className="w-4 h-4 text-charcoal/65" /> : <CheckCircle className="w-4 h-4 text-green-700" />,
                              disabled: !publishable || togglingId === row.id,
                              onClick: () => handleToggle(row),
                            },
                            {
                              label: "Edit",
                              icon: <Pencil className="w-4 h-4" />,
                              onClick: () => router.push(editHref(row)),
                            },
                            { divider: true },
                            {
                              label: "Delete",
                              icon: <Trash2 className="w-4 h-4" />,
                              danger: true,
                              onClick: () => setDeleteTarget(row),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={safePage} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) return handleDelete(deleteTarget);
        }}
        message={`Delete ${String((deleteTarget as Record<string, unknown> | null)?.title ?? "this item")}? This action cannot be undone.`}
        busy={deleting}
      />
    </div>
  );
}
