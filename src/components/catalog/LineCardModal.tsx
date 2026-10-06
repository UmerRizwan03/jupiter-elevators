"use client";

import React, { useEffect, useRef, useState } from "react";
import { Download, FileText, Printer, X } from "lucide-react";
import { JupiterLogo } from "@/components/common/JupiterLogo";
import type { Locale } from "@/lib/i18n";
import { getAllCategories } from "@/lib/catalog";

interface LineCardModalProps {
  lang: Locale;
}

export function LineCardModal({ lang }: LineCardModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "ar";
  const categories = getAllCategories();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (!isOpen) return;
    const triggerElement = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-800 hover:border-[#C59341] hover:text-[#C59341] transition-all text-xs font-mono font-bold shadow-2xs group"
      >
        <FileText className="w-4 h-4 text-[#C59341]" />
        <span>{isRtl ? "تحميل دليل القطع 2026 (Line Card)" : "2026 LINE CARD (PDF)"}</span>
        <Download className="w-3.5 h-3.5 opacity-60 group-hover:translate-y-0.5 transition-transform" />
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="line-card-title"
            tabIndex={-1}
            className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-10 relative my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label={isRtl ? "إغلاق نافذة الدليل" : "Close line card dialog"}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Area */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div className="space-y-2">
                  <JupiterLogo mode="stacked" size="md" />
                  <div className="text-xs font-mono text-slate-500 pt-1">
                    <span>CR: 2050078848 | VAT: 311250980100003 | DAMMAM, KSA</span>
                  </div>
                </div>

                <div className="text-right rtl:text-left font-mono">
                  <span className="text-[10px] uppercase tracking-widest text-[#C59341] font-bold block">
                    OFFICIAL SPECIFICATION GUIDE
                  </span>
                  <h2 id="line-card-title" className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    2026 TECHNICAL LINE CARD
                  </h2>
                  <span className="text-xs text-slate-400">
                    APPROVED FOR MEP & MAINTENANCE FIRMS
                  </span>
                </div>
              </div>

              {/* Company Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 block mb-1">
                  {isRtl ? "نطاق التوريد والجاهزية اللوجستية (790+ موديل):" : "Supply Scope & Logistics Readiness (790+ Models):"}
                </strong>
                {isRtl
                  ? "تعتبر شركة سبيس للمقاولات الصناعية (جوبيتر للمصاعد) مركز التوزيع المباشر لأكثر من 790 موديلاً صناعياً معتمداً لقطع غيار ومكونات المصاعد لشركات الصيانة والمصانع في كافة مناطق المملكة العربية السعودية، مع مخزون استراتيجي جاهز للشحن خلال 24 ساعة لكافة المدن."
                  : "Jupiter Elevators (Space Industrial Cont. Co.) operates as the central spare parts distribution hub for over 790 certified factory elevator models and components across Saudi Arabia, maintaining strategic inventory ready for 24h dispatch nationwide."}
              </div>


              {/* Subsystems Categories Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  01 | CORE PRODUCT LINES & SUBSYSTEMS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 shadow-2xs"
                    >
                      <span className="text-[10px] font-mono text-[#C59341] font-bold block">
                        LINE | 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {cat.name[lang]}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {cat.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatible Brands & Standards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    COMPATIBLE OEM SYSTEMS
                  </span>
                  <p className="text-xs font-mono text-slate-800 leading-relaxed">
                    Monarch, STEP, BlueLight, Otis, KONE, Schindler, ThyssenKrupp, Wittur, Fermator, TorinDrive, Montanari, Ningbo Xinda.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    STANDARDS & COMPLIANCE
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">EN 81-20/50</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">SASO APPROVED</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">SBC 801 COMPLIANT</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">ISO 9001:2015</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-500">
                  <span>DISPATCH HOTLINE: +966 562614370 | sales@jupiterelevators.com</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs transition-colors shadow-xs"
                  >
                    <Printer className="w-4 h-4 text-[#C59341]" />
                    <span>{isRtl ? "طباعة / حفظ كـ PDF" : "PRINT / SAVE AS PDF"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono text-xs font-bold transition-colors"
                  >
                    {isRtl ? "إغلاق" : "CLOSE"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

