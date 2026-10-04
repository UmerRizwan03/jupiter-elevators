import React from "react";
import type { Locale } from "@/lib/i18n";
import { LogoMarquee, type Logo } from "@/components/ui/logo-marquee";

interface TrustedBrandsProps {
  lang: Locale;
}

const logos: Logo[] = [
  {
    alt: "KONE",
    name: "KONE",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#004F9E" />
        <path d="M9 7h4v7l6-7h5l-7 8 8 10h-5l-8-8v8H9V7z" fill="#FFFFFF" />
      </svg>
    ),
    className: "font-black tracking-tight",
  },
  {
    alt: "OTIS",
    name: "OTIS",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#0057B8" />
        <text
          x="16"
          y="22"
          fill="#FFFFFF"
          fontSize="16"
          fontWeight="900"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          O
        </text>
      </svg>
    ),
    className: "font-black tracking-[0.16em]",
  },
  {
    alt: "Schindler",
    name: "Schindler",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="none" stroke="#E2001A" strokeWidth="2.5" />
        <path d="M16 4 L19 13.5 L28 16 L19 18.5 L16 28 L13 18.5 L4 16 L13 13.5 Z" fill="#E2001A" />
        <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
      </svg>
    ),
    className: "font-bold tracking-tight",
  },
  {
    alt: "MITSUBISHI ELECTRIC",
    name: "MITSUBISHI",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <polygon points="16,3 21.5,12.5 16,16 10.5,12.5" fill="#E60012" />
        <polygon points="16,16 10.5,12.5 5,22 10.5,26.5" fill="#E60012" />
        <polygon points="16,16 21.5,12.5 27,22 21.5,26.5" fill="#E60012" />
      </svg>
    ),
    className: "font-black tracking-wider",
  },
  {
    alt: "TKE",
    name: "TK ELEVATOR",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="tkeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F35B25" />
            <stop offset="100%" stopColor="#A8226A" />
          </linearGradient>
        </defs>
        <path
          d="M7 16 C7 9.5 11.5 5.5 16 5.5 C21.5 5.5 25 10 25 16 C25 22 20.5 26.5 15 26.5 C9.5 26.5 7 22 7 16 Z"
          fill="none"
          stroke="url(#tkeGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="3.5" fill="url(#tkeGradient)" />
      </svg>
    ),
    className: "font-black tracking-tighter",
  },
  {
    alt: "FUJITEC",
    name: "FUJITEC",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <path d="M5 20 C7 11 14 7 25 6 C20 10.5 18 15 16 25 C14 18 9 15 5 20 Z" fill="#E4002B" />
        <path d="M14 25 C16 19 21 14 27 11 C24 16 22 20 19 26 Z" fill="#E4002B" opacity="0.8" />
      </svg>
    ),
    className: "font-extrabold tracking-widest",
  },
  {
    alt: "HITACHI",
    name: "HITACHI",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="#E60012" />
        <circle cx="16" cy="16" r="8" fill="#FFFFFF" />
        <rect x="14.2" y="4" width="3.6" height="24" fill="#E60012" />
        <rect x="4" y="14.2" width="24" height="3.6" fill="#E60012" />
        <circle cx="16" cy="16" r="4" fill="#FFFFFF" />
      </svg>
    ),
    className: "font-black tracking-[0.16em]",
  },
  {
    alt: "FERMATOR",
    name: "FERMATOR",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#004F9F" />
        <polygon points="8,9 15,9 13,23 6,23" fill="#FFFFFF" />
        <polygon points="17,9 24,9 22,23 15,23" fill="#F5A623" />
      </svg>
    ),
    className: "font-black tracking-wide",
  },
  {
    alt: "WITTUR",
    name: "WITTUR",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <polygon points="5,8 11,8 16,24 11,24" fill="#E30613" />
        <polygon points="16,24 21,8 27,8 21,24" fill="#E30613" opacity="0.85" />
        <polygon points="11,14 16,8 21,14 16,18" fill="#E30613" />
      </svg>
    ),
    className: "font-black tracking-wider",
  },
  {
    alt: "MONARCH",
    name: "MONARCH",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#0072CE" />
        <path d="M7 22 L7 10 L12 15 L16 9 L20 15 L25 10 L25 22 Z" fill="#FFFFFF" />
      </svg>
    ),
    className: "font-black tracking-widest",
  },
];

export function TrustedBrands({ lang }: TrustedBrandsProps) {
  const isRtl = lang === "ar";

  return (
    <section className="py-12 md:py-16" aria-labelledby="trusted-brands-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            <span className="text-slate-800">04</span>
            <span>{isRtl ? "العلامات التجارية المعتمدة" : "TRUSTED BRANDS"}</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>
          <h2
            id="trusted-brands-heading"
            className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl lg:text-3xl"
          >
            {isRtl
              ? "متوافق مع كبرى الماركات العالمية"
              : "COMPATIBLE WITH LEADING BRANDS"}
          </h2>
        </div>

        <LogoMarquee
          logos={logos}
          className="max-w-none py-4 opacity-90 transition-opacity hover:opacity-100"
        />
      </div>
    </section>
  );
}
