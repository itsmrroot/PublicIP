"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { LANGUAGES } from "@/lib/translations";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex h-9 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:border-sky-400/40 hover:bg-[var(--surface-hover)]"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{current.flag}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute end-0 z-[1000] mt-2 w-44 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--map-control-bg)] py-1 shadow-2xl shadow-[var(--shadow-color)]">
          {LANGUAGES.map((option) => (
            <button
              key={option.code}
              onClick={() => {
                setLang(option.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-start text-sm transition-colors hover:bg-[var(--map-control-hover)] ${
                option.code === lang
                  ? "text-sky-500 dark:text-sky-400"
                  : "text-[var(--map-control-text)]"
              }`}
            >
              <span>{option.flag}</span>
              <span>{option.nativeLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
