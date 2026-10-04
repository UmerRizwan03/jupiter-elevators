"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardTextureProps {
  variant?: "blueprint" | "product" | "process" | "dots";
  watermark?: string;
  className?: string;
  cornerTick?: boolean;
}

export function CardTexture({
  variant = "dots",
  watermark,
  className,
  cornerTick = true,
}: CardTextureProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] select-none z-0",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Precision Micro-Dot Matrix Texture */}
      <div
        className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-300"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 0.75px, transparent 0.75px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* 2. Ambient Golden Diagonal Bleed */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.05] via-transparent to-amber-500/[0.02] group-hover:from-amber-500/[0.10] transition-colors duration-300" />

      {/* 3. Variant Specific Architectural CAD Elements */}
      {variant === "blueprint" && (
        <svg
          viewBox="0 0 200 200"
          className="absolute -right-10 -bottom-10 w-44 h-44 opacity-20 group-hover:opacity-35 transition-opacity duration-300 stroke-slate-400 group-hover:stroke-amber-500"
          fill="none"
          strokeWidth="0.75"
        >
          {/* Isometric Guide Rails & Elevator Shaft Blueprint Lines */}
          <line x1="0" y1="40" x2="200" y2="40" strokeDasharray="3 3" />
          <line x1="0" y1="100" x2="200" y2="100" strokeDasharray="3 3" />
          <line x1="0" y1="160" x2="200" y2="160" strokeDasharray="3 3" />
          <line x1="40" y1="0" x2="40" y2="200" strokeDasharray="3 3" />
          <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="3 3" />
          <line x1="160" y1="0" x2="160" y2="200" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="45" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="20" strokeWidth="1" />
          <line x1="20" y1="180" x2="180" y2="20" strokeWidth="0.5" />
        </svg>
      )}

      {variant === "process" && (
        <svg
          viewBox="0 0 240 120"
          className="absolute inset-x-0 bottom-0 w-full h-16 opacity-15 group-hover:opacity-30 transition-opacity duration-300 stroke-slate-500 group-hover:stroke-amber-500"
          fill="none"
          strokeWidth="0.8"
        >
          {/* Circuit / Pneumatic Logic Trace Line */}
          <path d="M 0 60 H 60 L 90 20 H 150 L 180 60 H 240" strokeDasharray="4 4" />
          <circle cx="90" cy="20" r="2.5" fill="currentColor" />
          <circle cx="150" cy="20" r="2.5" fill="currentColor" />
        </svg>
      )}

      {variant === "product" && (
        <svg
          viewBox="0 0 100 100"
          className="absolute right-3 top-3 w-10 h-10 opacity-20 group-hover:opacity-40 transition-opacity duration-300 stroke-slate-400 group-hover:stroke-amber-500"
          fill="none"
          strokeWidth="0.75"
        >
          {/* Engineering Component Alignment Crosshairs */}
          <circle cx="50" cy="50" r="30" strokeDasharray="2 3" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="50" y1="10" x2="50" y2="90" />
        </svg>
      )}

      {/* 4. CAD Precision Corner Cross-Hair Ticks */}
      {cornerTick && (
        <>
          <span className="absolute top-2 right-2 font-mono text-[9px] text-slate-300 group-hover:text-amber-500/50 transition-colors">
            +
          </span>
          <span className="absolute bottom-2 left-2 font-mono text-[9px] text-slate-300 group-hover:text-amber-500/50 transition-colors">
            +
          </span>
        </>
      )}

      {/* 5. Ghosted Technical Monospaced Watermark Numerals / Text */}
      {watermark && (
        <div
          className="absolute -bottom-3 right-2.5 rtl:right-auto rtl:left-2.5 font-mono font-black text-3xl sm:text-4xl text-slate-900/[0.04] group-hover:text-[#C59341]/[0.12] transition-colors duration-300 leading-none tracking-tighter"
          aria-hidden="true"
        >
          {watermark}
        </div>
      )}
    </div>
  );
}

export default CardTexture;

