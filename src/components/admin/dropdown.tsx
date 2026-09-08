"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export interface DropdownItem {
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  label?: string;
  align?: "left" | "right";
  side?: "top" | "bottom";
  block?: boolean;
  caret?: boolean;
  width?: "trigger" | "auto";
  trigger: ReactNode;
  items: DropdownItem[];
  selected?: string;
}

export function Dropdown({
  label,
  align = "right",
  side = "bottom",
  block,
  caret,
  width = "auto",
  trigger,
  items,
  selected,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setCoords({ top: r.bottom + 4, left: r.left, width: r.width });
  };

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => setOpen(false);
    updatePosition();
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menuWidth = width === "trigger" && coords ? coords.width : undefined;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className={`${block ? "w-full text-left" : ""} relative`}
      >
        {trigger}
        {caret && <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/65" />}
      </button>
      {open &&
        coords &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={
              side === "top"
                ? {
                    position: "fixed",
                    bottom: window.innerHeight - coords.top + 8,
                    left: align === "right" ? Math.max(8, coords.left + coords.width - (menuWidth ?? 190)) : coords.left,
                    width: menuWidth,
                    minWidth: 190,
                    zIndex: 80,
                  }
                : {
                    position: "fixed",
                    top: coords.top,
                    left: align === "right" ? Math.max(8, coords.left + coords.width - (menuWidth ?? 190)) : coords.left,
                    width: menuWidth,
                    minWidth: 190,
                    zIndex: 80,
                  }
            }
            className="overflow-hidden rounded border border-charcoal/15 bg-white"
          >
            {items.map((item, i) =>
              item.divider ? (
                <div key={i} className="my-1 border-t border-charcoal/10" />
              ) : (
                <button
                  key={i}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors ${
                    item.disabled
                      ? "cursor-not-allowed text-charcoal/80"
                      : item.danger
                        ? "text-red hover:bg-red/5"
                        : "text-charcoal hover:bg-cream"
                  }`}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {selected === item.label && <Check className="w-3.5 h-3.5" />}
                </button>
              )
            )}
          </div>,
          document.body
        )}
    </>
  );
}
