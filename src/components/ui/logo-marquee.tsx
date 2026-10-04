"use client";

import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

export type Logo = {
  src?: string;
  icon?: React.ReactNode;
  alt: string;
  name?: string;
  width?: number;
  height?: number;
  className?: string;
};

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    if (size === 0) return;

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const controls = isTransitioning
      ? animate(translation, [translation.get(), to], {
          ease: "linear",
          duration:
            currentDuration * Math.abs((translation.get() - to) / contentSize),
          onComplete: () => {
            setIsTransitioning(false);
            setKey((previous) => previous + 1);
          },
        })
      : animate(translation, [from, to], {
          ease: "linear",
          duration: currentDuration,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          onRepeat: () => translation.set(from),
        });

    return () => controls.stop();
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-2xs hover:border-[#C59341]/50 hover:bg-white hover:shadow-xs transition-all duration-300 group select-none">
      {logo.icon && (
        <div className="w-7 h-7 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
          {logo.icon}
        </div>
      )}
      {logo.src && (
        <Image
          alt={logo.alt}
          src={logo.src}
          width={logo.width ?? 28}
          height={logo.height ?? 28}
          sizes="28px"
          className={cn(
            "pointer-events-none h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-110",
            logo.className,
          )}
        />
      )}
      <span
        className={cn(
          "pointer-events-none whitespace-nowrap text-base sm:text-lg font-black tracking-wider text-slate-800 group-hover:text-slate-950 transition-colors",
          logo.className,
        )}
      >
        {logo.name || logo.alt}
      </span>
    </div>
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  className,
}: {
  logos: Logo[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {logos.map((logo, index) => (
          <LogoImage key={`${logo.alt}-${index}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;
