"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "./ui";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths: Record<string, string> = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-start sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label={title} className={`relative w-full ${widths[size]} bg-white rounded-xl border border-charcoal/10`}>
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-charcoal/10">
          <div>
            <h2 className="text-lg font-bold text-charcoal">{title}</h2>
            {description && <p className="text-sm text-charcoal/80 mt-0.5">{description}</p>}
          </div>
          <button onClick={onClose} className="shrink-0 p-1.5 rounded text-charcoal/65 hover:text-charcoal hover:bg-charcoal/5" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children && <div className="px-6 py-5">{children}</div>}
        {footer && <div className="px-6 py-4 border-t border-charcoal/10 flex items-center justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  busy,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  busy?: boolean;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onConfirm()} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-red" />
        </div>
        <p className="text-sm text-charcoal/70 leading-relaxed pt-1.5">{message}</p>
      </div>
    </Modal>
  );
}
