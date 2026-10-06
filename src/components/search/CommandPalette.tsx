"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getAllParts, getPartImageUrl } from "@/lib/catalog";
import type { ElevatorPart } from "@/types/catalog";

interface CommandPaletteProps {
  lang: Locale;
}

export function CommandPalette({ lang }: CommandPaletteProps) {
  const router = useRouter();
  const isRtl = lang === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const parts = useMemo(() => getAllParts(), []);

  // Listen for global shortcut (Cmd+K / Ctrl+K) or custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          setIsOpen(false);
        } else {
          setQuery("");
          setSelectedIndex(0);
          setIsOpen(true);
        }
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setQuery("");
      setSelectedIndex(0);
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter parts
  const filteredParts = useMemo(() => {
    if (!query.trim()) {
      return parts.slice(0, 6); // show first 6 featured
    }
    const q = query.trim().toLowerCase();
    return parts
      .filter((p) => {
        return (
          p.sku.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.toLowerCase().includes(q) ||
          p.subcategory.en.toLowerCase().includes(q) ||
          p.subcategory.ar.toLowerCase().includes(q) ||
          p.compatibleBrands.some((b) => b.toLowerCase().includes(q)) ||
          p.variants?.some(
            (v) =>
              v.model.toLowerCase().includes(q) ||
              (v.type && v.type.toLowerCase().includes(q))
          )
        );
      })
      .slice(0, 8);
  }, [parts, query]);

  // Key navigation (up, down, enter)
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredParts.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredParts.length) % Math.max(1, filteredParts.length));
    } else if (e.key === "Enter" && filteredParts[selectedIndex]) {
      e.preventDefault();
      const p = filteredParts[selectedIndex];
      const q = query.trim().toLowerCase();
      const firstMatched = q ? p.variants?.find((v) => v.model.toLowerCase().includes(q)) : undefined;
      handleSelect(p, firstMatched?.model);
    }
  };

  const handleSelect = (part: ElevatorPart, model?: string) => {
    setIsOpen(false);
    const url = model
      ? `/${lang}/catalog/${part.slug}?model=${encodeURIComponent(model)}`
      : `/${lang}/catalog/${part.slug}`;
    router.push(url);
  };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-2 sm:gap-3">
          <Search className="w-5 h-5 text-[#C59341] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={
              isRtl
                ? "ابحث برقم القطعة (SKU)، اسم المكون، أو الماركة (Monarch, Otis, KONE)..."
                : "Search by SKU, part name, or brand (Monarch, Otis, KONE)..."
            }
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors"
              title={isRtl ? "مسح النص" : "Clear query"}
              aria-label={isRtl ? "مسح النص" : "Clear query"}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Close Spotlight Search Button (Mobile & Desktop) */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors text-xs font-mono font-medium shrink-0 cursor-pointer shadow-2xs"
            aria-label={isRtl ? "إغلاق البحث" : "Close search"}
            title={isRtl ? "إغلاق (Esc)" : "Close (Esc)"}
          >
            <X className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[11px] font-semibold">{isRtl ? "إغلاق" : "Close"}</span>
            <span className="hidden sm:inline-block text-[9px] text-slate-400 bg-white border border-slate-200 px-1 py-0.2 rounded font-mono">
              ESC
            </span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-50">
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{query ? (isRtl ? "نتائج البحث" : "SEARCH RESULTS") : (isRtl ? "مكونات مميزة" : "POPULAR COMPONENTS")}</span>
            <span>[{filteredParts.length}]</span>
          </div>

          {filteredParts.length > 0 ? (
            filteredParts.map((part, idx) => {
              const isSelected = idx === selectedIndex;
              const q = query.trim().toLowerCase();
              const matchingVariants = q
                ? part.variants?.filter(
                    (v) =>
                      v.model.toLowerCase().includes(q) ||
                      (v.type && v.type.toLowerCase().includes(q))
                  ) || []
                : [];

              return (
                <div
                  key={part.id}
                  onClick={() => handleSelect(part, matchingVariants[0]?.model)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? "bg-slate-100" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 relative overflow-hidden p-1 shadow-2xs">
                      <Image
                        src={getPartImageUrl(part, matchingVariants[0] || part.variants?.[0])}
                        alt={part.name[lang]}
                        width={40}
                        height={40}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                          {part.sku}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 truncate">
                          {"// "}{part.subcategory[lang]}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                        {part.name[lang]}
                      </h4>
                      {matchingVariants.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono font-semibold text-[#8A6428]">
                            {isRtl ? "الموديلات المطابقة:" : "Matched Models:"}
                          </span>
                          {matchingVariants.slice(0, 3).map((mv) => (
                            <button
                              key={mv.model}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(part, mv.model);
                              }}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
                            >
                              {mv.model}
                            </button>
                          ))}
                          {matchingVariants.length > 3 && (
                            <span className="text-[10px] font-mono text-slate-400">
                              +{matchingVariants.length - 3} {isRtl ? "إضافي" : "more"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>


                  <div className="flex items-center gap-2 shrink-0">
                    {part.inStock ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        STOCK
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        ORDER
                      </span>
                    )}
                    <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? "text-slate-900" : "text-slate-300"}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center space-y-2">
              <p className="text-xs font-mono text-slate-500">
                NO COMPONENTS MATCHING &ldquo;{query}&rdquo;
              </p>
              <p className="text-[11px] text-slate-400">
                Try searching for Monarch, Inverter, Governor, or Roller
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#C59341] font-semibold">JUPITER ELEVATORS SPEC PALETTE</span>
        </div>
      </div>
    </div>
  );
}

export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }
}

