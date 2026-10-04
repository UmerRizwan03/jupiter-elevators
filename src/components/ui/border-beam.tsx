"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number; // duration in seconds
  borderWidth?: number; // border width in px
  colorFrom?: string;
  colorTo?: string;
  glow?: boolean;
}

export function BorderBeam({
  className,
  duration = 6,
  colorFrom = "#C59341",
  colorTo = "#FDE68A",
  glow = true,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-0",
        className
      )}
    >
      {/* High-Intensity Laser Beam */}
      <div
        className="absolute -inset-[150%] animate-spin pointer-events-none"
        style={{
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${colorFrom} 315deg, ${colorTo} 352deg, #FFFFFF 360deg)`,
        }}
      />

      {/* Atmospheric Ambient Glow Layer */}
      {glow && (
        <div
          className="absolute -inset-[150%] animate-spin pointer-events-none blur-[6px] opacity-70"
          style={{
            animationDuration: `${duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${colorFrom} 315deg, ${colorTo} 352deg, #FFFFFF 360deg)`,
          }}
        />
      )}
    </div>
  );
}

export default BorderBeam;
