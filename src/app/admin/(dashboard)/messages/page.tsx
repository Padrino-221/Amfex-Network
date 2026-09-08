"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { PageHeader, Badge, Button, Loading, EmptyState } from "@/components/admin/ui";
import { RefreshCw, Trash2, MailOpen, Mail, ChevronDown } from "lucide-react";

type Message = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesPage() {
  const [msgs, setMsgs] = useState<Message[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setError(null);
    try {
      setMsgs(await adminApi.listMessages<Message>());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => load());
  }, [load]);

  async function markRead(id: string) {
    await adminApi.markMessageRead(id);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await adminApi.deleteMessage(id);
    await load();
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <PageHeader
        title="Messages"
        description={`${msgs?.length ?? 0} received`}
        actions={
          <Button variant="secondary" onClick={load}>
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        }
      />

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>}
      {!msgs && !error && <Loading />}
      {msgs && msgs.length === 0 && <EmptyState message="No messages yet." />}

      {msgs && msgs.length > 0 && (
        <div className="space-y-3">
          {msgs.map((m) => {
            const isOpen = expanded.has(m.id);
            return (
              <div key={m.id} className={`bg-white border rounded-lg overflow-hidden ${m.read ? "border-charcoal/10" : "border-gold/60"}`}>
                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-cream/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`shrink-0 grid place-items-center w-7 h-7 rounded-full ${m.read ? "bg-charcoal/5 text-charcoal/65" : "bg-gold/15 text-gold-warm"}`}>
                    {m.read ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-charcoal truncate">
                      {m.firstName} {m.lastName} <span className="font-normal text-charcoal/75">— {m.email}</span>
                      {!m.read && <Badge tone="gold" className="ml-2 align-middle">New</Badge>}
                    </span>
                    <span className="block text-xs text-charcoal/65 truncate">{new Date(m.createdAt).toLocaleString()} · {m.message.slice(0, 48)}{m.message.length > 48 ? "…" : ""}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-charcoal/65 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-charcoal/10 bg-cream/20">
                    <p className="text-sm text-charcoal/80 whitespace-pre-wrap leading-relaxed py-3">{m.message}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-charcoal/65 mr-auto">{m.read ? "Read" : "Unread"} · {m.email}</span>
                      {!m.read && (
                        <Button variant="secondary" className="!px-3 !py-1.5 !text-xs" onClick={() => markRead(m.id)}>
                          <MailOpen className="w-3.5 h-3.5" /> Mark read
                        </Button>
                      )}
                      <Button variant="danger" className="!px-3 !py-1.5 !text-xs" onClick={() => remove(m.id)}>
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
