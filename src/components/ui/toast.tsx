"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface ToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    url: string;
  };
  duration?: number;
  type?: "success" | "info" | "error";
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...options, id }]);

    const duration = options.duration || 4000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Floating Toast Container */}
      <div className="fixed top-6 right-6 rtl:right-auto rtl:left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl flex items-start gap-3 transition-all transform animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              {t.type === "error" ? (
                <AlertCircle className="w-4 h-4 text-rose-500" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#C59341]" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs font-mono font-bold text-slate-900 leading-snug">
                {t.title}
              </h4>
              {t.description && (
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  {t.description}
                </p>
              )}
              {t.action && (
                <div className="mt-2">
                  <Link
                    href={t.action.url}
                    onClick={() => removeToast(t.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-900 hover:text-[#C59341] transition-colors"
                  >
                    <span>{t.action.label}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

