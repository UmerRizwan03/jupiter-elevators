import React from "react";

interface JupiterLogoProps {
  variant?: "light" | "dark";
  mode?: "horizontal" | "stacked" | "mark";
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

export function JupiterLogo({
  variant = "light",
  mode = "horizontal",
  size = "md",
  className = "",
}: JupiterLogoProps) {
  const isDark = variant === "dark";

  // Height configurations: constrained and proportional
  const heights = {
    sm: "h-7 sm:h-8",
    md: "h-8 sm:h-9",
    lg: "h-12 sm:h-14",
  }[size];

  const stackedHeights = {
    sm: "h-10 sm:h-12",
    md: "h-14 sm:h-16",
    lg: "h-20 sm:h-24",
  }[size];

  const textSizes = {
    sm: { title: "text-base", sub: "text-[7px]" },
    md: { title: "text-lg sm:text-xl", sub: "text-[8.5px]" },
    lg: { title: "text-2xl sm:text-3xl", sub: "text-[11px]" },
  }[size];

  if (mode === "stacked") {
    return (
      <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isDark ? "/images/logo-dark.svg" : "/images/logo.svg"}
          alt="Jupiter Elevators"
          className={`${stackedHeights} w-auto object-contain max-h-full`}
        />
      </div>
    );
  }

  if (mode === "mark") {
    return (
      <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-mark.svg"
          alt="Jupiter Elevators Mark"
          className={`${heights} w-auto object-contain max-h-full`}
        />
      </div>
    );
  }

  // Horizontal Lockup: Vector Emblem on left, crisp typography on right
  return (
    <div
      dir="ltr"
      className={`inline-flex items-center gap-3 select-none shrink-0 ${className}`}
    >
      <div className="shrink-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-mark.svg"
          alt="Jupiter Elevators Mark"
          className={`${heights} w-auto object-contain shrink-0`}
        />
      </div>

      <div className="flex flex-col justify-center shrink-0">
        <span
          className={`font-black tracking-tight leading-none ${textSizes.title} ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          JUPITER
        </span>
        <span
          className={`font-bold tracking-[0.25em] uppercase leading-tight mt-1 ${textSizes.sub} ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          ELEVATORS
        </span>
      </div>
    </div>
  );
}
