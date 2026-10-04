"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface SubpageHoistwaySpineProps {
  lang: Locale;
}

/**
 * SubpageHoistwaySpine
 * 
 * Precision-machined, kinetic elevator hoistway background for all subpages.
 * Fully text-free for an uncluttered, neat, and non-distracting presence.
 * Features high-precision mechanical detailing:
 * - Multi-groove CNC machined Traction Drive Sheave with chamfered lightening holes & structural ribs
 * - Cylindrical 4-strand braided steel wire ropes with continuous scroll-linked travel
 * - Machined ISO 7465 T-section guide rail blade with solid forged rail clips
 * - Counter-rotating lower deflector / idler pulley
 * - Zero text elements for a quiet, luxury industrial presence
 * - Automatically hidden on homepage
 * - Fully mirrored for Arabic (RTL)
 */
export function SubpageHoistwaySpine({ lang }: SubpageHoistwaySpineProps) {
  const pathname = usePathname();
  const isRtl = lang === "ar";

  // Check if current route is homepage
  const cleanPath = (pathname || "").replace(/\/+$/, "") || "/";
  const isHome =
    cleanPath === "/" ||
    cleanPath === `/${lang}` ||
    cleanPath === "/en" ||
    cleanPath === "/ar";

  // Direct DOM refs for 60fps hardware-accelerated transforms
  const topSheaveRef = useRef<SVGGElement>(null);
  const bottomSheaveRef = useRef<SVGGElement>(null);
  const cablesPatternRef = useRef<SVGPatternElement>(null);

  useEffect(() => {
    if (isHome) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let animId: number;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const tick = () => {
      if (!prefersReducedMotion) {
        // Smooth lerp damping for mechanical inertia
        currentScrollY += (targetScrollY - currentScrollY) * 0.12;

        // Primary drive sheave rotates clockwise with scroll down
        const topAngle = (currentScrollY * 0.16) % 360;
        // Counterweight/deflector idler sheave rotates counter-clockwise
        const bottomAngle = (-currentScrollY * 0.26) % 360;

        if (topSheaveRef.current) {
          topSheaveRef.current.style.transform = `rotate(${topAngle}deg)`;
        }
        if (bottomSheaveRef.current) {
          bottomSheaveRef.current.style.transform = `rotate(${bottomAngle}deg)`;
        }

        // Cable braided pattern offset traveling with scroll
        if (cablesPatternRef.current) {
          const cableOffset = (currentScrollY * 0.45) % 28;
          cablesPatternRef.current.setAttribute("y", `${cableOffset}`);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [isHome]);

  // Do not render on homepage
  if (isHome) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* ──────────────────────────────────────────────────────────
          MAIN KINETIC HOISTWAY SPINE (Primary Margin)
          Right margin for LTR, Left margin for RTL
      ────────────────────────────────────────────────────────── */}
      <div
        className={`absolute top-0 bottom-0 w-36 sm:w-44 md:w-56 lg:w-64 transition-all duration-300 ${
          isRtl
            ? "left-2 sm:left-6 md:left-10 lg:left-12 xl:left-20"
            : "right-2 sm:right-6 md:right-10 lg:right-12 xl:right-20"
        }`}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Soft shadow filter for tangible mechanical depth */}
            <filter id="sheave-depth-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.08" />
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.05" />
            </filter>

            {/* Machined Brushed Steel Gradient for Rim */}
            <linearGradient id="machined-steel-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F1F5F9" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#E2E8F0" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.5" />
              <stop offset="75%" stopColor="#CBD5E1" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.4" />
            </linearGradient>

            {/* Bronze Axle Bushing Gradient */}
            <linearGradient id="bronze-bushing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8BF6B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#C59341" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#96671A" stopOpacity="0.8" />
            </linearGradient>

            {/* Guide Rail Machined Blade Profile Gradient */}
            <linearGradient id="rail-blade-profile" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748B" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#94A3B8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#F8FAFC" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#CBD5E1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.3" />
            </linearGradient>

            {/* Cylindrical Rope 3D Gradient */}
            <linearGradient id="cylindrical-rope-shade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#94A3B8" stopOpacity="0.7" />
              <stop offset="65%" stopColor="#F1F5F9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.6" />
            </linearGradient>

            {/* Detailed Braided Steel Wire Cable Pattern with Helical Strand Twist */}
            <pattern
              id="hoistway-braided-cables"
              ref={cablesPatternRef}
              width="24"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              {/* Rope 1 (Cylindrical 3D) */}
              <rect x="1" y="0" width="3.5" height="28" fill="url(#cylindrical-rope-shade)" rx="0.5" />
              <line x1="1" y1="3" x2="4.5" y2="7" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="1" y1="10" x2="4.5" y2="14" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="1" y1="17" x2="4.5" y2="21" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="1" y1="24" x2="4.5" y2="28" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />

              {/* Rope 2 */}
              <rect x="7" y="0" width="3.5" height="28" fill="url(#cylindrical-rope-shade)" rx="0.5" />
              <line x1="7" y1="5" x2="10.5" y2="9" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="7" y1="12" x2="10.5" y2="16" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="7" y1="19" x2="10.5" y2="23" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="7" y1="26" x2="10.5" y2="30" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />

              {/* Rope 3 */}
              <rect x="13" y="0" width="3.5" height="28" fill="url(#cylindrical-rope-shade)" rx="0.5" />
              <line x1="13" y1="2" x2="16.5" y2="6" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="13" y1="9" x2="16.5" y2="13" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="13" y1="16" x2="16.5" y2="20" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="13" y1="23" x2="16.5" y2="27" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />

              {/* Rope 4 */}
              <rect x="19" y="0" width="3.5" height="28" fill="url(#cylindrical-rope-shade)" rx="0.5" />
              <line x1="19" y1="4" x2="22.5" y2="8" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="19" y1="11" x2="22.5" y2="15" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="19" y1="18" x2="22.5" y2="22" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />
              <line x1="19" y1="25" x2="22.5" y2="29" stroke="#475569" strokeWidth="0.7" strokeOpacity="0.6" />

              {/* Micro specular highlight specks along rope crowns */}
              <circle cx="2.8" cy="8" r="0.5" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="8.8" cy="15" r="0.5" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="14.8" cy="22" r="0.5" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="20.8" cy="5" r="0.5" fill="#FFFFFF" fillOpacity="0.8" />
            </pattern>
          </defs>

          {/* 1. ISO 7465 T-Section Machined Guide Rail Blade */}
          {/* Main blade body */}
          <rect
            x="48"
            y="0"
            width="6"
            height="100%"
            fill="url(#rail-blade-profile)"
          />
          {/* Machined edge bevels */}
          <line x1="47.5" y1="0" x2="47.5" y2="100%" stroke="#CBD5E1" strokeWidth="0.5" strokeOpacity="0.6" />
          <line x1="54.5" y1="0" x2="54.5" y2="100%" stroke="#475569" strokeWidth="0.5" strokeOpacity="0.4" />

          {/* 2. Continuous 4-Strand Braided Steel Wire Ropes */}
          <rect
            x="64"
            y="0"
            width="24"
            height="100%"
            fill="url(#hoistway-braided-cables)"
          />

          {/* 3. Solid Steel Forged Guide Rail Clips & Mounting Plates (Text-free) */}
          {[180, 440, 700, 960, 1220, 1480, 1740, 2000].map((yPos, i) => (
            <g key={`rail-clip-${i}`} transform={`translate(0, ${yPos})`}>
              {/* Backing wall bracket plate */}
              <rect x="34" y="-7" width="34" height="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" rx="1.5" fillOpacity="0.5" />
              {/* Forged clamping jaws */}
              <rect x="42" y="-5" width="5" height="10" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" rx="0.5" />
              <rect x="55" y="-5" width="5" height="10" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" rx="0.5" />
              {/* Hexagonal bolt heads with chamfered facets */}
              <polygon points="38,-3 40,-4 42,-3 42,-1 40,0 38,-1" fill="#475569" stroke="#334155" strokeWidth="0.4" />
              <polygon points="60,-3 62,-4 64,-3 64,-1 62,0 60,-1" fill="#475569" stroke="#334155" strokeWidth="0.4" />
              {/* Geometric calibration notch (pure geometry, no text) */}
              <line x1="68" y1="0" x2="88" y2="0" stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="2 3" />
              <circle cx="90" cy="0" r="1.2" fill="#94A3B8" />
            </g>
          ))}
        </svg>

        {/* ──────────────────────────────────────────────────────────
            TOP PRIMARY CNC MACHINED TRACTION SHEAVE
            High-detail, non-blueprint physical rendering (Text-free)
        ────────────────────────────────────────────────────────── */}
        <div className="absolute top-24 sm:top-28 md:top-32 left-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 -translate-x-12 sm:-translate-x-10 pointer-events-none">
          <svg
            viewBox="0 0 240 240"
            className="w-full h-full overflow-visible"
            filter="url(#sheave-depth-shadow)"
          >
            {/* ── ROTATING TRACTION SHEAVE ASSEMBLY ── */}
            <g
              ref={topSheaveRef}
              style={{
                transformOrigin: "120px 120px",
                willChange: "transform",
                transition: "transform 0.05s linear",
              }}
            >
              {/* 1. Base Outer Rim with Machined Steel Radial Gradient */}
              <circle
                cx="120"
                cy="120"
                r="104"
                fill="url(#machined-steel-rim)"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />

              {/* 2. Outer Specular Chamfer Highlight Ring */}
              <circle
                cx="120"
                cy="120"
                r="102.5"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeOpacity="0.7"
              />

              {/* 3. Four Machined Rope V/U Grooves with Trough Depth Shadows */}
              {/* Groove 1 */}
              <circle cx="120" cy="120" r="98" fill="none" stroke="#334155" strokeWidth="2.2" strokeOpacity="0.45" />
              <circle cx="120" cy="120" r="97.2" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.6" />
              {/* Groove 2 */}
              <circle cx="120" cy="120" r="93" fill="none" stroke="#334155" strokeWidth="2.2" strokeOpacity="0.45" />
              <circle cx="120" cy="120" r="92.2" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.6" />
              {/* Groove 3 */}
              <circle cx="120" cy="120" r="88" fill="none" stroke="#334155" strokeWidth="2.2" strokeOpacity="0.45" />
              <circle cx="120" cy="120" r="87.2" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.6" />
              {/* Groove 4 */}
              <circle cx="120" cy="120" r="83" fill="none" stroke="#334155" strokeWidth="2.2" strokeOpacity="0.45" />
              <circle cx="120" cy="120" r="82.2" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.6" />

              {/* 4. Concentric CNC Lathe Face Finish Rings (Precision hairline machining marks) */}
              <circle cx="120" cy="120" r="77" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="120" cy="120" r="74" fill="none" stroke="#CBD5E1" strokeWidth="0.6" strokeOpacity="0.5" />
              <circle cx="120" cy="120" r="71" fill="none" stroke="#94A3B8" strokeWidth="0.4" strokeOpacity="0.3" />

              {/* 5. Inner Web Plate (Recessed below rim level) */}
              <circle
                cx="120"
                cy="120"
                r="68"
                fill="#E2E8F0"
                fillOpacity="0.45"
                stroke="#64748B"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />

              {/* 6. Six Structural Gusset Ribs (Lighted edge + Shadow edge) */}
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 120 + Math.cos(rad) * 32;
                const y1 = 120 + Math.sin(rad) * 32;
                const x2 = 120 + Math.cos(rad) * 67;
                const y2 = 120 + Math.sin(rad) * 67;
                return (
                  <g key={`rib-${deg}`}>
                    {/* Shadow side */}
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748B" strokeWidth="2" strokeOpacity="0.4" />
                    {/* Highlighted crest */}
                    <line x1={x1 - 0.7} y1={y1 - 0.7} x2={x2 - 0.7} y2={y2 - 0.7} stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6" />
                  </g>
                );
              })}

              {/* 7. Six Precision Chamfered Lightening Holes */}
              {[30, 90, 150, 210, 270, 330].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const holeX = 120 + Math.cos(rad) * 48;
                const holeY = 120 + Math.sin(rad) * 48;
                return (
                  <g key={`light-hole-${deg}`}>
                    {/* Through hole opening */}
                    <circle
                      cx={holeX}
                      cy={holeY}
                      r="14"
                      fill="#F1F5F9"
                      fillOpacity="0.75"
                    />
                    {/* Recessed inner shadow edge */}
                    <circle
                      cx={holeX}
                      cy={holeY}
                      r="14"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.2"
                      strokeOpacity="0.5"
                    />
                    {/* Outer polished chamfer bevel ring */}
                    <circle
                      cx={holeX}
                      cy={holeY}
                      r="16.5"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                      strokeOpacity="0.7"
                    />
                    <circle
                      cx={holeX}
                      cy={holeY}
                      r="17.2"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                    />
                  </g>
                );
              })}

              {/* 8. Heavy-Duty Central Hub Collar */}
              <circle
                cx="120"
                cy="120"
                r="30"
                fill="url(#machined-steel-rim)"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <circle
                cx="120"
                cy="120"
                r="28.5"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />

              {/* 9. Six High-Tensile Flange Hex Bolts */}
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const bx = 120 + Math.cos(rad) * 23;
                const by = 120 + Math.sin(rad) * 23;
                return (
                  <g key={`hub-bolt-${deg}`} transform={`translate(${bx}, ${by})`}>
                    <polygon
                      points="-2.2,-1.2 -1.2,-2.2 1.2,-2.2 2.2,-1.2 2.2,1.2 1.2,2.2 -1.2,2.2 -2.2,1.2"
                      fill="#334155"
                      stroke="#1E293B"
                      strokeWidth="0.4"
                      fillOpacity="0.75"
                    />
                    {/* Center recess */}
                    <circle cx="0" cy="0" r="0.6" fill="#F8FAFC" fillOpacity="0.7" />
                  </g>
                );
              })}

              {/* 10. Phosphor Bronze Axle Sleeve Ring */}
              <circle
                cx="120"
                cy="120"
                r="15"
                fill="url(#bronze-bushing-grad)"
                stroke="#96671A"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <circle
                cx="120"
                cy="120"
                r="13.8"
                fill="none"
                stroke="#FFE082"
                strokeWidth="0.6"
                strokeOpacity="0.8"
              />

              {/* 11. Drive Shaft Bore & Machined Keyway Slot */}
              <circle cx="120" cy="120" r="9" fill="#0F172A" fillOpacity="0.85" />
              {/* Keyway */}
              <rect
                x="117.8"
                y="108.5"
                width="4.4"
                height="6"
                fill="#0F172A"
                fillOpacity="0.85"
                rx="0.4"
              />
              {/* Center Axle Retaining Washer & Allen Socket */}
              <circle cx="120" cy="120" r="4.5" fill="#475569" stroke="#64748B" strokeWidth="0.5" />
              <polygon
                points="-1.2,-0.7 0,-1.4 1.2,-0.7 1.2,0.7 0,1.4 -1.2,0.7"
                fill="#0F172A"
                transform="translate(120, 120)"
              />
            </g>
          </svg>
        </div>

        {/* ──────────────────────────────────────────────────────────
            BOTTOM SECONDARY CNC IDLER / DEFLECTOR SHEAVE
            Counter-rotates smoothly in the lower margin (Text-free)
        ────────────────────────────────────────────────────────── */}
        <div className="absolute bottom-16 sm:bottom-20 left-0 w-36 sm:w-44 h-36 sm:h-44 -translate-x-6 pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full overflow-visible"
            filter="url(#sheave-depth-shadow)"
          >
            {/* Deflector Sheave (counter-rotates) */}
            <g
              ref={bottomSheaveRef}
              style={{
                transformOrigin: "80px 80px",
                willChange: "transform",
                transition: "transform 0.05s linear",
              }}
            >
              {/* Outer Machined Rim */}
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="url(#machined-steel-rim)"
                stroke="#64748B"
                strokeWidth="1.2"
                strokeOpacity="0.55"
              />
              <circle cx="80" cy="80" r="66.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6" />

              {/* Rope Grooves */}
              <circle cx="80" cy="80" r="63" fill="none" stroke="#334155" strokeWidth="1.8" strokeOpacity="0.4" />
              <circle cx="80" cy="80" r="58" fill="none" stroke="#334155" strokeWidth="1.8" strokeOpacity="0.4" />
              <circle cx="80" cy="80" r="53" fill="none" stroke="#334155" strokeWidth="1.8" strokeOpacity="0.4" />

              {/* Lathe rings */}
              <circle cx="80" cy="80" r="48" fill="none" stroke="#94A3B8" strokeWidth="0.4" strokeOpacity="0.3" />
              <circle cx="80" cy="80" r="44" fill="#E2E8F0" fillOpacity="0.4" stroke="#64748B" strokeWidth="0.8" strokeOpacity="0.4" />

              {/* 4 Chamfered Deflector Web Cutouts */}
              {[45, 135, 225, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const holeX = 80 + Math.cos(rad) * 31;
                const holeY = 80 + Math.sin(rad) * 31;
                return (
                  <g key={`def-hole-${deg}`}>
                    <circle cx={holeX} cy={holeY} r="10" fill="#F1F5F9" fillOpacity="0.75" />
                    <circle cx={holeX} cy={holeY} r="10" fill="none" stroke="#475569" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx={holeX} cy={holeY} r="12" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.7" />
                  </g>
                );
              })}

              {/* Hub & Bronze Bushing */}
              <circle cx="80" cy="80" r="18" fill="url(#machined-steel-rim)" stroke="#64748B" strokeWidth="1" strokeOpacity="0.7" />
              <circle cx="80" cy="80" r="10" fill="url(#bronze-bushing-grad)" stroke="#96671A" strokeWidth="0.8" />
              <circle cx="80" cy="80" r="4.5" fill="#0F172A" fillOpacity="0.85" />
            </g>
          </svg>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          OPPOSITE MARGIN (Framing Balance)
          Left margin for LTR, Right margin for RTL.
          Pure geometric engineering calibration track (Text-free)
      ────────────────────────────────────────────────────────── */}
      <div
        className={`absolute top-0 bottom-0 w-12 sm:w-16 md:w-20 transition-all duration-300 hidden md:block ${
          isRtl
            ? "right-2 sm:right-6 md:right-8 lg:right-12"
            : "left-2 sm:left-6 md:left-8 lg:left-12"
        }`}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Guide Rail Counter-Datum Hairline */}
          <line
            x1="18"
            y1="0"
            x2="18"
            y2="100%"
            stroke="#94A3B8"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
          <line
            x1="22"
            y1="0"
            x2="22"
            y2="100%"
            stroke="#CBD5E1"
            strokeWidth="0.5"
            strokeDasharray="3 5"
            strokeOpacity="0.35"
          />

          {/* Geometric calibration tick marks (pure geometry, NO text) */}
          {[120, 280, 440, 600, 760, 920, 1080, 1240, 1400, 1560, 1720, 1880, 2040].map(
            (yPos, i) => (
              <g key={`opp-tick-${i}`} transform={`translate(0, ${yPos})`} opacity="0.35">
                <line x1="12" y1="0" x2="24" y2="0" stroke="#64748B" strokeWidth="1" />
                <circle cx="28" cy="0" r="1" fill="#94A3B8" />
              </g>
            )
          )}
        </svg>
      </div>
    </div>
  );
}
